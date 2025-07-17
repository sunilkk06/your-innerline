import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-organic flex items-center justify-center">
              <Icon name="Heart" size={20} className="text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              Your Innerline
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-foreground transition-therapeutic"
            >
              Home
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-muted-foreground hover:text-foreground transition-therapeutic"
            >
              How It Works
            </Link>
            <Link 
              to="/about" 
              className="text-muted-foreground hover:text-foreground transition-therapeutic"
            >
              About
            </Link>
            <Link 
              to="/authentication-login-register" 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-organic hover:bg-primary/90 transition-therapeutic"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-muted-foreground hover:text-foreground transition-therapeutic"
            >
              <Icon name={isOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <Link 
                to="/" 
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-therapeutic"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/how-it-works" 
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-therapeutic"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-therapeutic"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/authentication-login-register" 
                className="block px-3 py-2 bg-primary text-primary-foreground rounded-organic hover:bg-primary/90 transition-therapeutic mt-2"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;