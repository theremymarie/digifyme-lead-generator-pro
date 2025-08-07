import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Users, Mail, Calendar, Target, Zap } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Boolean Search Queries",
    description: "Generate precise Google boolean search strings with advanced operators for targeted results."
  },
  {
    icon: Users,
    title: "LinkedIn Prospecting",
    description: "Find decision makers and prospects on LinkedIn with job title, company, and location filters."
  },
  {
    icon: Calendar,
    title: "Event Participants",
    description: "Discover attendees from industry conferences, workshops, and networking events."
  },
  {
    icon: Mail,
    title: "Contact Discovery",
    description: "Locate email addresses and phone numbers for your target prospects efficiently."
  },
  {
    icon: Target,
    title: "Precision Targeting",
    description: "Use multiple criteria and exclusion terms to narrow down your search results."
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Copy and paste generated queries directly into Google or other search engines."
  }
];

export const Features = () => {
  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Powerful Lead Generation Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to find and connect with your ideal prospects across multiple platforms
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};