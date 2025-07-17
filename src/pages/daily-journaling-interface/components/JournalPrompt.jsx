import React from 'react';
import Icon from '../../../components/AppIcon';

const JournalPrompt = ({ currentDate }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Heart" size={24} className="text-primary" />
        </div>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-2">
        How are you feeling today?
      </h1>
      
      <p className="text-muted-foreground text-sm md:text-base mb-1">
        {formatDate(currentDate)}
      </p>
      
      <p className="text-muted-foreground text-xs md:text-sm font-caption">
        Take a moment to reflect and express your thoughts freely
      </p>
    </div>
  );
};

export default JournalPrompt;