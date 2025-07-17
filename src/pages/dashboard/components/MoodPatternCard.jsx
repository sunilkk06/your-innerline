import React from 'react';
import Icon from '../../../components/AppIcon';
import { Link } from 'react-router-dom';

const MoodPatternCard = () => {
  // Mock data for mood patterns
  const moodData = [
    { date: 'Jul 15', mood: 80, label: '80%' },
    { date: 'Jul 14', mood: 90, label: '90%' },
    { date: 'Jul 13', mood: 60, label: '60%' },
    { date: 'Jul 12', mood: 75, label: '75%' },
    { date: 'Jul 11', mood: 40, label: '40%' }
  ];

  // Calculate average mood
  const avgMood = Math.round(
    moodData.reduce((sum, day) => sum + day.mood, 0) / moodData.length
  );

  return (
    <div className="bg-white rounded-organic p-6 shadow-therapeutic">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Recent Mood Pattern</h2>
        <div className="text-sm text-success flex items-center">
          <Icon name="TrendingUp" size={16} className="mr-1" />
          <span>{avgMood}% avg</span>
        </div>
      </div>

      {/* Mood Chart */}
      <div className="space-y-3 mb-4">
        {moodData.map((day) => (
          <div key={day.date} className="flex items-center">
            <div className="w-12 text-xs text-muted-foreground">{day.date}</div>
            <div className="flex-1 mx-2">
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    day.mood >= 80
                      ? 'bg-success'
                      : day.mood >= 60
                      ? 'bg-primary'
                      : day.mood >= 50
                      ? 'bg-warning'
                      : 'bg-error'
                  }`}
                  style={{ width: `${day.mood}%` }}
                ></div>
              </div>
            </div>
            <div className="w-8 text-xs text-muted-foreground text-right">{day.label}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="text-muted-foreground">
          <Icon name="Calendar" size={14} className="inline mr-1" />
          Last 7 days
        </div>
        <Link
          to="/mood-history-analytics"
          className="text-primary hover:text-primary/80 flex items-center transition-therapeutic"
        >
          <span>View detailed analytics</span>
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default MoodPatternCard;