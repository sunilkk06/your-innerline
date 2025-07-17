import React from 'react';
import Icon from '../../../components/AppIcon';

const SentimentAnalysis = ({ sentiment, confidence, isAnalyzing }) => {
  const sentimentConfig = {
    happy: {
      label: 'Happy',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      icon: 'Smile',
      description: 'Your words reflect joy and positivity'
    },
    grateful: {
      label: 'Grateful',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
      icon: 'Heart',
      description: 'A sense of appreciation comes through'
    },
    neutral: {
      label: 'Neutral',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      borderColor: 'border-border',
      icon: 'Minus',
      description: 'Balanced and steady emotional tone'
    },
    anxious: {
      label: 'Anxious',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      icon: 'AlertCircle',
      description: 'Some worry or concern is present'
    },
    sad: {
      label: 'Sad',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/20',
      icon: 'CloudRain',
      description: 'Feelings of sadness are coming through'
    }
  };

  const currentSentiment = sentimentConfig[sentiment] || sentimentConfig.neutral;

  if (isAnalyzing) {
    return (
      <div className="bg-card rounded-organic border border-border p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div>
            <h3 className="font-medium text-foreground">Analyzing your entry...</h3>
            <p className="text-sm text-muted-foreground">Understanding the emotional tone</p>
          </div>
        </div>
      </div>
    );
  }

  if (!sentiment) return null;

  return (
    <div className={`bg-card rounded-organic border ${currentSentiment.borderColor} p-4 mb-6 transition-therapeutic`}>
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 ${currentSentiment.bgColor} rounded-full flex items-center justify-center`}>
          <Icon name={currentSentiment.icon} size={20} className={currentSentiment.color} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-medium text-foreground">
              Emotional Tone: {currentSentiment.label}
            </h3>
            {confidence && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {Math.round(confidence * 100)}% confidence
              </span>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            {currentSentiment.description}
          </p>
          
          {/* Confidence Bar */}
          {confidence && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Analysis Confidence</span>
                <span className="text-xs font-mono text-foreground">{Math.round(confidence * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    confidence > 0.7 ? 'bg-success' : 
                    confidence > 0.4 ? 'bg-warning' : 'bg-muted-foreground'
                  }`}
                  style={{ width: `${confidence * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;