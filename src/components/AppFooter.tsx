import React from 'react';
import { Heart, Github, ExternalLink, Zap } from 'lucide-react';

export const AppFooter: React.FC = () => {
  return (
    <footer className="glass-effect border-t border-border/50 mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4 animate-fade-in-up">
            <div className="flex items-center space-x-2">
               <div className="p-3 rounded-xl bg-gradient-to-br from-black via-gray-760 to-gray-800 shadow-lg shadow-red-500/30">
  <img 
    src="/favicon.ico"
    alt="Company Logo" 
    className="h-8 w-8 object-contain"
  />
</div>
              <span className="font-semibold text-lg">Carrier Filter Pro</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Revolutionizing, FMCSA carrier data management with advanced filtering, 
             and most latest analytics.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              
              <span>By Nestnic Solutions, for Trucking Bussinesses</span>
            </div>
          </div>
          
          {/* Features */}
          <div className="space-y-4 animate-fade-in-up [animation-delay:200ms]">
            <h3 className="font-semibold text-foreground">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors cursor-pointer">
                ✨ Smart Filtering Engine
              </li>
              <li className="hover:text-foreground transition-colors cursor-pointer">
                📊 Auguest 2025 Data Analytics
              </li>
              <li className="hover:text-foreground transition-colors cursor-pointer">
                📁 Data Export & Download
              </li>
            </ul>
          </div>
          
          {/* Links & Stats */}
          <div className="space-y-4 animate-fade-in-up [animation-delay:400ms]">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="space-y-3">
             
              
              <div className="pt-4 space-y-2">
                <div className="text-xs text-muted-foreground">
                  <span className="font-mono">v</span> • Last Data updated: Aug 2025
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>🚀 99.9% Uptime</span>
                  <span>⚡ Sub-100ms Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-xs text-muted-foreground">
            © 2025 Carrier Filter Pro. Crafted with precision and passion by NESTNIC SOLUTIONS.
          </div>
          <div className="flex items-center space-x-6 text-xs text-muted-foreground">
            <span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};