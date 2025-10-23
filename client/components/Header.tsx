import { Link } from "react-router-dom";
import { Download, Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/40 transition-all duration-300">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-background px-3 py-2 rounded-lg">
              <Download className="w-5 h-5 text-primary" />
            </div>
          </div>
          <span className="text-xl font-bold gradient-text hidden sm:inline">
            VidSnap
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium hover:text-primary transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-medium hover:text-primary transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link
            to="/history"
            className="text-sm font-medium hover:text-primary transition-colors duration-200"
          >
            History
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium hover:text-primary transition-colors duration-200"
          >
            About
          </Link>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-secondary/10 rounded-lg transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-secondary/10 rounded-lg transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/50 backdrop-blur-sm animate-slide-down">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              to="/"
              className="block px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="block px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/history"
              className="block px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              History
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
