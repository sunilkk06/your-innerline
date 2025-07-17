import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MoodTimelineEntry = ({ entry, onViewEntry }) => {
  const moodConfig = {
    happy: {
      color: 'text-success',
      bgColor: 'bg-success/10',
      icon: 'Smile',
      label: 'Happy'
    },
    grateful: {
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      icon: 'Heart',
      label: 'Grateful'
    },
    neutral: {
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      icon: 'Minus',
      label: 'Neutral'
    },
    anxious: {
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      icon: 'Zap',
      label: 'Anxious'
    },
    sad: {
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      icon: 'Frown',
      label: 'Sad'
    }
  };

  const mood = moodConfig[entry.mood] || moodConfig.neutral;
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-card rounded-organic border border-border p-4 hover:shadow-therapeutic-sm transition-therapeutic">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${mood.bgColor} rounded-full flex items-center justify-center`}>
            <Icon name={mood.icon} size={20} className={mood.color} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${mood.color}`}>
                {mood.label}
              </span>
              <span className="text-xs text-muted-foreground">
                •
              </span>
              <span className="text-xs text-muted-foreground">
                {formatTime(entry.timestamp)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDate(entry.timestamp)}
            </p>
          </div>
        </div>
        
        {/* Sentiment Score */}
        {entry.sentimentScore && (
          <div className="text-right">
            <div className="text-xs font-caption text-muted-foreground mb-1">
              Sentiment
            </div>
            <div className={`text-sm font-medium ${
              entry.sentimentScore > 0.3 ? 'text-success' :
              entry.sentimentScore < -0.3 ? 'text-destructive': 'text-accent'
            }`}>
              {entry.sentimentScore > 0.3 ? 'Positive' :
               entry.sentimentScore < -0.3 ? 'Negative': 'Neutral'}
            </div>
          </div>
        )}
      </div>

      {/* Content Preview */}
      {entry.content && (
        <div className="mb-4">
          <p className="text-sm text-foreground leading-relaxed">
            {truncateContent(entry.content)}
          </p>
        </div>
      )}

      {/* Tags */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {entry.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-caption"
            >
              {tag}
            </span>
          ))}
          {entry.tags.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-caption">
              +{entry.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Word Count */}
          <div className="flex items-center space-x-1">
            <Icon name="FileText" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-mono">
              {entry.wordCount || 0} words
            </span>
          </div>
          
          {/* Duration */}
          {entry.writingDuration && (
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-mono">
                {entry.writingDuration}m
              </span>
            </div>
          )}
        </div>

        {/* View Entry Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewEntry(entry)}
          iconName="ExternalLink"
          iconPosition="right"
          className="text-xs"
        >
          View Entry
        </Button>
      </div>

      {/* AI Insights Preview */}
      {entry.aiInsights && (
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-start space-x-2">
            <Icon name="Sparkles" size={16} className="text-accent mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-caption text-muted-foreground mb-1">
                AI Insight
              </p>
              <p className="text-xs text-foreground">
                {truncateContent(entry.aiInsights, 80)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTimelineEntry;