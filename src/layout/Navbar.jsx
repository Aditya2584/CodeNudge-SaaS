import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Code2, Menu, ChevronRight, Globe } from 'lucide-react';

export const Navbar = ({ onOpenMobileMenu }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-glass' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
            <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            CodeNudge
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 uppercase tracking-wider">
              SaaS
            </span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-surface/50 border border-white/[0.08] backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm">
          <a
            href="#features"
            className="text-xs font-medium text-muted hover:text-white px-3 py-1.5 rounded-full transition-colors hover:bg-white/[0.06]"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-xs font-medium text-muted hover:text-white px-3 py-1.5 rounded-full transition-colors hover:bg-white/[0.06]"
          >
            How it Works
          </a>
          <div className="relative group inline-flex items-center">
            <a
              href="#pricing"
              className="text-xs font-medium text-muted hover:text-white px-3 py-1.5 rounded-full transition-colors hover:bg-white/[0.06] flex items-center gap-1.5"
            >
              Pricing
              <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-white/10 text-muted-dark border border-white/10">
                Coming Soon
              </span>
            </a>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-muted hover:text-white px-3 py-1.5 rounded-full transition-colors hover:bg-white/[0.06] flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5" />
            GitHub
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:inline-flex">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
              Get Started
            </Button>
          </Link>

          {/* Mobile menu toggle */}
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden text-muted hover:text-white p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
