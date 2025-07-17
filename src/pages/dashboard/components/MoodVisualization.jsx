import React from 'react';
import Icon from '../../../components/AppIcon';

const MoodVisualization = () => {
  const recentMoods = [
    { date: '2025-07-15', mood: 'good', color: 'bg-primary', intensity: 80 },
    { date: '2025-07-14', mood: 'great', color: 'bg-success', intensity: 95 },
    { date: '2025-07-13', mood: 'okay', color: 'bg-warning', intensity: 60 },
    { date: '2025-07-12', mood: 'good', color: 'bg-primary', intensity: 75 },
    { date: '2025-07-11', mood: 'low', color: 'bg-accent', intensity: 40 },
    { date: '2025-07-10', mood: 'good', color: 'bg-primary', intensity: 85 },
    { date: '2025-07-09', mood: 'great', color: 'bg-success', intensity: 90 }
  ];

  const averageMood = recentMoods.reduce((sum, mood) => sum + mood.intensity, 0) / recentMoods.length;

  return (
    <div className="bg-card rounded-organic-lg p-6 shadow-therapeutic border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Recent Mood Pattern
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="text-sm font-caption text-success">
            {averageMood.toFixed(0)}% avg
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {recentMoods.slice(0, 5).map((mood, index) => (
          <div key={mood.date} className="flex items-center space-x-3">
            <span className="text-xs font-mono text-muted-foreground w-16">
              {new Date(mood.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${mood.color} transition-all duration-500`}
                style={{ width: `${mood.intensity}%` }}
              />
            </div>
            <span className="text-xs font-caption text-muted-foreground w-8">
              {mood.intensity}%
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-xs font-caption text-muted-foreground">
            Last 7 days
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={16} className="text-primary" />
          <span className="text-xs font-caption text-primary">
            View detailed analytics
          </span>
        </div>
      </div>
    </div>
  );
};

export default MoodVisualization;