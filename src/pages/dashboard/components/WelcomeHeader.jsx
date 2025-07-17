import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ userName }) => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-depth-card rounded-organic-lg p-6 shadow-therapeutic-sm border border-border">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Sun" size={24} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground">
            {getGreeting()}, {userName}
          </h1>
          <p className="text-sm text-muted-foreground font-caption">
            {getCurrentDate()}
          </p>
        </div>
      </div>
      <p className="text-muted-foreground">
        Welcome to your personal wellness space. How are you feeling today?
      </p>
    </div>
  );
};

export default WelcomeHeader;