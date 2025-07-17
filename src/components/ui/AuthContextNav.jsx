import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import UserMenu from './UserMenu';

const AuthContextNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/landing-page');
    } catch (error) {
      console.log('Sign out error:', error);
    }
  };

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
              Inner Line
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-muted-foreground hover:text-foreground transition-therapeutic"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/daily-journaling-interface" 
                  className="text-muted-foreground hover:text-foreground transition-therapeutic"
                >
                  Journal
                </Link>
                <Link 
                  to="/mood-history-analytics" 
                  className="text-muted-foreground hover:text-foreground transition-therapeutic"
                >
                  Analytics
                </Link>
                <Link 
                  to="/account-settings-privacy" 
                  className="text-muted-foreground hover:text-foreground transition-therapeutic"
                >
                  Settings
                </Link>
                <UserMenu 
                  user={user}
                  userProfile={userProfile}
                  onSignOut={handleSignOut}
                />
              </>
            ) : (
              <>
                <Link 
                  to="/landing-page" 
                  className="text-muted-foreground hover:text-foreground transition-therapeutic"
                >
                  Home
                </Link>
                <Link 
                  to="/authentication-login-register" 
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-organic hover:bg-primary/90 transition-therapeutic"
                >
                  Sign In
                </Link>
              </>
            )}
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
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-therapeutic"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/daily-journaling-interface" 
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-therapeutic"
                    onClick={() => setIsOpen(false)}
                  >
                    Journal
                  </Link>
                  <Link 
                    to="/mood-history-analytics" 
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-therapeutic"
                    onClick={() => setIsOpen(false)}
                  >
                    Analytics
                  </Link>
                  <Link 
                    to="/account-settings-privacy" 
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-therapeutic"
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </Link>
                  <div className="px-3 py-2 border-t border-border">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {userProfile?.full_name || user?.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-error hover:bg-error/10 rounded-organic transition-therapeutic"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/landing-page" 
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-therapeutic"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/authentication-login-register" 
                    className="block px-3 py-2 bg-primary text-primary-foreground rounded-organic hover:bg-primary/90 transition-therapeutic"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AuthContextNav;