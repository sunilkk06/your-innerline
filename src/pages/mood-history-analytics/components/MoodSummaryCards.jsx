import React from 'react';
import Icon from '../../../components/AppIcon';


const MoodSummaryCards = ({ summaryData, timeRange }) => {
  const {
    totalEntries = 0,
    currentStreak = 0,
    longestStreak = 0,
    averageMood = 'neutral',
    moodDistribution = {},
    weeklyGoalProgress = 0,
    improvementTrend = 0,
    consistencyScore = 0
  } = summaryData;

  const moodConfig = {
    happy: { color: 'text-success', bgColor: 'bg-success/10', icon: 'Smile' },
    grateful: { color: 'text-primary', bgColor: 'bg-primary/10', icon: 'Heart' },
    neutral: { color: 'text-accent', bgColor: 'bg-accent/10', icon: 'Minus' },
    anxious: { color: 'text-warning', bgColor: 'bg-warning/10', icon: 'Zap' },
    sad: { color: 'text-destructive', bgColor: 'bg-destructive/10', icon: 'Frown' }
  };

  const getStreakMessage = () => {
    if (currentStreak === 0) return "Start your wellness journey today";
    if (currentStreak === 1) return "Great start! Keep going";
    if (currentStreak < 7) return "Building a healthy habit";
    if (currentStreak < 14) return "You're doing amazing!";
    if (currentStreak < 30) return "Incredible consistency!";
    return "You're a wellness champion!";
  };

  const getConsistencyLevel = () => {
    if (consistencyScore >= 90) return { level: 'Excellent', color: 'text-success', bgColor: 'bg-success/10' };
    if (consistencyScore >= 70) return { level: 'Good', color: 'text-primary', bgColor: 'bg-primary/10' };
    if (consistencyScore >= 50) return { level: 'Fair', color: 'text-warning', bgColor: 'bg-warning/10' };
    return { level: 'Needs Work', color: 'text-destructive', bgColor: 'bg-destructive/10' };
  };

  const getTrendIcon = () => {
    if (improvementTrend > 0.1) return { icon: 'TrendingUp', color: 'text-success' };
    if (improvementTrend < -0.1) return { icon: 'TrendingDown', color: 'text-destructive' };
    return { icon: 'Minus', color: 'text-accent' };
  };

  const formatTimeRange = () => {
    switch (timeRange) {
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case 'quarter': return 'Last 3 Months';
      case 'year': return 'This Year';
      default: return 'All Time';
    }
  };

  const summaryCards = [
    {
      title: 'Journal Entries',
      value: totalEntries,
      subtitle: formatTimeRange(),
      icon: 'BookOpen',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Current Streak',
      value: `${currentStreak} days`,
      subtitle: getStreakMessage(),
      icon: 'Flame',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Longest Streak',
      value: `${longestStreak} days`,
      subtitle: 'Personal best',
      icon: 'Award',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Weekly Goal',
      value: `${weeklyGoalProgress}%`,
      subtitle: `${Math.round(weeklyGoalProgress / 100 * 7)} of 7 entries`,
      icon: 'Target',
      color: weeklyGoalProgress >= 100 ? 'text-success' : 'text-warning',
      bgColor: weeklyGoalProgress >= 100 ? 'bg-success/10' : 'bg-warning/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-card rounded-organic-lg border border-border p-6 hover:shadow-therapeutic-sm transition-therapeutic"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.bgColor} rounded-organic flex items-center justify-center`}>
                <Icon name={card.icon} size={24} className={card.color} />
              </div>
              {card.title === 'Weekly Goal' && weeklyGoalProgress >= 100 && (
                <Icon name="CheckCircle" size={20} className="text-success" />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-1">
                {card.value}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                {card.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {card.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Mood & Trend */}
        <div className="bg-card rounded-organic-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-medium text-foreground">
              Mood Overview
            </h3>
            <div className="flex items-center space-x-2">
              <Icon 
                name={getTrendIcon().icon} 
                size={16} 
                className={getTrendIcon().color} 
              />
              <span className={`text-sm font-medium ${getTrendIcon().color}`}>
                {improvementTrend > 0.1 ? 'Improving' : 
                 improvementTrend < -0.1 ? 'Declining' : 'Stable'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-16 h-16 ${moodConfig[averageMood]?.bgColor} rounded-organic flex items-center justify-center`}>
              <Icon 
                name={moodConfig[averageMood]?.icon || 'Minus'} 
                size={32} 
                className={moodConfig[averageMood]?.color || 'text-accent'} 
              />
            </div>
            <div>
              <h4 className="text-lg font-heading font-medium text-foreground capitalize">
                {averageMood}
              </h4>
              <p className="text-sm text-muted-foreground">
                Average mood {formatTimeRange().toLowerCase()}
              </p>
            </div>
          </div>

          {/* Mood Distribution */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground mb-3">
              Mood Distribution
            </p>
            {Object.entries(moodDistribution).map(([mood, percentage]) => (
              <div key={mood} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${moodConfig[mood]?.bgColor}`}>
                    <div className={`w-full h-full rounded-full ${moodConfig[mood]?.color.replace('text-', 'bg-')}`} />
                  </div>
                  <span className="text-sm text-foreground capitalize">{mood}</span>
                </div>
                <span className="text-sm font-mono text-muted-foreground">
                  {percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Consistency & Achievements */}
        <div className="bg-card rounded-organic-lg border border-border p-6">
          <h3 className="font-heading font-medium text-foreground mb-4">
            Consistency & Achievements
          </h3>
          
          {/* Consistency Score */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground">Consistency Score</span>
              <span className="text-sm font-mono text-foreground">{consistencyScore}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-1000"
                style={{ width: `${consistencyScore}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${getConsistencyLevel().bgColor} ${getConsistencyLevel().color}`}>
                {getConsistencyLevel().level}
              </span>
              <span className="text-xs text-muted-foreground">
                Based on regular journaling
              </span>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">
              Recent Achievements
            </p>
            
            <div className="space-y-2">
              {currentStreak >= 7 && (
                <div className="flex items-center space-x-3 p-2 bg-success/5 rounded-organic">
                  <Icon name="Award" size={16} className="text-success" />
                  <span className="text-sm text-foreground">Week Warrior</span>
                </div>
              )}
              
              {totalEntries >= 50 && (
                <div className="flex items-center space-x-3 p-2 bg-primary/5 rounded-organic">
                  <Icon name="BookOpen" size={16} className="text-primary" />
                  <span className="text-sm text-foreground">Prolific Writer</span>
                </div>
              )}
              
              {weeklyGoalProgress >= 100 && (
                <div className="flex items-center space-x-3 p-2 bg-accent/5 rounded-organic">
                  <Icon name="Target" size={16} className="text-accent" />
                  <span className="text-sm text-foreground">Goal Achiever</span>
                </div>
              )}
              
              {Object.keys(moodDistribution).length === 0 && (
                <div className="text-center py-4">
                  <Icon name="Sparkles" size={24} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Start journaling to unlock achievements
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodSummaryCards;