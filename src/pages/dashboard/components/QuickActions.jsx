import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [activeActivity, setActiveActivity] = useState(null);

  const activities = {
    meditation: {
      title: 'Guided Meditation',
      description: 'Take a moment to center yourself',
      content: (
        <div className="p-4 bg-muted/30 rounded-organic mt-4">
          <h3 className="font-medium mb-2">Calm Forest Visualization</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Find a comfortable position and take a deep breath. Close your eyes and imagine yourself walking through a peaceful forest. 
            Notice the gentle rustling of leaves, the soft ground beneath your feet, and the dappled sunlight filtering through the trees.
          </p>
          <div className="flex items-center justify-center mb-4">
            <div className="w-full max-w-xs bg-muted h-2 rounded-full overflow-hidden">
              <div className="h-full bg-secondary animate-pulse-slow"></div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              iconName="Play"
              onClick={() => console.log('Starting meditation')}
            >
              Start 3-minute meditation
            </Button>
          </div>
        </div>
      ),
      icon: 'Sparkles',
      iconColor: 'text-secondary'
    },
    gratitude: {
      title: 'Gratitude Practice',
      description: 'Reflect on what you\'re thankful for',
      content: (
        <div className="p-4 bg-muted/30 rounded-organic mt-4">
          <h3 className="font-medium mb-2">Daily Gratitude</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Take a moment to write down three things you&apos;re grateful for today, no matter how small.
            Research shows that regular gratitude practice can significantly improve well-being and mental health.
          </p>
          <textarea
            placeholder="I&apos;m grateful for..."
            className="w-full h-24 p-3 border border-border rounded-organic focus:ring-primary focus:border-primary bg-background resize-none mb-4"
          ></textarea>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              iconName="Check"
              onClick={() => console.log('Saving gratitude entry')}
            >
              Save Entry
            </Button>
          </div>
        </div>
      ),
      icon: 'Heart',
      iconColor: 'text-accent'
    },
    moodHistory: {
      title: 'View Mood History',
      description: 'Explore your emotional patterns and insights',
      content: null, // This will navigate to a different page
      icon: 'BarChart2',
      iconColor: 'text-primary'
    }
  };

  const handleActivityClick = (activityKey) => {
    if (activityKey === 'moodHistory') {
      // This will be handled by the Link component
      return;
    }
    
    setActiveActivity(activeActivity === activityKey ? null : activityKey);
  };

  return (
    <div className="bg-white rounded-organic p-6 shadow-therapeutic">
      <h2 className="text-lg font-medium mb-6">Quick Actions</h2>

      <div className="space-y-4">
        {/* View Mood History */}
        <Link 
          to="/mood-history-analytics" 
          className="flex items-center p-3 rounded-organic hover:bg-muted transition-therapeutic"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
            <Icon name={activities.moodHistory.icon} size={20} className={activities.moodHistory.iconColor} />
          </div>
          <div>
            <div className="font-medium">{activities.moodHistory.title}</div>
            <div className="text-sm text-muted-foreground">
              {activities.moodHistory.description}
            </div>
          </div>
          <Icon name="ChevronRight" size={20} className="ml-auto text-muted-foreground" />
        </Link>

        {/* Guided Meditation */}
        <div>
          <div 
            className="flex items-center p-3 rounded-organic hover:bg-muted transition-therapeutic cursor-pointer"
            onClick={() => handleActivityClick('meditation')}
          >
            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
              <Icon name={activities.meditation.icon} size={20} className={activities.meditation.iconColor} />
            </div>
            <div>
              <div className="font-medium">{activities.meditation.title}</div>
              <div className="text-sm text-muted-foreground">
                {activities.meditation.description}
              </div>
            </div>
            <Icon 
              name={activeActivity === 'meditation' ? "ChevronDown" : "ChevronRight"} 
              size={20} 
              className="ml-auto text-muted-foreground" 
            />
          </div>
          {activeActivity === 'meditation' && activities.meditation.content}
        </div>

        {/* Gratitude Practice */}
        <div>
          <div 
            className="flex items-center p-3 rounded-organic hover:bg-muted transition-therapeutic cursor-pointer"
            onClick={() => handleActivityClick('gratitude')}
          >
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-4">
              <Icon name={activities.gratitude.icon} size={20} className={activities.gratitude.iconColor} />
            </div>
            <div>
              <div className="font-medium">{activities.gratitude.title}</div>
              <div className="text-sm text-muted-foreground">
                {activities.gratitude.description}
              </div>
            </div>
            <Icon 
              name={activeActivity === 'gratitude' ? "ChevronDown" : "ChevronRight"} 
              size={20} 
              className="ml-auto text-muted-foreground" 
            />
          </div>
          {activeActivity === 'gratitude' && activities.gratitude.content}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;