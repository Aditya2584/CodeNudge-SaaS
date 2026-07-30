import React from 'react';
import { Code2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-background-light border-t border-white/10 py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Code2 className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold tracking-tight text-white">CodeNudge</span>
        </div>
        
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CodeNudge. All rights reserved.
        </p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Contact</a>
        </div>
      </div>
    </footer>
  );
};
