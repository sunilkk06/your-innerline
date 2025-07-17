import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EntryDetailModal = ({ entry, isOpen, onClose, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setShowDeleteConfirm(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !entry) return null;

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

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getSentimentLabel = (score) => {
    if (score > 0.3) return { label: 'Positive', color: 'text-success', bgColor: 'bg-success/10' };
    if (score < -0.3) return { label: 'Negative', color: 'text-destructive', bgColor: 'bg-destructive/10' };
    return { label: 'Neutral', color: 'text-accent', bgColor: 'bg-accent/10' };
  };

  const handleDelete = () => {
    onDelete(entry.id);
    onClose();
  };

  const handleEdit = () => {
    onEdit(entry);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-9999 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-organic-lg shadow-therapeutic-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 ${mood.bgColor} rounded-organic flex items-center justify-center`}>
              <Icon name={mood.icon} size={24} className={mood.color} />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Journal Entry
              </h2>
              <p className="text-sm text-muted-foreground">
                {formatDateTime(entry.timestamp)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              iconName="Edit"
              className="text-muted-foreground hover:text-foreground"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDeleteConfirm(true)}
              iconName="Trash2"
              className="text-muted-foreground hover:text-destructive"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6 space-y-6">
            {/* Mood & Sentiment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card rounded-organic border border-border p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Icon name="Heart" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Mood</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${mood.bgColor} ${mood.color}`}>
                    {mood.label}
                  </span>
                </div>
              </div>

              {entry.sentimentScore !== undefined && (
                <div className="bg-card rounded-organic border border-border p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="BarChart3" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">Sentiment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentLabel(entry.sentimentScore).bgColor} ${getSentimentLabel(entry.sentimentScore).color}`}>
                      {getSentimentLabel(entry.sentimentScore).label}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      ({entry.sentimentScore.toFixed(2)})
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Entry Content */}
            <div className="bg-card rounded-organic border border-border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="FileText" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Journal Entry</span>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {entry.content}
                </p>
              </div>
            </div>

            {/* Tags */}
            {entry.tags && entry.tags.length > 0 && (
              <div className="bg-card rounded-organic border border-border p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Tag" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full font-caption"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* AI Insights */}
            {entry.aiInsights && (
              <div className="bg-card rounded-organic border border-border p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="Sparkles" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">AI Insights</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {entry.aiInsights}
                </p>
              </div>
            )}

            {/* Therapeutic Suggestions */}
            {entry.therapeuticSuggestions && entry.therapeuticSuggestions.length > 0 && (
              <div className="bg-card rounded-organic border border-border p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="Lightbulb" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-foreground">Therapeutic Suggestions</span>
                </div>
                <div className="space-y-3">
                  {entry.therapeuticSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-organic">
                      <Icon name="ArrowRight" size={16} className="text-primary mt-0.5" />
                      <p className="text-sm text-foreground">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Entry Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-organic border border-border p-4 text-center">
                <Icon name="FileText" size={20} className="text-muted-foreground mx-auto mb-2" />
                <div className="text-lg font-heading font-semibold text-foreground">
                  {entry.wordCount || 0}
                </div>
                <div className="text-xs text-muted-foreground">Words</div>
              </div>
              
              <div className="bg-card rounded-organic border border-border p-4 text-center">
                <Icon name="Clock" size={20} className="text-muted-foreground mx-auto mb-2" />
                <div className="text-lg font-heading font-semibold text-foreground">
                  {entry.writingDuration || 0}m
                </div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
              
              <div className="bg-card rounded-organic border border-border p-4 text-center">
                <Icon name="Calendar" size={20} className="text-muted-foreground mx-auto mb-2" />
                <div className="text-lg font-heading font-semibold text-foreground">
                  {new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="text-xs text-muted-foreground">Date</div>
              </div>
              
              <div className="bg-card rounded-organic border border-border p-4 text-center">
                <Icon name="Clock" size={20} className="text-muted-foreground mx-auto mb-2" />
                <div className="text-lg font-heading font-semibold text-foreground">
                  {new Date(entry.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                </div>
                <div className="text-xs text-muted-foreground">Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-background rounded-organic-lg shadow-therapeutic-lg p-6 max-w-md w-full">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="AlertTriangle" size={24} className="text-destructive" />
                <h3 className="font-heading font-semibold text-foreground">
                  Delete Entry
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to delete this journal entry? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex-1"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryDetailModal;