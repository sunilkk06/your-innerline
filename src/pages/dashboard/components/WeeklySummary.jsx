import React from 'react';
import Icon from '../../../components/AppIcon';

const WeeklySummary = () => {
  const weeklyStats = {
    checkIns: 5,
    goal: 7,
    streak: 3,
    improvement: 12
  };

  const progressPercentage = (weeklyStats.checkIns / weeklyStats.goal) * 100;

  const getEncouragementMessage = () => {
    if (weeklyStats.checkIns >= weeklyStats.goal) {
      return "Amazing! You've reached your weekly goal! 🎉";
    } else if (weeklyStats.checkIns >= weeklyStats.goal * 0.7) {
      return "You're doing great! Keep up the momentum";
    } else {
      return "Every check-in matters. You're building a healthy habit";
    }
  };

  const summaryCards = [
    {
      title: 'Check-ins',
      value: `${weeklyStats.checkIns}/${weeklyStats.goal}`,
      icon: 'CheckCircle',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Current Streak',
      value: `${weeklyStats.streak} days`,
      icon: 'Flame',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Mood Trend',
      value: `+${weeklyStats.improvement}%`,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="bg-card rounded-organic-lg p-6 shadow-therapeutic border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          This Week's Progress
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-xs font-caption text-muted-foreground">
            Jul 9 - Jul 15
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {summaryCards.map((card, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 ${card.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
              <Icon name={card.icon} size={20} className={card.color} />
            </div>
            <div className="text-lg font-heading font-semibold text-foreground">
              {card.value}
            </div>
            <div className="text-xs font-caption text-muted-foreground">
              {card.title}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-caption text-muted-foreground">
            Weekly Goal Progress
          </span>
          <span className="text-sm font-mono text-foreground">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="bg-success/5 border border-success/20 rounded-organic p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={16} className="text-success" />
            <p className="text-sm text-foreground font-medium">
              {getEncouragementMessage()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummary;