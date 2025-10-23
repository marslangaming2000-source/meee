import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Download,
  Zap,
  Shield,
  Lock,
  Video,
  Sparkles,
  ArrowRight,
  Check,
  Youtube,
  Instagram,
  TrendingUp,
  Maximize2,
  Clock,
} from "lucide-react";
import { useState } from "react";

export default function Index() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      // Reset form
      setUrl("");
    }, 2000);
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Download videos in seconds with our optimized backend",
    },
    {
      icon: <Maximize2 className="w-6 h-6" />,
      title: "Multiple Formats",
      description: "Support for 4K, HD, Full HD, and multiple file formats",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "100% Safe",
      description: "No ads, no malware, completely secure downloads",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Privacy Focused",
      description: "Your downloads are private, no tracking or logging",
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Preview Before Download",
      description: "Watch a preview and select quality before downloading",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "History & Management",
      description: "Track all your downloads with organized history",
    },
  ];

  const platforms = [
    { name: "YouTube", icon: <Youtube className="w-8 h-8" /> },
    { name: "Instagram", icon: <Instagram className="w-8 h-8" /> },
    { name: "TikTok", icon: <TrendingUp className="w-8 h-8" /> },
    { name: "Facebook", icon: <Video className="w-8 h-8" /> },
    { name: "Twitter (X)", icon: <Download className="w-8 h-8" /> },
    { name: "Vimeo", icon: <Video className="w-8 h-8" /> },
  ];

  const steps = [
    {
      number: "01",
      title: "Paste URL",
      description: "Enter the video link from any supported platform",
    },
    {
      number: "02",
      title: "Select Quality",
      description: "Choose your preferred resolution and format",
    },
    {
      number: "03",
      title: "Download",
      description: "Start downloading instantly with one click",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 md:pt-32 md:pb-48">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-10"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                The fastest video downloader on the web
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 leading-tight">
            <span className="gradient-text">Download Videos</span>
            <br />
            <span className="text-foreground">From Anywhere, Instantly</span>
          </h1>

          {/* Subtitle */}
          <p className="text-center text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-12">
            The ultimate video downloader supporting YouTube, Instagram, TikTok,
            and more. Download in any quality, any format, completely free and
            secure.
          </p>

          {/* Download Input Form */}
          <form
            onSubmit={handleDownload}
            className="max-w-2xl mx-auto mb-12 animate-slide-up"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-xl p-1">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    placeholder="Paste your video URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 bg-transparent outline-none px-6 py-4 text-foreground placeholder-foreground/50 placeholder:text-sm"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !url.trim()}
                    className="gradient-button px-8 py-4 font-semibold text-white rounded-lg m-1 flex items-center gap-2 justify-center transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-foreground/50 mt-4">
              Fast • Secure • No Registration • Works with all major platforms
            </p>
          </form>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                50M+
              </div>
              <p className="text-sm text-foreground/60 mt-2">Downloads</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                8
              </div>
              <p className="text-sm text-foreground/60 mt-2">Platforms</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                4K
              </div>
              <p className="text-sm text-foreground/60 mt-2">Max Quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Supported Platforms
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Download from all your favorite platforms with a single tool
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
                <div className="relative flex flex-col items-center gap-3">
                  <div className="text-primary group-hover:text-secondary transition-colors duration-300">
                    {platform.icon}
                  </div>
                  <span className="text-sm font-medium text-center">
                    {platform.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Y2Tdown?
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Experience the fastest and most reliable video downloader with
              cutting-edge features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white mb-4 group-hover:shadow-lg group-hover:shadow-primary/40 transition-shadow duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="relative container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Three simple steps to download your videos instantly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  {/* Step Number */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 text-white text-2xl font-bold shadow-lg shadow-primary/40">
                    {step.number}
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-10 -right-16 w-32 h-1 items-center justify-center">
                      <div className="absolute w-full h-px bg-gradient-to-r from-primary to-transparent"></div>
                      <ArrowRight className="absolute right-0 w-4 h-4 text-primary" />
                    </div>
                  )}

                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60 text-center text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative bg-card border border-primary/30 rounded-2xl p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Download?
              </h2>
              <p className="text-foreground/70 mb-8 text-lg">
                Join millions of users who trust Y2Tdown for fast, secure, and
                reliable video downloads
              </p>
              <Button className="gradient-button px-8 py-4 font-semibold text-white rounded-lg inline-flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/40">
                Start Downloading Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
              <Download className="w-5 h-5 text-primary" />
              <span className="font-bold gradient-text">Y2Tdown</span>
            </div>
              <p className="text-sm text-foreground/60">
                The fastest way to download videos from anywhere
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <p>&copy; 2025 Y2Tdown. All rights reserved.</p>
            <p>Made with ❤️ for creators everywhere</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
