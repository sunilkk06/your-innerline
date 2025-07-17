import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const MoodFilterPanel = ({ 
  filters, 
  onFiltersChange, 
  isExpanded, 
  onToggleExpanded,
  isMobile 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const timeRangeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' }
  ];

  const moodOptions = [
    { value: 'all', label: 'All Moods' },
    { value: 'happy', label: 'Happy' },
    { value: 'grateful', label: 'Grateful' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'anxious', label: 'Anxious' },
    { value: 'sad', label: 'Sad' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'mood', label: 'By Mood' },
    { value: 'sentiment', label: 'By Sentiment' }
  ];

  const moodChips = [
    { value: 'happy', label: 'Happy', icon: 'Smile', color: 'text-success bg-success/10' },
    { value: 'grateful', label: 'Grateful', icon: 'Heart', color: 'text-primary bg-primary/10' },
    { value: 'neutral', label: 'Neutral', icon: 'Minus', color: 'text-accent bg-accent/10' },
    { value: 'anxious', label: 'Anxious', icon: 'Zap', color: 'text-warning bg-warning/10' },
    { value: 'sad', label: 'Sad', icon: 'Frown', color: 'text-destructive bg-destructive/10' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleMoodChipToggle = (moodValue) => {
    const currentMoods = localFilters.moods || [];
    const newMoods = currentMoods.includes(moodValue)
      ? currentMoods.filter(m => m !== moodValue)
      : [...currentMoods, moodValue];
    
    handleFilterChange('moods', newMoods);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      timeRange: 'month',
      moods: [],
      sortBy: 'newest',
      searchQuery: ''
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = () => {
    return localFilters.timeRange !== 'month' || 
           (localFilters.moods && localFilters.moods.length > 0) ||
           localFilters.searchQuery ||
           localFilters.sortBy !== 'newest';
  };

  // Mobile horizontal scrolling chips
  if (isMobile && !isExpanded) {
    return (
      <div className="bg-background border-b border-border p-4">
        {/* Quick Filters Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-medium text-foreground text-sm">
            Quick Filters
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpanded}
            iconName="SlidersHorizontal"
            iconPosition="left"
            className="text-xs"
          >
            More
          </Button>
        </div>

        {/* Horizontal Scrolling Mood Chips */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {/* Time Range Chip */}
          <div className="flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleExpanded}
              iconName="Calendar"
              iconPosition="left"
              className="text-xs whitespace-nowrap"
            >
              {timeRangeOptions.find(opt => opt.value === localFilters.timeRange)?.label}
            </Button>
          </div>

          {/* Mood Chips */}
          {moodChips.map((chip) => {
            const isActive = localFilters.moods?.includes(chip.value);
            return (
              <div key={chip.value} className="flex-shrink-0">
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleMoodChipToggle(chip.value)}
                  iconName={chip.icon}
                  iconPosition="left"
                  className={`text-xs whitespace-nowrap ${isActive ? chip.color : ''}`}
                >
                  {chip.label}
                </Button>
              </div>
            );
          })}

          {/* Clear Filters */}
          {hasActiveFilters() && (
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                iconName="X"
                iconPosition="left"
                className="text-xs text-destructive whitespace-nowrap"
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop/Expanded Filter Panel
  return (
    <div className={`bg-card border border-border rounded-organic-lg p-6 ${isMobile ? 'mb-4' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="SlidersHorizontal" size={20} className="text-primary" />
          <h3 className="font-heading font-medium text-foreground">
            Filter & Sort
          </h3>
        </div>
        
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleExpanded}
            iconName="X"
          />
        )}
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Time Range */}
        <Select
          label="Time Range"
          options={timeRangeOptions}
          value={localFilters.timeRange}
          onChange={(value) => handleFilterChange('timeRange', value)}
        />

        {/* Sort By */}
        <Select
          label="Sort By"
          options={sortOptions}
          value={localFilters.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
        />

        {/* Search */}
        <div className="md:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Search Entries
          </label>
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search journal content..."
              value={localFilters.searchQuery || ''}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-organic text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Mood Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Filter by Mood
        </label>
        <div className="flex flex-wrap gap-2">
          {moodChips.map((chip) => {
            const isActive = localFilters.moods?.includes(chip.value);
            return (
              <Button
                key={chip.value}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleMoodChipToggle(chip.value)}
                iconName={chip.icon}
                iconPosition="left"
                className={`${isActive ? chip.color : ''}`}
              >
                {chip.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          {hasActiveFilters() ? 'Filters applied' : 'No filters applied'}
        </div>
        
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            iconName="RotateCcw"
            iconPosition="left"
            className="text-destructive"
          >
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default MoodFilterPanel;