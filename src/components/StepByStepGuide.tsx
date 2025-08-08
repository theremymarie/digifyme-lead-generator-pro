import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowDown, Target, Search, Copy, Filter, Users, MapPin, Building2, Hash, X, Lightbulb } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Define Your Target",
    icon: Target,
    description: "Clearly identify who or what you're looking for",
    substeps: [
      {
        action: "Choose your primary search type",
        examples: ["LinkedIn professionals", "Real estate agents", "Industry suppliers", "Political contacts", "Influencers"]
      },
      {
        action: "Identify the main characteristics",
        examples: ["Job titles (CEO, Manager)", "Industry (Technology, Healthcare)", "Location (New York, London)"]
      },
      {
        action: "Determine contact information needs",
        examples: ["Email addresses", "Phone numbers", "Office locations", "Social media profiles"]
      }
    ]
  },
  {
    number: 2,
    title: "Fill in Job Titles & Roles",
    icon: Users,
    description: "Enter specific positions you want to target",
    substeps: [
      {
        action: "Use exact job titles",
        examples: ["CEO, Chief Executive Officer", "CTO, Chief Technology Officer", "Marketing Manager, Marketing Director"]
      },
      {
        action: "Include variations and synonyms",
        examples: ["VP, Vice President", "Dir, Director", "Head of, Manager of"]
      },
      {
        action: "Consider seniority levels",
        examples: ["Senior, Junior, Lead", "Associate, Principal", "Executive, Coordinator"]
      }
    ]
  },
  {
    number: 3,
    title: "Specify Companies & Organizations",
    icon: Building2,
    description: "Target specific companies or organization types",
    substeps: [
      {
        action: "Enter exact company names",
        examples: ["Microsoft, Apple, Google", "JPMorgan Chase, Goldman Sachs", "Johnson & Johnson, Pfizer"]
      },
      {
        action: "Include company variations",
        examples: ["IBM, International Business Machines", "P&G, Procter & Gamble", "GE, General Electric"]
      },
      {
        action: "Consider company types",
        examples: ["Fortune 500, Startup", "Non-profit, Government", "Public, Private"]
      }
    ]
  },
  {
    number: 4,
    title: "Set Geographic Targeting",
    icon: MapPin,
    description: "Define locations and geographic scope",
    substeps: [
      {
        action: "Add cities and metropolitan areas",
        examples: ["New York City, NYC", "San Francisco Bay Area", "London, Greater London"]
      },
      {
        action: "Include states and regions",
        examples: ["California, CA", "Texas, TX", "European Union, EU"]
      },
      {
        action: "Specify countries",
        examples: ["United States, USA", "United Kingdom, UK", "Germany, Deutschland"]
      }
    ]
  },
  {
    number: 5,
    title: "Add Industry Keywords",
    icon: Hash,
    description: "Include relevant industry and niche terms",
    substeps: [
      {
        action: "Primary industry terms",
        examples: ["Technology, Tech", "Healthcare, Medical", "Finance, Financial Services"]
      },
      {
        action: "Specific niches and specialties",
        examples: ["Artificial Intelligence, AI", "Blockchain, Cryptocurrency", "Renewable Energy, Solar"]
      },
      {
        action: "Technical keywords",
        examples: ["Software Development", "Digital Marketing", "Data Analytics"]
      }
    ]
  },
  {
    number: 6,
    title: "Set Exclusion Terms",
    icon: X,
    description: "Filter out unwanted results",
    substeps: [
      {
        action: "Exclude irrelevant job levels",
        examples: ["Intern, Internship", "Student, Graduate", "Entry-level, Junior"]
      },
      {
        action: "Remove unwanted industries",
        examples: ["Recruiting, Recruitment", "Consulting, Consultant", "Sales, Salesperson"]
      },
      {
        action: "Filter out competitors",
        examples: ["Competitor names", "Unwanted locations", "Irrelevant departments"]
      }
    ]
  },
  {
    number: 7,
    title: "Generate & Review Queries",
    icon: Search,
    description: "Create and analyze your boolean searches",
    substeps: [
      {
        action: "Click 'Generate Search Queries'",
        examples: ["System creates multiple query types", "Each query targets different platforms", "Optimized for specific search engines"]
      },
      {
        action: "Review generated queries",
        examples: ["Check logic and operators", "Verify all criteria included", "Ensure proper formatting"]
      },
      {
        action: "Understand query structure",
        examples: ["AND joins required terms", "OR provides alternatives", "Quotes ensure exact matches"]
      }
    ]
  },
  {
    number: 8,
    title: "Copy & Execute Search",
    icon: Copy,
    description: "Use your queries in search engines",
    substeps: [
      {
        action: "Copy the relevant query",
        examples: ["LinkedIn profiles for networking", "Contact info for outreach", "Event participants for lead gen"]
      },
      {
        action: "Paste into Google search",
        examples: ["Open new Google tab", "Paste complete query", "Press Enter to search"]
      },
      {
        action: "Analyze and refine results",
        examples: ["Review first page results", "Add more specific terms", "Adjust location or industry"]
      }
    ]
  }
];

const tips = [
  {
    title: "Boolean Logic Basics",
    icon: Filter,
    tips: [
      "AND - Both terms must appear (narrows results)",
      "OR - Either term can appear (broadens results)", 
      "Quotes - Exact phrase matching",
      "Minus (-) - Excludes specific terms"
    ]
  },
  {
    title: "Search Optimization",
    icon: Lightbulb,
    tips: [
      "Start broad, then narrow down",
      "Use company variations (IBM vs International Business Machines)",
      "Include common abbreviations",
      "Test different keyword combinations"
    ]
  }
];

export const StepByStepGuide = () => {
  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Step-by-Step Boolean Query Generation
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Follow this detailed process to create powerful Google boolean search queries that find exactly who you're looking for
          </p>
        </div>

        {/* Main Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col lg:flex-row items-start gap-6">
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-bold text-xl shadow-lg">
                  {step.number}
                </div>
                
                <Card className="flex-1 border-border/50 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <step.icon className="w-6 h-6 text-primary" />
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {step.substeps.map((substep, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{substep.action}</p>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {substep.examples.map((example, exIdx) => (
                                <Badge key={exIdx} variant="secondary" className="text-xs">
                                  {example}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-4">
                  <ArrowDown className="w-6 h-6 text-primary/50" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {tips.map((tipSection, index) => (
            <Card key={index} className="border-border/50 bg-gradient-to-br from-primary/5 to-secondary/20 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <tipSection.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tipSection.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tipSection.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center pt-8">
          <Card className="border-border/50 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 backdrop-blur-sm">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold mb-2">Ready to Generate Your Queries?</h3>
              <p className="text-muted-foreground mb-4">
                Use the search form above to create your customized boolean queries following these steps
              </p>
              <div className="flex justify-center">
                <Badge variant="outline" className="px-4 py-2">
                  Scroll up to start building your search queries
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};