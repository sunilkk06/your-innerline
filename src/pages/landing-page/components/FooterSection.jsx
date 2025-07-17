import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  return (
    <footer className="bg-muted/30 text-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-organic flex items-center justify-center">
                <Icon name="Heart" size={20} className="text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground">
                Your Innerline
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your private space to reflect, grow, and breathe.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-therapeutic">
                <Icon name="Twitter" size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-therapeutic">
                <Icon name="Instagram" size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-therapeutic">
                <Icon name="Facebook" size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/features/journaling" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">Daily Journaling</Link></li>
              <li><Link to="/features/mood-tracking" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">Mood Tracking</Link></li>
              <li><Link to="/features/insights" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">AI Insights</Link></li>
              <li><Link to="/features/privacy" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">Privacy Features</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources/mental-health" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">Mental Health</Link></li>
              <li><Link to="/resources/journaling-tips" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">Journaling Tips</Link></li>
              <li><Link to="/resources/faq" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">FAQ</Link></li>
              <li><Link to="/resources/support" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">About Us</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">Blog</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">Careers</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Your Innerline. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">Terms of Service</Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-therapeutic text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;