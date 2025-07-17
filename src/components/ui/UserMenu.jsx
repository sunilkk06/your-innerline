import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (action) => {
    setIsOpen(false);
    if (action === 'logout') {
      onLogout();
    } else if (action === 'settings') {
      navigate('/account-settings-privacy');
    }
  };

  const menuItems = [
    {
      label: 'Account Settings',
      icon: 'Settings',
      action: 'settings',
      description: 'Manage your privacy and preferences'
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      action: 'help',
      description: 'Get assistance and resources'
    },
    {
      label: 'Logout',
      icon: 'LogOut',
      action: 'logout',
      description: 'Sign out of your account',
      variant: 'destructive'
    }
  ];

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className="flex items-center space-x-2 px-3 py-2 rounded-organic hover:bg-muted transition-therapeutic"
      >
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || 'User'}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(user?.name || 'User')
          )}
        </div>
        <span className="hidden sm:block text-sm font-medium text-foreground">
          {user?.name || 'User'}
        </span>
        <Icon 
          name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="text-muted-foreground transition-transform duration-200"
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-organic-lg shadow-therapeutic-lg z-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'User'}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(user?.name || 'User')
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuItemClick(item.action)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-therapeutic ${
                  item.variant === 'destructive' ?'hover:bg-destructive/10 text-destructive hover:text-destructive' :'hover:bg-muted text-foreground hover:text-foreground'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={18} 
                  className={item.variant === 'destructive' ? 'text-destructive' : 'text-muted-foreground'}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-border">
            <p className="text-xs text-muted-foreground font-caption">
              Your wellness journey is private and secure
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;