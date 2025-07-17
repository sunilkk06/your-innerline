import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ mode }) => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <div className="w-12 h-12 bg-primary rounded-organic flex items-center justify-center">
          <Icon name="Heart" size={28} color="white" />
        </div>
        <span className="font-heading font-semibold text-2xl text-foreground">
          Inner Line
        </span>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
          {mode === 'login' ? 'Welcome Back' : 'Begin Your Journey'}
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          {mode === 'login' ?'Sign in to continue your wellness journey and access your private reflection space' :'Create your secure account to start daily journaling and emotional wellness tracking'
          }
        </p>
      </div>

      {/* Breathing Animation */}
      <div className="mt-6 flex justify-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-breathe">
          <Icon name="Sparkles" size={24} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;