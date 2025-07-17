import React from 'react';
import Icon from '../../../components/AppIcon';

const WeeklyProgressCard = () => {
  // Mock data for weekly progress
  const weekRange = 'Jul 9 - Jul 15';
  const checkIns = 5;
  const totalCheckIns = 7;
  const currentStreak = 3;
  const moodTrend = 12; // percentage increase
  const weeklyGoalProgress = 71; // percentage
  
  // Mood trend type (Calming, Upward, Volatile)
  const moodTrendType = 'Upward';
  
  // Get trend icon and color based on trend type
  const getTrendInfo = (trendType) => {
    switch (trendType) {
      case 'Upward':
        return { icon: 'TrendingUp', color: 'text-success' };
      case 'Calming':
        return { icon: 'Smile', color: 'text-primary' };
      case 'Volatile':
        return { icon: 'Activity', color: 'text-warning' };
      case 'Downward':
        return { icon: 'TrendingDown', color: 'text-error' };
      default:
        return { icon: 'Minus', color: 'text-muted-foreground' };
    }
  };
  
  const trendInfo = getTrendInfo(moodTrendType);

  return (
    <div className="bg-white rounded-organic p-6 shadow-therapeutic">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">This Week's Progress</h2>
        <div className="text-sm text-muted-foreground flex items-center">
          <Icon name="Calendar" size={14} className="mr-1" />
          <span>{weekRange}</span>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Check-ins */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center mb-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
          </div>
          <div className="text-lg font-medium">{checkIns}/{totalCheckIns}</div>
          <div className="text-xs text-muted-foreground">Check-ins</div>
        </div>

        {/* Current Streak */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center mb-2">
            <Icon name="Flame" size={20} className="text-warning" />
          </div>
          <div className="text-lg font-medium">{currentStreak} days</div>
          <div className="text-xs text-muted-foreground">Current Streak</div>
        </div>

        {/* Mood Trend */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center mb-2">
            <Icon name={trendInfo.icon} size={20} className={trendInfo.color} />
          </div>
          <div className="text-lg font-medium">{moodTrendType}</div>
          <div className="text-xs text-muted-foreground">Mood Trend</div>
        </div>
      </div>

      {/* Weekly Goal Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-muted-foreground">Weekly Goal Progress</div>
          <div className="text-sm font-medium">{weeklyGoalProgress}%</div>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${weeklyGoalProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Daily Mood Markers */}
      <div className="mt-6">
        <div className="text-sm text-muted-foreground mb-3">Daily Mood</div>
        <div className="flex justify-between">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            // Generate mock mood data
            const moods = ['😊', '🙂', '😐', '😔', '😣'];
            const moodColors = [
              'bg-success text-white',
              'bg-primary text-white',
              'bg-muted-foreground/30 text-foreground',
              'bg-warning/70 text-white',
              'bg-error/70 text-white'
            ];
            
            // Randomly select mood for demo, but ensure some consistency
            const moodIndex = index < 5 ? (index % 5) : -1;
            
            return (
              <div key={day} className="flex flex-col items-center">
                <div className="text-xs text-muted-foreground mb-1">{day}</div>
                {moodIndex >= 0 ? (
                  <div className={`w-8 h-8 ${moodColors[moodIndex]} rounded-full flex items-center justify-center text-sm`}>
                    {moods[moodIndex]}
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-muted/30 rounded-full flex items-center justify-center text-sm text-muted-foreground">
                    -
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Encouragement Message */}
      <div className="mt-6 flex items-start">
        <div className="text-success mr-2">
          <Icon name="Award" size={16} />
        </div>
        <p className="text-sm text-muted-foreground">
          You checked in {checkIns} times this week. Keep going!
        </p>
      </div>
    </div>
  );
};

export default WeeklyProgressCard;