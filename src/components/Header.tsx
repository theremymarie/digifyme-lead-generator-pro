import { Search, Target, Users } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-primary to-primary-glow">
            <Target className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Digifyme Leadfinder Pro
          </h1>
        </div>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Generate powerful Google boolean search queries to find professionals, influencers, politicians, 
          real estate contacts, suppliers, event participants, and contact information across any industry or location.
        </p>
        
        <div className="flex items-center justify-center space-x-8 pt-6">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Search className="w-5 h-5 text-primary" />
            <span className="text-sm">Boolean Queries</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm">LinkedIn Profiles</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Target className="w-5 h-5 text-primary" />
            <span className="text-sm">Contact Discovery</span>
          </div>
        </div>
      </div>
    </header>
  );
};