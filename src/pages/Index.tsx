import { Header } from "@/components/Header";
import { SearchForm } from "@/components/SearchForm";
import { Features } from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/90">
      <div className="relative">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 pointer-events-none" />
        
        <div className="relative z-10">
          <Header />
          
          <main className="px-4 pb-16">
            <SearchForm />
          </main>
          
          <Features />
        </div>
      </div>
    </div>
  );
};

export default Index;
