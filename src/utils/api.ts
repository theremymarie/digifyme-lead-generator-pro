import { supabase } from "@/integrations/supabase/client";

export interface SearchCriteria {
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

export interface SearchResult {
  type: string;
  query: string;
  description: string;
}

export interface ApiResponse {
  success: boolean;
  queries: SearchResult[];
  creditsUsed: number;
  timestamp: string;
  error?: string;
  message?: string;
}

/**
 * Generate boolean search queries using the API
 * Requires authentication and consumes 1 credit per request
 * 
 * @param criteria - Search criteria object
 * @returns Promise resolving to API response with generated queries
 * 
 * @example
 * ```typescript
 * const criteria = {
 *   jobTitles: "CEO, CTO",
 *   companies: "Microsoft, Google",
 *   locations: "New York, San Francisco"
 * };
 * 
 * const response = await generateQueriesApi(criteria);
 * if (response.success) {
 *   console.log(`Generated ${response.queries.length} queries`);
 *   response.queries.forEach(query => {
 *     console.log(`${query.type}: ${query.query}`);
 *   });
 * }
 * ```
 */
export async function generateQueriesApi(criteria: SearchCriteria): Promise<ApiResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('generate-queries', {
      body: { criteria }
    });

    if (error) {
      throw new Error(error.message);
    }

    return data as ApiResponse;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Get current user credits
 * @returns Promise resolving to current credit balance
 */
export async function getUserCredits(): Promise<number> {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('user_credits')
    .select('credits')
    .eq('user_id', user.user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data?.credits || 0;
}

/**
 * Get user's credit transaction history
 * @param limit - Number of transactions to retrieve (default: 10)
 * @returns Promise resolving to array of credit transactions
 */
export async function getCreditTransactions(limit: number = 10) {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('credit_transactions')
    .select('*')
    .eq('user_id', user.user.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}