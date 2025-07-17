import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ProgressIndicator = ({ journalStreak = 0, moodEntries = 0, weeklyGoal = 7 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  const location = useLocation();

  const relevantPaths = ['/dashboard', '/daily-journaling-interface', '/mood-history-analytics'];

  useEffect(() => {
    const shouldShow = relevantPaths.includes(location.pathname);
    setIsVisible(shouldShow);
    
    if (shouldShow) {
      setTimeout(() => setAnimateProgress(true), 300);
    } else {
      setAnimateProgress(false);
    }
  }, [location.pathname]);

  const progressPercentage = Math.min((moodEntries / weeklyGoal) * 100, 100);
  const streakLevel = getStreakLevel(journalStreak);

  function getStreakLevel(streak) {
    if (streak >= 30) return { level: 'Master', color: 'text-accent', bgColor: 'bg-accent/10' };
    if (streak >= 14) return { level: 'Committed', color: 'text-success', bgColor: 'bg-success/10' };
    if (streak >= 7) return { level: 'Building', color: 'text-primary', bgColor: 'bg-primary/10' };
    if (streak >= 3) return { level: 'Starting', color: 'text-secondary', bgColor: 'bg-secondary/10' };
    return { level: 'Beginning', color: 'text-muted-foreground', bgColor: 'bg-muted' };
  }

  const getMotivationalMessage = () => {
    if (journalStreak === 0) return "Start your wellness journey today";
    if (journalStreak === 1) return "Great start! Keep going";
    if (journalStreak < 7) return "Building a healthy habit";
    if (journalStreak < 14) return "You're doing amazing!";
    if (journalStreak < 30) return "Incredible consistency!";
    return "You're a wellness champion!";
  };

  const getWeeklyProgressMessage = () => {
    const remaining = Math.max(weeklyGoal - moodEntries, 0);
    if (remaining === 0) return "Weekly goal achieved! 🎉";
    if (remaining === 1) return "Just 1 more entry to reach your goal";
    return `${remaining} more entries to reach your weekly goal`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-100 max-w-sm">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-organic-lg shadow-therapeutic p-4 transition-all duration-500 transform">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-medium text-foreground text-sm">
            Your Progress
          </h3>
          <div className={`px-2 py-1 rounded-full text-xs font-caption ${streakLevel.bgColor} ${streakLevel.color}`}>
            {streakLevel.level}
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Flame" size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-heading font-semibold text-foreground">
                {journalStreak}
              </span>
              <span className="text-sm text-muted-foreground">day streak</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {getMotivationalMessage()}
            </p>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-caption text-muted-foreground">
              Weekly Goal
            </span>
            <span className="text-xs font-mono text-foreground">
              {moodEntries}/{weeklyGoal}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out ${
                animateProgress ? 'transform translate-x-0' : 'transform -translate-x-full'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <p className="text-xs text-muted-foreground">
            {getWeeklyProgressMessage()}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="BookOpen" size={14} className="text-primary" />
              <span className="text-xs font-caption text-muted-foreground">Entries</span>
            </div>
            <span className="text-sm font-heading font-medium text-foreground">
              {moodEntries}
            </span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="TrendingUp" size={14} className="text-success" />
              <span className="text-xs font-caption text-muted-foreground">Level</span>
            </div>
            <span className="text-sm font-heading font-medium text-foreground">
              {streakLevel.level}
            </span>
          </div>
        </div>

        {/* Encouragement for specific pages */}
        {location.pathname === '/daily-journaling-interface' && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Sparkles" size={16} className="text-accent" />
              <p className="text-xs text-muted-foreground">
                Take your time and write from the heart
              </p>
            </div>
          </div>
        )}

        {location.pathname === '/mood-history-analytics' && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-2">
              <Icon name="BarChart3" size={16} className="text-primary" />
              <p className="text-xs text-muted-foreground">
                Patterns reveal your growth journey
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressIndicator;