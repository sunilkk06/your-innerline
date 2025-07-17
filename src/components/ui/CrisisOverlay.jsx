import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const CrisisOverlay = ({ isActive, onClose, triggerReason }) => {
  const [currentStep, setCurrentStep] = useState('immediate');
  const [breathingCount, setBreathingCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
      setCurrentStep('immediate');
      setBreathingCount(0);
      setIsBreathing(false);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isActive]);

  const emergencyContacts = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 crisis support',
      icon: 'Phone'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Text-based crisis support',
      icon: 'MessageSquare'
    },
    {
      name: 'Emergency Services',
      number: '911',
      description: 'Immediate emergency assistance',
      icon: 'AlertTriangle'
    }
  ];

  const groundingTechniques = [
    {
      title: '5-4-3-2-1 Technique',
      description: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste',
      icon: 'Eye'
    },
    {
      title: 'Box Breathing',
      description: 'Breathe in for 4, hold for 4, out for 4, hold for 4',
      icon: 'Square'
    },
    {
      title: 'Progressive Muscle Relaxation',
      description: 'Tense and release each muscle group from toes to head',
      icon: 'Zap'
    }
  ];

  const startBreathingExercise = () => {
    setIsBreathing(true);
    setBreathingCount(0);
    
    const breathingInterval = setInterval(() => {
      setBreathingCount(prev => {
        if (prev >= 8) {
          clearInterval(breathingInterval);
          setIsBreathing(false);
          return 0;
        }
        return prev + 1;
      });
    }, 4000);
  };

  const handleCallEmergency = (number) => {
    if (number === '911' || number === '988') {
      window.location.href = `tel:${number}`;
    } else if (number.includes('741741')) {
      // Open SMS app with pre-filled message
      window.location.href = 'sms:741741?body=HOME';
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-9999 crisis-overlay flex items-center justify-center p-4">
      <div className="bg-background rounded-organic-lg shadow-therapeutic-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning text-warning-foreground rounded-full flex items-center justify-center">
              <Icon name="Heart" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">
                You're Not Alone
              </h2>
              <p className="text-sm text-muted-foreground">
                Immediate support and resources are available
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            className="text-muted-foreground hover:text-foreground"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Immediate Safety Message */}
          <div className="bg-warning/10 border border-warning/20 rounded-organic p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  If you're in immediate danger
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Please reach out for immediate help. You deserve support and care.
                </p>
                <Button
                  variant="warning"
                  onClick={() => handleCallEmergency('911')}
                  iconName="Phone"
                  iconPosition="left"
                  className="animate-breathe"
                >
                  Call Emergency Services (911)
                </Button>
              </div>
            </div>
          </div>

          {/* Crisis Support Contacts */}
          <div>
            <h3 className="font-heading font-medium text-foreground mb-4">
              Crisis Support Resources
            </h3>
            <div className="grid gap-3">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-card rounded-organic border border-border hover:shadow-therapeutic-sm transition-therapeutic"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                      <Icon name={contact.icon} size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{contact.name}</h4>
                      <p className="text-sm text-muted-foreground">{contact.description}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCallEmergency(contact.number)}
                    className="shrink-0"
                  >
                    {contact.number.includes('Text') ? 'Text' : 'Call'}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Breathing Exercise */}
          <div className="bg-primary/5 border border-primary/20 rounded-organic p-4">
            <div className="text-center">
              <h3 className="font-heading font-medium text-foreground mb-2">
                Guided Breathing Exercise
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Take a moment to center yourself with this breathing exercise
              </p>
              
              {isBreathing ? (
                <div className="space-y-4">
                  <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center animate-breathe">
                    <Icon name="Circle" size={40} className="text-primary-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Breath {Math.floor(breathingCount / 2) + 1} of 4
                  </p>
                  <p className="font-medium text-foreground">
                    {breathingCount % 2 === 0 ? 'Breathe In...' : 'Breathe Out...'}
                  </p>
                </div>
              ) : (
                <Button
                  variant="primary"
                  onClick={startBreathingExercise}
                  iconName="Play"
                  iconPosition="left"
                >
                  Start Breathing Exercise
                </Button>
              )}
            </div>
          </div>

          {/* Grounding Techniques */}
          <div>
            <h3 className="font-heading font-medium text-foreground mb-4">
              Grounding Techniques
            </h3>
            <div className="grid gap-3">
              {groundingTechniques.map((technique, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-card rounded-organic border border-border"
                >
                  <div className="w-8 h-8 bg-secondary/20 text-secondary rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Icon name={technique.icon} size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{technique.title}</h4>
                    <p className="text-sm text-muted-foreground">{technique.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reassurance Message */}
          <div className="text-center p-4 bg-success/5 border border-success/20 rounded-organic">
            <Icon name="Heart" size={24} className="text-success mx-auto mb-2" />
            <p className="text-sm text-foreground font-medium mb-1">
              Your feelings are valid and temporary
            </p>
            <p className="text-xs text-muted-foreground">
              This difficult moment will pass. You have the strength to get through this.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="primary"
              onClick={onClose}
              iconName="ArrowLeft"
              iconPosition="left"
              className="flex-1"
            >
              Return to Journal
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('https://suicidepreventionlifeline.org', '_blank')}
              iconName="ExternalLink"
              iconPosition="right"
              className="flex-1"
            >
              More Resources
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisOverlay;