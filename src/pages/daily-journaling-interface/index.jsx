import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import DashboardNav from '../dashboard/components/DashboardNav';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const DailyJournalingInterface = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [journalEntry, setJournalEntry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentiment, setSentiment] = useState(null);
  const [response, setResponse] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(true);
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
      steps: [
        'Find a comfortable position and close your eyes',
        'Breathe in through your nose for 4 counts',
        'Hold your breath for 2 counts',
        'Exhale slowly through your mouth for 6 counts',
        'Repeat for one minute'
      ],
      icon: 'Wind'
    },
    negative: {
      title: 'Reframing thought pattern exercise',
      description: 'Identify a negative thought, challenge it with evidence, and try to reframe it in a more balanced way.',
      steps: [
        'Write down the negative thought',
        'Identify the emotion associated with it',
        'Look for evidence that contradicts this thought',
        'Create a more balanced perspective',
        'Practice self-compassion'
      ],
      icon: 'RefreshCw'
    },
    positive: {
      title: 'Gratitude Practice',
      description: 'Take a moment to write down three things you&apos;re grateful for today, no matter how small.',
      steps: [
        'Think about something in nature you appreciate',
        'Consider a person who has positively impacted your life',
        'Reflect on a skill or ability you&apos;re thankful for',
        'Write these down and notice how you feel'
      ],
      icon: 'Heart'
    },
    neutral: {
      title: 'Guided visualization',
      description: 'Close your eyes and imagine yourself in a peaceful forest or by the ocean. Notice the details and let yourself relax.',
      steps: [
        'Find a quiet place and sit comfortably',
        'Close your eyes and take a few deep breaths',
        'Imagine yourself in a peaceful natural setting',
        'Notice the sights, sounds, and sensations',
        'Spend 3-5 minutes in this visualization'
      ],
      icon: 'Sparkles'
    },
    reflective: {
      title: 'Journal prompt',
      description: 'What would you say to a friend in your situation?',
      steps: [
        'Imagine your friend is experiencing exactly what you are',
        'Write down the advice you would give them',
        'Notice if you&apos;re kinder to them than to yourself',
        'Consider how you might apply this advice to your own situation'
      ],
      icon: 'PenTool'
    }
  };

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate('/authentication-login-register');
      return;
    }
    
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [user, navigate]);

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
        setResponse("That sounds like a tough day. Would you like to try a short breathing reset? Taking a few minutes to focus on your breath can help reduce anxiety and bring you back to the present moment. Remember that it&apos;s okay to have difficult days, and you&apos;re taking a positive step by acknowledging your feelings.");
      } else if (text.includes('sad') || text.includes('depressed') || text.includes('unhappy') || 
                text.includes('miserable') || selectedMood === 'low') {
        detectedSentiment = 'negative';
        activityType = 'negative';
        setResponse("I notice you&apos;re feeling down. Would a thought reframing exercise help? Sometimes our thoughts can become distorted when we&apos;re feeling low. Taking a moment to examine them more objectively can help shift your perspective and ease difficult emotions.");
      } else if (text.includes('happy') || text.includes('great') || text.includes('wonderful') || 
                text.includes('joy') || selectedMood === 'great') {
        detectedSentiment = 'positive';
        activityType = 'positive';
        setResponse("That&apos;s great! What&apos;s one thing you&apos;re grateful for today? Taking time to acknowledge the positive aspects of your day can help reinforce those good feelings. Consider making a habit of noting three things you&apos;re grateful for each day - research shows this simple practice can significantly improve overall well-being.");
      } else if (text.includes('think') || text.includes('wonder') || text.includes('question') || 
                text.includes('consider')) {
        detectedSentiment = 'reflective';
        activityType = 'reflective';
        setResponse("You seem to be in a reflective mood. Would you like to explore that further? Sometimes asking yourself what advice you&apos;d give to a friend in your situation can provide valuable insights and a fresh perspective on your own circumstances.");
      } else {
        detectedSentiment = 'neutral';
        activityType = 'neutral';
        setResponse("Thanks for checking in. Would you like a visualization exercise? Sometimes when we&apos;re feeling neutral, taking a moment to mentally transport ourselves to a peaceful setting can help us connect with our emotions and find a sense of calm.");
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

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const toggleActivityDetails = () => {
    setShowActivityDetails(!showActivityDetails);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/30 mb-4"></div>
          <div className="text-muted-foreground">Loading journal...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Journal | Your Innerline</title>
        <meta name="description" content="Your daily journaling space" />
      </Helmet>

      {/* Dashboard Navigation */}
      <DashboardNav />

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackToDashboard}
            className="mr-4 p-2 rounded-full hover:bg-muted transition-therapeutic"
          >
            <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
          </button>
          <h1 className="text-2xl font-medium">Daily Journal</h1>
        </div>

        <div className="bg-white rounded-organic p-6 shadow-therapeutic mb-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">How are you feeling today?</h2>
              <div className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            {!sentiment ? (
              <>
                {/* Mood Selection */}
                <div className="flex justify-between mb-6">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => handleMoodSelect(mood.value)}
                      className={`flex flex-col items-center p-3 rounded-full transition-therapeutic ${
                        selectedMood === mood.value ? 'bg-primary/10' : 'hover:bg-muted'
                      }`}
                    >
                      <span className="text-3xl mb-2">{mood.emoji}</span>
                      <span className="text-sm text-muted-foreground">{mood.name}</span>
                    </button>
                  ))}
                </div>
                
                {/* Journal Entry */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Write your thoughts below
                  </label>
                  <textarea
                    value={journalEntry}
                    onChange={handleJournalChange}
                    placeholder="How was your day? What's on your mind? Feel free to express yourself..."
                    className="w-full h-64 p-4 border border-border rounded-organic focus:ring-primary focus:border-primary bg-background resize-none"
                  ></textarea>
                </div>
                
                {/* Journal Prompts */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Need inspiration? Try these prompts:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      className="text-xs bg-muted px-3 py-1 rounded-full hover:bg-muted/80 transition-therapeutic"
                      onClick={() => setJournalEntry(prev => prev + "Today I&apos;m grateful for...")}
                    >
                      Today I&apos;m grateful for...
                    </button>
                    <button 
                      className="text-xs bg-muted px-3 py-1 rounded-full hover:bg-muted/80 transition-therapeutic"
                      onClick={() => setJournalEntry(prev => prev + "Something that challenged me today was...")}
                    >
                      Something that challenged me today was...
                    </button>
                    <button 
                      className="text-xs bg-muted px-3 py-1 rounded-full hover:bg-muted/80 transition-therapeutic"
                      onClick={() => setJournalEntry(prev => prev + "Tomorrow, I&apos;m looking forward to...")}
                    >
                      Tomorrow, I&apos;m looking forward to...
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end">
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
              <div className="bg-muted/30 rounded-organic p-6">
                <div className="flex items-start mb-6">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                    <Icon 
                      name={
                        sentiment === 'anxious' ? 'Heart' : 
                        sentiment === 'positive' ? 'Sun' : 
                        sentiment === 'negative' ? 'Cloud' :
                        sentiment === 'reflective' ? 'BookOpen' : 'Smile'
                      } 
                      size={24} 
                      className="text-primary" 
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      {sentiment === 'anxious' 
                        ? 'Taking care of yourself' 
                        : sentiment === 'positive' 
                          ? 'Celebrating the good moments' 
                          : sentiment === 'negative'
                            ? 'Finding balance'
                            : sentiment === 'reflective'
                              ? 'Exploring your thoughts'
                              : 'Reflection time'}
                    </h3>
                    <p className="text-muted-foreground">{response}</p>
                  </div>
                </div>
                
                {/* Suggested Activity */}
                {suggestedActivity && (
                  <div className="mt-6 border-t border-border pt-6">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={toggleActivityDetails}
                    >
                      <div className="flex items-center">
                        <div className="bg-secondary/10 p-3 rounded-full mr-4">
                          <Icon name={suggestedActivity.icon} size={20} className="text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{suggestedActivity.title}</h4>
                          <p className="text-sm text-muted-foreground">{suggestedActivity.description}</p>
                        </div>
                      </div>
                      <Icon 
                        name={showActivityDetails ? "ChevronUp" : "ChevronDown"} 
                        size={20} 
                        className="text-muted-foreground" 
                      />
                    </div>
                    
                    {showActivityDetails && (
                      <div className="mt-4 pl-16">
                        <h5 className="font-medium text-sm mb-2">How to practice:</h5>
                        <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
                          {suggestedActivity.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                        <div className="mt-4">
                          <Button
                            variant="secondary"
                            size="sm"
                            iconName="Play"
                            onClick={() => {
                              // In a real app, this would start the activity
                              console.log(`Starting activity: ${suggestedActivity.title}`);
                            }}
                          >
                            Start Activity
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="border-t border-border pt-6 mt-6">
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handleStartNewEntry}
                    >
                      New Entry
                    </Button>
                    
                    <Button
                      variant="default"
                      onClick={handleBackToDashboard}
                    >
                      Back to Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailyJournalingInterface;