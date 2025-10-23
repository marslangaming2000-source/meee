import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">VidSnap</span>
          </h1>
          <p className="text-foreground/60 text-lg mb-8">
            Learn more about our mission, team, and the technology behind the fastest video downloader on the web.
          </p>
          
          <div className="bg-card border border-border rounded-xl p-12 mb-8">
            <p className="text-foreground/70 mb-6">
              This page will showcase our story, team, technology stack, and commitment to providing the best video downloading experience.
            </p>
            <p className="text-sm text-foreground/50">
              Coming soon with our full story and team information!
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
