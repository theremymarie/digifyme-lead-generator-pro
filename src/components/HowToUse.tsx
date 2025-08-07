import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search, Copy, Target, Users, Calendar, Mail, Star, Crown } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Enter Your Criteria",
    description: "Fill in the search form with your target parameters",
    details: [
      "Job Titles: CEO, CTO, Marketing Manager",
      "Companies: Microsoft, Google, Amazon", 
      "Locations: New York, San Francisco, London",
      "Industries: Technology, Healthcare, Finance",
      "Keywords: blockchain, AI, machine learning",
      "Countries: USA, UK, Germany, Canada",
      "Sectors: healthcare, education, environment", 
      "Niches: fitness, beauty, gaming, travel",
      "Exclude Terms: recruiter, intern, student"
    ],
    icon: Target
  },
  {
    number: 2,
    title: "Generate Queries",
    description: "Click the generate button to create boolean search strings",
    details: [
      "LinkedIn Profile searches with site:linkedin.com/in/",
      "Event participant searches with conference terms",
      "Contact discovery searches with email and phone patterns",
      "Influencer searches with social media and niche targeting",
      "Political contact searches with government and official terms",
      "Smart boolean operators (AND, OR, quotes, exclusions)"
    ],
    icon: Search
  },
  {
    number: 3,
    title: "Copy & Search",
    description: "Copy the generated queries and paste them into Google",
    details: [
      "Click the copy button next to each query",
      "Open Google in a new tab",
      "Paste the query into the search box",
      "Review results and refine as needed"
    ],
    icon: Copy
  }
];

const searchTypes = [
  {
    type: "LinkedIn Profiles",
    icon: Users,
    example: 'site:linkedin.com/in/ ("CEO" OR "CTO") AND ("Microsoft" OR "Google") AND "San Francisco"',
    description: "Find decision makers and prospects on LinkedIn"
  },
  {
    type: "Event Participants",
    icon: Calendar,
    example: '"Technology" AND "San Francisco" AND (conference OR summit OR event OR meetup)',
    description: "Discover attendees from industry events"
  },
  {
    type: "Contact Information",
    icon: Mail,
    example: '"Microsoft" AND ("CEO" OR "CTO") AND (email OR contact OR @ OR phone)',
    description: "Locate email addresses and phone numbers"
  },
  {
    type: "Influencer Contacts",
    icon: Star,
    example: '(influencer OR blogger OR "content creator") AND ("fitness" OR "beauty") AND "USA" AND (contact OR email)',
    description: "Find influencers and content creators in specific niches"
  },
  {
    type: "Politicians & Officials",
    icon: Crown,
    example: '(politician OR senator OR mayor) AND "USA" AND "healthcare" AND (office OR contact OR email)',
    description: "Locate political figures and government officials"
  }
];

export const HowToUse = () => {
  return (
    <section className="w-full py-16 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            How to Use Digifyme Leadfinder Pro
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Generate powerful boolean search queries in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-start gap-6">
              <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-bold text-xl">
                {step.number}
              </div>
              
              <Card className="flex-1 border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <step.icon className="w-6 h-6 text-primary" />
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                        <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Search Types Examples */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Query Examples</h3>
            <p className="text-muted-foreground">
              See what kind of boolean queries Digifyme Leadfinder Pro generates
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {searchTypes.map((type, index) => (
              <Card key={index} className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <type.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{type.type}</CardTitle>
                      <CardDescription className="text-sm">
                        {type.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="secondary" className="text-xs">
                      Example Query
                    </Badge>
                    <div className="bg-background/50 p-3 rounded border font-mono text-xs break-all text-muted-foreground">
                      {type.example}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips */}
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Pro Tips</CardTitle>
            <CardDescription>
              Get the most out of your lead generation searches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Search Strategy</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Use specific job titles for better targeting</li>
                  <li>• Combine company names with locations</li>
                  <li>• Add industry keywords for context</li>
                  <li>• Use exclusion terms to filter out irrelevant results</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Best Practices</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Test different keyword combinations</li>
                  <li>• Use quotes for exact phrase matching</li>
                  <li>• Try variations of job titles and company names</li>
                  <li>• Refine results by adding more specific criteria</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};