import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onNewEntry, hasEntryToday }) => {
  const quickActions = [
    {
      label: 'View Dashboard',
      icon: 'LayoutDashboard',
      path: '/dashboard',
      description: 'See your wellness overview'
    },
    {
      label: 'Mood History',
      icon: 'TrendingUp',
      path: '/mood-history-analytics',
      description: 'Track your emotional patterns'
    },
    {
      label: 'Account Settings',
      icon: 'Settings',
      path: '/account-settings-privacy',
      description: 'Manage your preferences'
    }
  ];

  return (
    <div className="bg-card rounded-organic border border-border p-4">
      <h3 className="font-heading font-medium text-foreground mb-4 flex items-center space-x-2">
        <Icon name="Zap" size={18} className="text-primary" />
        <span>Quick Actions</span>
      </h3>

      <div className="space-y-3">
        {/* New Entry Action */}
        <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-organic">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Plus" size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {hasEntryToday ? 'Add Another Entry' : 'Start New Entry'}
              </p>
              <p className="text-xs text-muted-foreground">
                {hasEntryToday ? 'Continue your reflection' : 'Begin your daily reflection'}
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={onNewEntry}
            iconName="Edit3"
            iconPosition="left"
          >
            {hasEntryToday ? 'Add More' : 'Start'}
          </Button>
        </div>

        {/* Navigation Actions */}
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className="flex items-center justify-between p-3 rounded-organic hover:bg-muted transition-therapeutic group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-therapeutic">
                <Icon name={action.icon} size={16} className="text-muted-foreground group-hover:text-primary transition-therapeutic" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-therapeutic" />
          </Link>
        ))}
      </div>

      {/* Encouragement Message */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-start space-x-2">
          <Icon name="Heart" size={16} className="text-accent mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Remember: Every entry is a step toward better understanding yourself. You're doing great!
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;