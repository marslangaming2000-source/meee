import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function History() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Download <span className="gradient-text">History</span>
          </h1>
          <p className="text-foreground/60 text-lg mb-8">
            Track and manage all your past downloads, view statistics, and
            revisit your download history with ease.
          </p>

          <div className="bg-card border border-border rounded-xl p-12 mb-8">
            <p className="text-foreground/70 mb-6">
              This page will soon feature a complete download history with
              filters, search, and management options.
            </p>
            <p className="text-sm text-foreground/50">
              Check back soon for the full implementation!
            </p>
          </div>

          <Link to="/">
            <Button className="gradient-button px-8 py-4 text-white rounded-lg inline-flex items-center gap-2">
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
