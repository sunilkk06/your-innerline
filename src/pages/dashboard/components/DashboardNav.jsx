import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';

const DashboardNav = () => {
  const { user, userProfile, signOut } = useAuth();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Journal', path: '/daily-journaling-interface', icon: 'BookOpen' },
    { name: 'Analytics', path: '/mood-history-analytics', icon: 'BarChart2' },
    { name: 'Settings', path: '/account-settings-privacy', icon: 'Settings' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect is handled by AuthContext
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-organic flex items-center justify-center">
              <Icon name="Heart" size={20} className="text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              Your Innerline
            </span>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-6 py-2 text-base font-medium rounded-full transition-therapeutic ${
                    isActive(item.path)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-muted transition-therapeutic"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                {userProfile?.avatar_url ? (
                  <img
                    src={userProfile.avatar_url}
                    alt={userProfile.full_name || 'User'}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={16} className="text-primary" />
                )}
              </div>
              <span className="hidden md:block text-sm font-medium text-foreground">
                {userProfile?.full_name || user?.email?.split('@')[0] || 'User'}
              </span>
              <Icon name="ChevronDown" size={16} className="hidden md:block text-muted-foreground" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-organic shadow-therapeutic-lg z-50">
                <div className="py-1">
                  <Link
                    to="/account-settings-privacy"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-therapeutic"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Account Settings
                  </Link>
                  <Link
                    to="/account-settings-privacy/profile"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-therapeutic"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Edit Profile
                  </Link>
                  <div className="border-t border-border my-1"></div>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-therapeutic"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-therapeutic">
              <Icon name="Menu" size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center py-3 px-4 ${
                isActive(item.path)
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;