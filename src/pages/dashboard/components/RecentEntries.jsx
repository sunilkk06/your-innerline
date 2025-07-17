import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentEntries = () => {
  const navigate = useNavigate();

  const recentEntries = [
    {
      id: 1,
      date: '2025-07-15',
      time: '09:30 AM',
      mood: 'good',
      moodColor: 'text-primary',
      moodEmoji: '🙂',
      preview: `Today I'm feeling more optimistic about the challenges ahead. The morning meditation really helped center my thoughts and I'm grateful for...`,
      sentiment: 'positive',
      wordCount: 247
    },
    {
      id: 2,
      date: '2025-07-14',
      time: '07:45 PM',
      mood: 'great',
      moodColor: 'text-success',
      moodEmoji: '😊',
      preview: `What a wonderful day! I accomplished so much at work and had a lovely dinner with friends. Feeling really connected and supported...`,
      sentiment: 'very positive',
      wordCount: 189
    },
    {
      id: 3,
      date: '2025-07-13',
      time: '11:15 AM',
      mood: 'okay',
      moodColor: 'text-warning',
      moodEmoji: '😐',
      preview: `Feeling a bit neutral today. Not particularly up or down, just existing in the middle space. Sometimes these days are necessary for...`,
      sentiment: 'neutral',
      wordCount: 156
    }
  ];

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'very positive': return 'Smile';
      case 'positive': return 'ThumbsUp';
      case 'neutral': return 'Minus';
      case 'negative': return 'ThumbsDown';
      default: return 'Circle';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'very positive': return 'text-success';
      case 'positive': return 'text-primary';
      case 'neutral': return 'text-muted-foreground';
      case 'negative': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-card rounded-organic-lg p-6 shadow-therapeutic border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Recent Journal Entries
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/daily-journaling-interface')}
          iconName="ExternalLink"
          iconPosition="right"
        >
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {recentEntries.map((entry) => (
          <div
            key={entry.id}
            className="p-4 rounded-organic border border-border hover:shadow-therapeutic-sm transition-therapeutic cursor-pointer"
            onClick={() => navigate('/daily-journaling-interface')}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{entry.moodEmoji}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">
                      {formatDate(entry.date)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {entry.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Icon 
                      name={getSentimentIcon(entry.sentiment)} 
                      size={12} 
                      className={getSentimentColor(entry.sentiment)} 
                    />
                    <span className={`text-xs font-caption ${getSentimentColor(entry.sentiment)}`}>
                      {entry.sentiment}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Icon name="FileText" size={14} className="text-muted-foreground" />
                  <span className="text-xs font-mono text-muted-foreground">
                    {entry.wordCount} words
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {entry.preview}
            </p>
          </div>
        ))}
      </div>

      {recentEntries.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="BookOpen" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">
            No journal entries yet
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/daily-journaling-interface')}
            iconName="PenTool"
            iconPosition="left"
          >
            Write Your First Entry
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentEntries;