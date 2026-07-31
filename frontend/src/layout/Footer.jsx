import React from 'react';
import { Code2, Globe, MessageSquare, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-surface/80 border-t border-white/[0.08] relative overflow-hidden pt-16 pb-12">
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-glow">
                <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-primary" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">CodeNudge</span>
            </Link>
            <p className="text-xs text-muted max-w-xs leading-relaxed">
              Never Forget What You Solve. Smart LeetCode revision powered by spaced repetition and performance analytics.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-white/20 transition-all duration-200"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-white/20 transition-all duration-200"
                aria-label="Community"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-white/20 transition-all duration-200"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs text-muted">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#extension" className="hover:text-primary transition-colors">Chrome Extension</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs text-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LeetCode Guides</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Spaced Repetition</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Legal</h4>
            <ul className="space-y-2.5 text-xs text-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Settings</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} CodeNudge Inc. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Built with precision for engineers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
