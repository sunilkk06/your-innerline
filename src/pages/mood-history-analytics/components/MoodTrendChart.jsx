import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MoodTrendChart = ({ moodData, timeRange, chartType, onChartTypeChange }) => {
  const [animateChart, setAnimateChart] = useState(false);

  useEffect(() => {
    setAnimateChart(false);
    const timer = setTimeout(() => setAnimateChart(true), 300);
    return () => clearTimeout(timer);
  }, [moodData, timeRange, chartType]);

  const moodColors = {
    happy: '#81C784',
    grateful: '#A8C4AA',
    neutral: '#E8B4A0',
    anxious: '#FFB74D',
    sad: '#E57373'
  };

  const formatTooltipContent = (value, name, props) => {
    const moodLabels = {
      happy: 'Happy',
      grateful: 'Grateful',
      neutral: 'Neutral',
      anxious: 'Anxious',
      sad: 'Sad'
    };
    
    return [
      `${value} entries`,
      moodLabels[name] || name
    ];
  };

  const formatXAxisLabel = (tickItem) => {
    if (timeRange === 'week') {
      return new Date(tickItem).toLocaleDateString('en-US', { weekday: 'short' });
    } else if (timeRange === 'month') {
      return new Date(tickItem).toLocaleDateString('en-US', { day: 'numeric' });
    } else {
      return new Date(tickItem).toLocaleDateString('en-US', { month: 'short' });
    }
  };

  const chartTypeOptions = [
    { type: 'line', label: 'Trend Line', icon: 'TrendingUp' },
    { type: 'bar', label: 'Bar Chart', icon: 'BarChart3' }
  ];

  if (!moodData || moodData.length === 0) {
    return (
      <div className="bg-card rounded-organic-lg border border-border p-8 text-center">
        <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="font-heading font-medium text-foreground mb-2">No mood data available</h3>
        <p className="text-sm text-muted-foreground">
          Start journaling to see your mood trends and patterns
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-organic-lg border border-border p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="font-heading font-semibold text-foreground mb-1">
            Mood Trends
          </h3>
          <p className="text-sm text-muted-foreground">
            Your emotional patterns over {timeRange}
          </p>
        </div>
        
        {/* Chart Type Toggle */}
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          {chartTypeOptions.map((option) => (
            <Button
              key={option.type}
              variant={chartType === option.type ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onChartTypeChange(option.type)}
              iconName={option.icon}
              iconPosition="left"
              className="text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full h-80 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={moodData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(123, 154, 126, 0.1)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxisLabel}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
                formatter={formatTooltipContent}
              />
              {Object.keys(moodColors).map((mood) => (
                <Line
                  key={mood}
                  type="monotone"
                  dataKey={mood}
                  stroke={moodColors[mood]}
                  strokeWidth={2}
                  dot={{ fill: moodColors[mood], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: moodColors[mood], strokeWidth: 2 }}
                  animationDuration={animateChart ? 1000 : 0}
                />
              ))}
            </LineChart>
          ) : (
            <BarChart data={moodData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(123, 154, 126, 0.1)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxisLabel}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
                formatter={formatTooltipContent}
              />
              {Object.keys(moodColors).map((mood) => (
                <Bar
                  key={mood}
                  dataKey={mood}
                  stackId="mood"
                  fill={moodColors[mood]}
                  animationDuration={animateChart ? 800 : 0}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.entries(moodColors).map(([mood, color]) => (
          <div key={mood} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs font-caption text-muted-foreground capitalize">
              {mood}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodTrendChart;