import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SearchCriteria {
  jobTitles: string;
  companies: string;
  locations: string;
  industries: string;
  keywords: string;
  excludeTerms: string;
}

interface SearchResult {
  type: string;
  query: string;
  description: string;
}

export const SearchForm = () => {
  const { toast } = useToast();
  const [criteria, setCriteria] = useState<SearchCriteria>({
    jobTitles: "",
    companies: "",
    locations: "",
    industries: "",
    keywords: "",
    excludeTerms: ""
  });
  const [results, setResults] = useState<SearchResult[]>([]);

  const generateLinkedInQuery = () => {
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
    
    return query;
  };

  const generateEventQuery = () => {
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
    
    return query;
  };

  const generateContactQuery = () => {
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
    
    return query;
  };

  const handleGenerate = () => {
    const newResults: SearchResult[] = [];

    if (criteria.jobTitles || criteria.companies) {
      newResults.push({
        type: "LinkedIn Profiles",
        query: generateLinkedInQuery(),
        description: "Search for LinkedIn profiles matching your criteria"
      });
    }

    if (criteria.industries || criteria.keywords) {
      newResults.push({
        type: "Event Participants",
        query: generateEventQuery(),
        description: "Find attendees and participants from industry events"
      });
    }

    if (criteria.companies || criteria.jobTitles) {
      newResults.push({
        type: "Contact Information",
        query: generateContactQuery(),
        description: "Search for contact details including emails and phone numbers"
      });
    }

    setResults(newResults);
    
    if (newResults.length > 0) {
      toast({
        title: "Queries Generated!",
        description: `Generated ${newResults.length} search queries for your criteria.`,
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Search query copied to clipboard.",
    });
  };

  const handleInputChange = (field: keyof SearchCriteria, value: string) => {
    setCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Search Criteria
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your target criteria to generate boolean search queries
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="jobTitles">Job Titles</Label>
              <Input
                id="jobTitles"
                placeholder="CEO, CTO, Marketing Manager"
                value={criteria.jobTitles}
                onChange={(e) => handleInputChange('jobTitles', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companies">Companies</Label>
              <Input
                id="companies"
                placeholder="Microsoft, Google, Amazon"
                value={criteria.companies}
                onChange={(e) => handleInputChange('companies', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locations">Locations</Label>
              <Input
                id="locations"
                placeholder="New York, San Francisco, London"
                value={criteria.locations}
                onChange={(e) => handleInputChange('locations', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industries">Industries</Label>
              <Input
                id="industries"
                placeholder="Technology, Healthcare, Finance"
                value={criteria.industries}
                onChange={(e) => handleInputChange('industries', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              placeholder="blockchain, AI, machine learning"
              value={criteria.keywords}
              onChange={(e) => handleInputChange('keywords', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="excludeTerms">Exclude Terms</Label>
            <Input
              id="excludeTerms"
              placeholder="recruiter, intern, student"
              value={criteria.excludeTerms}
              onChange={(e) => handleInputChange('excludeTerms', e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleGenerate} 
            variant="hero" 
            size="lg"
            className="w-full"
          >
            <Search className="w-5 h-5 mr-2" />
            Generate Search Queries
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Generated Search Queries</CardTitle>
            <CardDescription>
              Copy these queries and use them in Google or your preferred search engine
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary/20 border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-primary">{result.type}</h3>
                  <Button
                    variant="copy"
                    size="sm"
                    onClick={() => copyToClipboard(result.query)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{result.description}</p>
                <div className="bg-background/50 p-3 rounded border font-mono text-sm break-all">
                  {result.query}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};