import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-9xl md:text-[150px] font-bold gradient-text leading-none">
              404
            </h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Page Not Found
          </h2>
          
          <p className="text-foreground/60 text-lg mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="gradient-button px-8 py-4 text-white rounded-lg inline-flex items-center gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/">
              <Button className="px-8 py-4 rounded-lg border border-border hover:border-primary/50 transition-colors inline-flex items-center gap-2">
                Start Downloading
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
