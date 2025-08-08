# Digifyme Leadfinder Pro API

This API allows programmatic access to generate boolean search queries for lead generation across multiple platforms including LinkedIn, real estate, suppliers, influencers, and political contacts.

## Authentication

The API requires authentication via JWT token. Users must be logged in to use the API and it consumes 1 credit per request.

## Base URL

```
https://qulglzsnilsqfhbtpjmr.supabase.co/functions/v1/
```

## Endpoints

### POST /generate-queries

Generate boolean search queries based on provided criteria.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "criteria": {
    "jobTitles": "CEO, CTO, Marketing Manager",
    "companies": "Microsoft, Google, Amazon",
    "locations": "New York, San Francisco, London",
    "industries": "Technology, Healthcare, Finance",
    "keywords": "blockchain, AI, machine learning",
    "excludeTerms": "recruiter, intern, student",
    "countries": "USA, UK, Germany, Canada",
    "sectors": "healthcare, education, environment",
    "niches": "fitness, beauty, gaming, travel"
  }
}
```

**Response:**
```json
{
  "success": true,
  "queries": [
    {
      "type": "LinkedIn Profiles",
      "query": "site:linkedin.com/in/ (\"CEO\" OR \"CTO\" OR \"Marketing Manager\") AND (\"Microsoft\" OR \"Google\" OR \"Amazon\") AND (\"New York\" OR \"San Francisco\" OR \"London\") AND (blockchain OR AI OR \"machine learning\") -\"recruiter\" -\"intern\" -\"student\"",
      "description": "Search for LinkedIn profiles matching your criteria"
    },
    {
      "type": "Event Participants",
      "query": "(\"Technology\" OR \"Healthcare\" OR \"Finance\") AND (\"New York\" OR \"San Francisco\" OR \"London\") AND (conference OR summit OR event OR meetup OR workshop OR attendees) AND (blockchain OR AI OR \"machine learning\") -\"recruiter\" -\"intern\" -\"student\"",
      "description": "Find attendees and participants from industry events"
    }
  ],
  "creditsUsed": 1,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Error Response:**
```json
{
  "error": "Insufficient credits or credit system error",
  "message": "Additional error details"
}
```

## Query Types Generated

The API generates up to 7 different types of boolean search queries based on your criteria:

1. **LinkedIn Profiles** - Find professionals on LinkedIn
2. **Event Participants** - Discover event attendees and conference participants
3. **Contact Information** - Locate email addresses and phone numbers
4. **Influencer Contacts** - Find content creators and social media influencers
5. **Politicians & Officials** - Locate government officials and political figures
6. **Real Estate Contacts** - Find real estate professionals and property agents
7. **Suppliers & Vendors** - Locate business suppliers and service providers

## Using the API with JavaScript/TypeScript

### Installation

```bash
npm install @supabase/supabase-js
```

### Example Usage

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qulglzsnilsqfhbtpjmr.supabase.co',
  'your-anon-key'
);

// First, authenticate the user
const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

if (authError) {
  console.error('Authentication failed:', authError);
  return;
}

// Generate queries
const criteria = {
  jobTitles: "CEO, CTO",
  companies: "Microsoft, Google",
  locations: "New York, San Francisco",
  industries: "Technology",
  keywords: "AI, blockchain"
};

const { data, error } = await supabase.functions.invoke('generate-queries', {
  body: { criteria }
});

if (error) {
  console.error('API Error:', error);
} else {
  console.log(`Generated ${data.queries.length} queries:`);
  data.queries.forEach((query, index) => {
    console.log(`${index + 1}. ${query.type}:`);
    console.log(`   Query: ${query.query}`);
    console.log(`   Description: ${query.description}\n`);
  });
}
```

### Using the Utility Functions

For easier integration, use the provided utility functions:

```typescript
import { generateQueriesApi, getUserCredits } from './src/utils/api';

// Check current credits
const credits = await getUserCredits();
console.log(`Current credits: ${credits}`);

// Generate queries
const criteria = {
  jobTitles: "CEO, CTO",
  companies: "Microsoft, Google"
};

try {
  const response = await generateQueriesApi(criteria);
  if (response.success) {
    console.log(`Generated ${response.queries.length} queries using ${response.creditsUsed} credit`);
    response.queries.forEach(query => {
      console.log(`${query.type}: ${query.query}`);
    });
  }
} catch (error) {
  console.error('Error:', error.message);
}
```

## Credit System

- Each API call consumes **1 credit**
- New users receive 10 free credits
- Check your current credit balance using the `getUserCredits()` utility function
- Monitor your API usage through credit transaction history

## Error Codes

| Status Code | Error | Description |
|-------------|-------|-------------|
| 400 | Bad Request | Invalid or missing search criteria |
| 401 | Unauthorized | Missing or invalid authentication token |
| 402 | Payment Required | Insufficient credits |
| 500 | Internal Server Error | Server-side error |

## Rate Limiting

The API is subject to standard Supabase Edge Function limits:
- Maximum 1000 requests per minute per IP
- Maximum 30-second execution time per request

## Support

For API support and questions, please contact support through the application's support system or visit our documentation.

## Examples by Use Case

### LinkedIn Prospecting
```json
{
  "criteria": {
    "jobTitles": "Chief Marketing Officer, VP Marketing",
    "companies": "Fortune 500",
    "locations": "California, New York",
    "industries": "SaaS, Technology",
    "excludeTerms": "recruiter, agency"
  }
}
```

### Real Estate Lead Generation
```json
{
  "criteria": {
    "locations": "Miami, Fort Lauderdale, Boca Raton",
    "keywords": "luxury homes, waterfront, investment property",
    "excludeTerms": "rental, lease"
  }
}
```

### Influencer Outreach
```json
{
  "criteria": {
    "niches": "fitness, nutrition, wellness",
    "countries": "USA, Canada",
    "keywords": "sponsored, partnership, collaboration",
    "excludeTerms": "fake, bot"
  }
}
```