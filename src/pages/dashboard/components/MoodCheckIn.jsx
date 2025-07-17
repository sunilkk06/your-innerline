import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MoodCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const navigate = useNavigate();

  const moodOptions = [
    { id: 'great', emoji: '😊', label: 'Great', color: 'text-success' },
    { id: 'good', emoji: '🙂', label: 'Good', color: 'text-primary' },
    { id: 'okay', emoji: '😐', label: 'Okay', color: 'text-warning' },
    { id: 'low', emoji: '😔', label: 'Low', color: 'text-accent' },
    { id: 'struggling', emoji: '😢', label: 'Struggling', color: 'text-destructive' }
  ];

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
  };

  const handleStartJournaling = () => {
    navigate('/daily-journaling-interface');
  };

  return (
    <div className="bg-card rounded-organic-lg p-6 shadow-therapeutic border border-border">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Heart" size={32} className="text-primary" />
        </div>
        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
          How are you feeling today?
        </h2>
        <p className="text-sm text-muted-foreground">
          Take a moment to check in with yourself
        </p>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {moodOptions.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood.id)}
            className={`flex flex-col items-center p-3 rounded-organic transition-therapeutic hover:bg-muted ${
              selectedMood === mood.id ? 'bg-primary/10 ring-2 ring-primary/20' : ''
            }`}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span className={`text-xs font-caption ${mood.color}`}>
              {mood.label}
            </span>
          </button>
        ))}
      </div>

      <Button
        variant="primary"
        fullWidth
        onClick={handleStartJournaling}
        iconName="PenTool"
        iconPosition="left"
        className="animate-breathe"
      >
        Start Journaling
      </Button>
    </div>
  );
};

export default MoodCheckIn;