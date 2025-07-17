import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JournalPrompt = () => {
  const navigate = useNavigate();
  const [journalEntry, setJournalEntry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentiment, setSentiment] = useState(null);
  const [response, setResponse] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [suggestedActivity, setSuggestedActivity] = useState(null);
  const [showActivityDetails, setShowActivityDetails] = useState(false);

  const moods = [
    { name: 'Great', emoji: '😊', value: 'great' },
    { name: 'Good', emoji: '🙂', value: 'good' },
    { name: 'Okay', emoji: '😐', value: 'okay' },
    { name: 'Low', emoji: '😔', value: 'low' },
    { name: 'Struggling', emoji: '😣', value: 'struggling' }
  ];

  // Activity suggestions based on sentiment
  const activities = {
    anxious: {
      title: '1-minute breathing reset',
      description: 'Take a moment to focus on your breath. Breathe in for 4 counts, hold for 2, and exhale for 6. Repeat for one minute.',
      icon: 'Wind'
    },
    negative: {
      title: 'Reframing thought pattern exercise',
      description: 'Identify a negative thought, challenge it with evidence, and try to reframe it in a more balanced way.',
      icon: 'RefreshCw'
    },
    positive: {
      title: 'Gratitude Practice',
      description: 'Take a moment to write down three things you\'re grateful for today, no matter how small.',
      icon: 'Heart'
    },
    neutral: {
      title: 'Guided visualization',
      description: 'Close your eyes and imagine yourself in a peaceful forest or by the ocean. Notice the details and let yourself relax.',
      icon: 'Sparkles'
    },
    reflective: {
      title: 'Journal prompt',
      description: 'What would you say to a friend in your situation?',
      icon: 'PenTool'
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleJournalChange = (e) => {
    setJournalEntry(e.target.value);
  };

  const handleSubmit = async () => {
    if (!journalEntry.trim() && !selectedMood) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call for sentiment analysis
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Determine sentiment based on entry content
      // This would normally be done by an AI service
      let detectedSentiment;
      let activityType;
      const text = journalEntry.toLowerCase();
      
      if (text.includes('anxious') || text.includes('worried') || text.includes('stress') || 
          text.includes('afraid') || selectedMood === 'struggling') {
        detectedSentiment = 'anxious';
        activityType = 'anxious';
        setResponse("That sounds like a tough day. Would you like to try a short breathing reset?");
      } else if (text.includes('sad') || text.includes('depressed') || text.includes('unhappy') || 
                text.includes('miserable') || selectedMood === 'low') {
        detectedSentiment = 'negative';
        activityType = 'negative';
        setResponse("I notice you're feeling down. Would a thought reframing exercise help?");
      } else if (text.includes('happy') || text.includes('great') || text.includes('wonderful') || 
                text.includes('joy') || selectedMood === 'great') {
        detectedSentiment = 'positive';
        activityType = 'positive';
        setResponse("That's great! What's one thing you're grateful for today?");
      } else if (text.includes('think') || text.includes('wonder') || text.includes('question') || 
                text.includes('consider')) {
        detectedSentiment = 'reflective';
        activityType = 'reflective';
        setResponse("You seem to be in a reflective mood. Would you like to explore that further?");
      } else {
        detectedSentiment = 'neutral';
        activityType = 'neutral';
        setResponse("Thanks for checking in. Would you like a visualization exercise?");
      }
      
      setSentiment(detectedSentiment);
      setSuggestedActivity(activities[activityType]);
      
      // Save journal entry to database
      // This would normally be an API call
      console.log('Journal entry saved:', {
        text: journalEntry,
        mood: selectedMood,
        sentiment: detectedSentiment,
        timestamp: new Date()
      });
      
    } catch (error) {
      console.error('Error submitting journal entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartNewEntry = () => {
    setJournalEntry('');
    setSelectedMood(null);
    setSentiment(null);
    setResponse('');
    setSuggestedActivity(null);
    setShowActivityDetails(false);
  };

  const handleFullJournal = () => {
    navigate('/daily-journaling-interface');
  };

  const toggleActivityDetails = () => {
    setShowActivityDetails(!showActivityDetails);
  };

  return (
    <div className="bg-white rounded-organic p-6 shadow-therapeutic">
      <div className="flex items-center justify-center mb-4">
        <Icon name="Heart" size={20} className="text-primary mr-2" />
        <h2 className="text-xl font-medium text-center">How are you feeling today?</h2>
      </div>
      
      <p className="text-muted-foreground text-sm text-center mb-6">
        Take a moment to check in with yourself
      </p>
      
      {!sentiment ? (
        <>
          {/* Mood Selection */}
          <div className="flex justify-between mb-6">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                className={`flex flex-col items-center p-2 rounded-full transition-therapeutic ${
                  selectedMood === mood.value ? 'bg-primary/10' : 'hover:bg-muted'
                }`}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-xs text-muted-foreground">{mood.name}</span>
              </button>
            ))}
          </div>
          
          {/* Journal Entry */}
          <textarea
            value={journalEntry}
            onChange={handleJournalChange}
            placeholder="Write about how you're feeling..."
            className="w-full h-32 p-3 border border-border rounded-organic focus:ring-primary focus:border-primary bg-background resize-none mb-4"
          ></textarea>
          
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || (!journalEntry.trim() && !selectedMood)}
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
              className="px-6"
            >
              Submit Journal
            </Button>
          </div>
        </>
      ) : (
        <div className="bg-muted/30 rounded-organic p-4 mb-4">
          <div className="flex items-start mb-4">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Icon 
                name={sentiment === 'anxious' ? 'Heart' : sentiment === 'positive' ? 'Sun' : 'Smile'} 
                size={20} 
                className="text-primary" 
              />
            </div>
            <div>
              <p className="text-foreground">{response}</p>
            </div>
          </div>
          
          {/* Suggested Activity */}
          {suggestedActivity && (
            <div className="mt-4 border-t border-border pt-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={toggleActivityDetails}
              >
                <div className="flex items-center">
                  <div className="bg-secondary/10 p-2 rounded-full mr-3">
                    <Icon name={suggestedActivity.icon} size={16} className="text-secondary" />
                  </div>
                  <span className="font-medium">{suggestedActivity.title}</span>
                </div>
                <Icon 
                  name={showActivityDetails ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </div>
              
              {showActivityDetails && (
                <div className="mt-3 pl-10 pr-2 text-sm text-muted-foreground">
                  <p>{suggestedActivity.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => {
                      // In a real app, this would start the activity
                      console.log(`Starting activity: ${suggestedActivity.title}`);
                    }}
                  >
                    Start Activity
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleStartNewEntry}
            >
              New Entry
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={handleFullJournal}
            >
              Open Full Journal
            </Button>
          </div>
        </div>
      )}
      
      {!sentiment && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleFullJournal}
            className="flex items-center text-primary hover:text-primary/80 transition-therapeutic text-sm"
          >
            <Icon name="BookOpen" size={16} className="mr-1" />
            Start Journaling
          </button>
        </div>
      )}
    </div>
  );
};

export default JournalPrompt;