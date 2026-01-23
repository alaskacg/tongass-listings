import { Link } from "react-router-dom";
import { Mail, FileText, Shield, Scale } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <AnimatedLogo />
              <span className="font-display text-base font-bold text-foreground">Tongass Listings</span>
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              Southeast Alaska's premier private listings marketplace connecting buyers and sellers across the Tongass region.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground line-through">$10</span>
              <span className="text-sm font-semibold text-accent">FREE</span>
              <span className="text-xs text-muted-foreground">during beta!</span>
            </div>
          </div>

          {/* Communities */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Communities</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/browse?community=Juneau" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Juneau
                </Link>
              </li>
              <li>
                <Link to="/browse?community=Ketchikan" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Ketchikan
                </Link>
              </li>
              <li>
                <Link to="/browse?community=Sitka" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Sitka
                </Link>
              </li>
              <li>
                <Link to="/browse?community=Petersburg" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Petersburg
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-primary hover:text-primary/80 transition-colors text-xs font-medium">
                  View All Communities →
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Categories</h4>
            <ul className="space-y-1.5">
              <li>
                <a href="https://kenaiautosales.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Vehicles
                </a>
              </li>
              <li>
                <a href="https://alaskanboats.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Boats & Watercraft
                </a>
              </li>
              <li>
                <a href="https://kenaihomesales.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Real Estate
                </a>
              </li>
              <li>
                <a href="https://alaskaminingequipment.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                  Mining Equipment
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Legal</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-xs flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-xs flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors text-xs flex items-center gap-2">
                  <Scale className="w-3 h-3" />
                  Disclaimer
                </Link>
              </li>
              <li>
                <a href="mailto:support@tongasslistings.com" className="text-muted-foreground hover:text-primary transition-colors text-xs flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-muted-foreground text-xs text-center md:text-left">
              © {new Date().getFullYear()} Alaska Listings LLC. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs text-center md:text-right max-w-md">
              Tongass Listings is a listing service only. We do not participate in, endorse, or guarantee any transactions between users.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
