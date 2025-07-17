import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressSummary = () => {
  // Mock data for progress summary
  const dayStreak = 3;
  const weeklyGoal = 5;
  const entriesMade = 3;
  const entriesRemaining = weeklyGoal - entriesMade;
  const level = 'Starting';
  const totalEntries = 5;

  return (
    <div className="bg-white rounded-organic p-6 shadow-therapeutic">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Your Progress</h2>
        <div className="text-xs text-muted-foreground">Building</div>
      </div>

      {/* Day Streak */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{dayStreak}</div>
            <div className="text-xs text-muted-foreground">day streak</div>
          </div>
        </div>
        <div className="ml-4 text-sm text-muted-foreground">
          Building a healthy habit
        </div>
      </div>

      {/* Weekly Goal */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm">Weekly Goal</div>
          <div className="text-sm font-medium">{entriesMade}/{weeklyGoal}</div>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${(entriesMade / weeklyGoal) * 100}%` }}
          ></div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          {entriesRemaining} more entries to reach your weekly goal
        </div>
      </div>

      {/* Level */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Icon name="BarChart" size={16} className="text-primary mr-2" />
          <span className="text-sm">Level</span>
        </div>
        <div className="text-sm font-medium">{level}</div>
      </div>

      {/* Total Entries */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <Icon name="BookOpen" size={16} className="text-primary mr-2" />
          <span className="text-sm">Entries</span>
        </div>
        <div className="text-sm font-medium">{totalEntries}</div>
      </div>
    </div>
  );
};

export default ProgressSummary;