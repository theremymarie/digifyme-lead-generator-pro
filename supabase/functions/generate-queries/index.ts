import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SearchCriteria {
  jobTitles?: string;
  companies?: string;
  locations?: string;
  industries?: string;
  keywords?: string;
  excludeTerms?: string;
  countries?: string;
  sectors?: string;
  niches?: string;
}

interface SearchResult {
  type: string;
  query: string;
  description: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify the JWT token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { criteria }: { criteria: SearchCriteria } = await req.json();
    
    if (!criteria) {
      return new Response(
        JSON.stringify({ error: 'Search criteria required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check and deduct credits (1 credit per API call)
    const { data: creditResult, error: creditError } = await supabase.rpc('use_credits', {
      p_user_id: user.id,
      p_amount: 1,
      p_feature: 'api_query_generation',
      p_description: 'API query generation'
    });

    if (creditError || !creditResult) {
      return new Response(
        JSON.stringify({ error: 'Insufficient credits or credit system error' }),
        { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate queries using the same logic as the frontend
    const results: SearchResult[] = [];

    // LinkedIn Profiles
    if (criteria.jobTitles || criteria.companies) {
      const parts = [];
      
      if (criteria.jobTitles) {
        const titles = criteria.jobTitles.split(',').map(t => t.trim());
        parts.push(`(${titles.map(title => `"${title}"`).join(' OR ')})`);
      }
      
      if (criteria.companies) {
        const companies = criteria.companies.split(',').map(c => c.trim());
        parts.push(`(${companies.map(company => `"${company}"`).join(' OR ')})`);
      }
      
      if (criteria.locations) {
        const locations = criteria.locations.split(',').map(l => l.trim());
        parts.push(`(${locations.map(location => `"${location}"`).join(' OR ')})`);
      }
      
      if (criteria.keywords) {
        const keywords = criteria.keywords.split(',').map(k => k.trim());
        parts.push(`(${keywords.join(' OR ')})`);
      }
      
      let query = `site:linkedin.com/in/ ${parts.join(' AND ')}`;
      
      if (criteria.excludeTerms) {
        const excludes = criteria.excludeTerms.split(',').map(e => e.trim());
        query += ` ${excludes.map(term => `-"${term}"`).join(' ')}`;
      }

      results.push({
        type: "LinkedIn Profiles",
        query,
        description: "Search for LinkedIn profiles matching your criteria"
      });
    }

    // Event Participants
    if (criteria.industries || criteria.keywords) {
      const parts = [];
      
      if (criteria.industries) {
        const industries = criteria.industries.split(',').map(i => i.trim());
        parts.push(`(${industries.map(industry => `"${industry}"`).join(' OR ')})`);
      }
      
      if (criteria.locations) {
        const locations = criteria.locations.split(',').map(l => l.trim());
        parts.push(`(${locations.map(location => `"${location}"`).join(' OR ')})`);
      }
      
      const eventTerms = ['conference', 'summit', 'event', 'meetup', 'workshop', 'attendees'];
      parts.push(`(${eventTerms.join(' OR ')})`);
      
      if (criteria.keywords) {
        const keywords = criteria.keywords.split(',').map(k => k.trim());
        parts.push(`(${keywords.join(' OR ')})`);
      }
      
      let query = parts.join(' AND ');
      
      if (criteria.excludeTerms) {
        const excludes = criteria.excludeTerms.split(',').map(e => e.trim());
        query += ` ${excludes.map(term => `-"${term}"`).join(' ')}`;
      }

      results.push({
        type: "Event Participants",
        query,
        description: "Find attendees and participants from industry events"
      });
    }

    // Contact Information
    if (criteria.companies || criteria.jobTitles) {
      const parts = [];
      
      if (criteria.companies) {
        const companies = criteria.companies.split(',').map(c => c.trim());
        parts.push(`(${companies.map(company => `"${company}"`).join(' OR ')})`);
      }
      
      if (criteria.jobTitles) {
        const titles = criteria.jobTitles.split(',').map(t => t.trim());
        parts.push(`(${titles.map(title => `"${title}"`).join(' OR ')})`);
      }
      
      const contactTerms = ['email', 'contact', '@', 'phone', 'tel:', 'mailto:'];
      parts.push(`(${contactTerms.join(' OR ')})`);
      
      if (criteria.locations) {
        const locations = criteria.locations.split(',').map(l => l.trim());
        parts.push(`(${locations.map(location => `"${location}"`).join(' OR ')})`);
      }
      
      let query = parts.join(' AND ');
      
      if (criteria.excludeTerms) {
        const excludes = criteria.excludeTerms.split(',').map(e => e.trim());
        query += ` ${excludes.map(term => `-"${term}"`).join(' ')}`;
      }

      results.push({
        type: "Contact Information",
        query,
        description: "Search for contact details including emails and phone numbers"
      });
    }

    // Influencer Contacts
    if (criteria.industries || criteria.sectors || criteria.niches || criteria.countries) {
      const parts = [];
      
      const influencerTerms = ['influencer', 'blogger', 'content creator', 'social media', 'instagram', 'youtube', 'tiktok'];
      parts.push(`(${influencerTerms.join(' OR ')})`);
      
      if (criteria.industries || criteria.sectors || criteria.niches) {
        const allCategories = [
          ...criteria.industries?.split(',').map(i => i.trim()).filter(Boolean) || [],
          ...criteria.sectors?.split(',').map(s => s.trim()).filter(Boolean) || [],
          ...criteria.niches?.split(',').map(n => n.trim()).filter(Boolean) || []
        ];
        if (allCategories.length > 0) {
          parts.push(`(${allCategories.map(cat => `"${cat}"`).join(' OR ')})`);
        }
      }
      
      if (criteria.countries || criteria.locations) {
        const allLocations = [
          ...criteria.countries?.split(',').map(c => c.trim()).filter(Boolean) || [],
          ...criteria.locations?.split(',').map(l => l.trim()).filter(Boolean) || []
        ];
        if (allLocations.length > 0) {
          parts.push(`(${allLocations.map(loc => `"${loc}"`).join(' OR ')})`);
        }
      }
      
      const contactTerms = ['contact', 'email', 'collaboration', 'partnership', 'booking'];
      parts.push(`(${contactTerms.join(' OR ')})`);
      
      if (criteria.keywords) {
        const keywords = criteria.keywords.split(',').map(k => k.trim());
        parts.push(`(${keywords.join(' OR ')})`);
      }
      
      let query = parts.join(' AND ');
      
      if (criteria.excludeTerms) {
        const excludes = criteria.excludeTerms.split(',').map(e => e.trim());
        query += ` ${excludes.map(term => `-"${term}"`).join(' ')}`;
      }

      results.push({
        type: "Influencer Contacts",
        query,
        description: "Find influencers and content creators in specific niches or countries"
      });
    }

    // Politicians & Officials
    if (criteria.countries || criteria.sectors) {
      const parts = [];
      
      const politicianTerms = ['politician', 'senator', 'congressman', 'mayor', 'governor', 'minister', 'MP', 'representative'];
      parts.push(`(${politicianTerms.join(' OR ')})`);
      
      if (criteria.countries) {
        const countries = criteria.countries.split(',').map(c => c.trim());
        parts.push(`(${countries.map(country => `"${country}"`).join(' OR ')})`);
      }
      
      if (criteria.sectors || criteria.keywords) {
        const allTerms = [
          ...criteria.sectors?.split(',').map(s => s.trim()).filter(Boolean) || [],
          ...criteria.keywords?.split(',').map(k => k.trim()).filter(Boolean) || []
        ];
        if (allTerms.length > 0) {
          parts.push(`(${allTerms.join(' OR ')})`);
        }
      }
      
      const contactTerms = ['office', 'contact', 'email', 'phone', 'staff', 'press', 'communications'];
      parts.push(`(${contactTerms.join(' OR ')})`);
      
      let query = parts.join(' AND ');
      
      if (criteria.excludeTerms) {
        const excludes = criteria.excludeTerms.split(',').map(e => e.trim());
        query += ` ${excludes.map(term => `-"${term}"`).join(' ')}`;
      }

      results.push({
        type: "Politicians & Officials",
        query,
        description: "Locate political figures and government officials contact information"
      });
    }

    // Real Estate Contacts
    if (criteria.locations || criteria.keywords) {
      const parts = [];
      
      const realEstateTerms = ['real estate', 'property', 'broker', 'agent', 'realtor', 'listings', 'homes for sale', 'commercial property'];
      parts.push(`(${realEstateTerms.join(' OR ')})`);
      
      if (criteria.locations) {
        const locations = criteria.locations.split(',').map(l => l.trim());
        parts.push(`(${locations.map(location => `"${location}"`).join(' OR ')})`);
      }
      
      if (criteria.keywords) {
        const keywords = criteria.keywords.split(',').map(k => k.trim());
        parts.push(`(${keywords.join(' OR ')})`);
      }
      
      const contactTerms = ['contact', 'email', 'phone', 'office', 'listing agent', 'inquiries'];
      parts.push(`(${contactTerms.join(' OR ')})`);
      
      let query = parts.join(' AND ');
      
      if (criteria.excludeTerms) {
        const excludes = criteria.excludeTerms.split(',').map(e => e.trim());
        query += ` ${excludes.map(term => `-"${term}"`).join(' ')}`;
      }

      results.push({
        type: "Real Estate Contacts",
        query,
        description: "Find real estate agents, brokers, and property professionals"
      });
    }

    // Suppliers & Vendors
    if (criteria.industries || criteria.sectors || criteria.locations) {
      const parts = [];
      
      const supplierTerms = ['supplier', 'vendor', 'distributor', 'wholesaler', 'manufacturer', 'provider', 'contractor'];
      parts.push(`(${supplierTerms.join(' OR ')})`);
      
      if (criteria.industries || criteria.sectors) {
        const allCategories = [
          ...criteria.industries?.split(',').map(i => i.trim()).filter(Boolean) || [],
          ...criteria.sectors?.split(',').map(s => s.trim()).filter(Boolean) || []
        ];
        if (allCategories.length > 0) {
          parts.push(`(${allCategories.map(cat => `"${cat}"`).join(' OR ')})`);
        }
      }
      
      if (criteria.locations || criteria.countries) {
        const allLocations = [
          ...criteria.locations?.split(',').map(l => l.trim()).filter(Boolean) || [],
          ...criteria.countries?.split(',').map(c => c.trim()).filter(Boolean) || []
        ];
        if (allLocations.length > 0) {
          parts.push(`(${allLocations.map(loc => `"${loc}"`).join(' OR ')})`);
        }
      }
      
      if (criteria.keywords) {
        const keywords = criteria.keywords.split(',').map(k => k.trim());
        parts.push(`(${keywords.join(' OR ')})`);
      }
      
      const contactTerms = ['contact', 'email', 'sales', 'inquiry', 'quote', 'business'];
      parts.push(`(${contactTerms.join(' OR ')})`);
      
      let query = parts.join(' AND ');
      
      if (criteria.excludeTerms) {
        const excludes = criteria.excludeTerms.split(',').map(e => e.trim());
        query += ` ${excludes.map(term => `-"${term}"`).join(' ')}`;
      }

      results.push({
        type: "Suppliers & Vendors",
        query,
        description: "Locate suppliers, vendors, and service providers by industry and location"
      });
    }

    // Log the API usage
    console.log(`API query generation completed for user ${user.id}. Generated ${results.length} queries.`);

    return new Response(
      JSON.stringify({
        success: true,
        queries: results,
        creditsUsed: 1,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error("Error in generate-queries function:", error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});