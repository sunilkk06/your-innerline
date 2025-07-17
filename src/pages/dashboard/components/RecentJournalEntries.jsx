import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RecentJournalEntries = () => {
  // Mock data for recent journal entries
  const entries = [
    {
      id: 1,
      date: 'Jul 15',
      time: '09:30 AM',
      sentiment: 'positive',
      preview: "Today I'm feeling more optimistic about the challenges ahead. The morning meditation really helped me focus...",
      wordCount: 0
    },
    {
      id: 2,
      date: 'Jul 14',
      time: '07:45 PM',
      sentiment: 'very positive',
      preview: "What a wonderful day! I accomplished so much at work and had a lovely dinner with friends. I'm grateful for...",
      wordCount: 189
    },
    {
      id: 3,
      date: 'Jul 13',
      time: '11:15 AM',
      sentiment: 'neutral',
      preview: "Feeling a bit neutral today. Not particularly up or down, just existing in the middle space...",
      wordCount: 156
    }
  ];

  // Function to get sentiment icon
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'very positive':
        return { name: 'Smile', color: 'text-success' };
      case 'positive':
        return { name: 'Smile', color: 'text-primary' };
      case 'neutral':
        return { name: 'Meh', color: 'text-muted-foreground' };
      case 'negative':
        return { name: 'Frown', color: 'text-warning' };
      case 'very negative':
        return { name: 'Frown', color: 'text-error' };
      default:
        return { name: 'Meh', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="bg-white rounded-organic p-6 shadow-therapeutic">
      <h2 className="text-lg font-medium mb-6">Recent Journal Entries</h2>

      <div className="space-y-6">
        {entries.map((entry) => {
          const sentimentIcon = getSentimentIcon(entry.sentiment);
          
          return (
            <div key={entry.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex items-center mb-2">
                <div className={`mr-2 ${sentimentIcon.color}`}>
                  <Icon name={sentimentIcon.name} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{entry.date}</span>
                    <span className="text-xs text-muted-foreground">{entry.time}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <Icon name="Tag" size={12} className="inline mr-1" />
                    {entry.sentiment}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {entry.preview}
              </p>
              
              {entry.wordCount > 0 && (
                <div className="text-xs text-muted-foreground flex items-center">
                  <Icon name="AlignLeft" size={12} className="mr-1" />
                  {entry.wordCount} words
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <Link
          to="/daily-journaling-interface"
          className="text-primary hover:text-primary/80 text-sm flex items-center justify-center transition-therapeutic"
        >
          <span>View all entries</span>
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default RecentJournalEntries;