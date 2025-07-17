import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExerciseModal = ({ exercise, isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isOpen && exercise) {
      setCurrentStep(0);
      setIsActive(false);
      setTimeRemaining(0);
      setIsCompleted(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, exercise]);

  useEffect(() => {
    let interval;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsActive(false);
            if (currentStep < exercise.instructions.length - 1) {
              setCurrentStep(prev => prev + 1);
            } else {
              setIsCompleted(true);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining, currentStep, exercise]);

  const startStep = () => {
    setTimeRemaining(getStepDuration(currentStep));
    setIsActive(true);
  };

  const getStepDuration = (stepIndex) => {
    // Different durations based on exercise type and step
    if (exercise.id === 'breathing-4-7-8') {
      return [4, 7, 8, 4, 7, 8][stepIndex] || 5;
    }
    return 30; // Default 30 seconds per step
  };

  const nextStep = () => {
    if (currentStep < exercise.instructions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setIsActive(false);
      setTimeRemaining(0);
    } else {
      setIsCompleted(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setIsActive(false);
      setTimeRemaining(0);
    }
  };

  const handleComplete = () => {
    onComplete(exercise);
    onClose();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !exercise) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-organic-lg shadow-therapeutic-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={exercise.icon} size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">
                {exercise.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {exercise.duration} • Step {currentStep + 1} of {exercise.instructions.length}
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
        <div className="p-6">
          {!isCompleted ? (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {currentStep + 1} / {exercise.instructions.length}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / exercise.instructions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Instruction */}
              <div className="text-center space-y-4">
                <div className="bg-primary/5 border border-primary/20 rounded-organic p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    Step {currentStep + 1}
                  </h3>
                  <p className="text-foreground text-base leading-relaxed">
                    {exercise.instructions[currentStep]}
                  </p>
                </div>

                {/* Timer Display */}
                {isActive && timeRemaining > 0 && (
                  <div className="space-y-3">
                    <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center animate-breathe">
                      <span className="text-2xl font-mono font-semibold text-primary">
                        {timeRemaining}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {exercise.id === 'breathing-4-7-8' && currentStep % 3 === 0 && 'Breathe in...'}
                      {exercise.id === 'breathing-4-7-8' && currentStep % 3 === 1 && 'Hold...'}
                      {exercise.id === 'breathing-4-7-8' && currentStep % 3 === 2 && 'Breathe out...'}
                    </p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-3">
                  {!isActive ? (
                    <Button
                      variant="primary"
                      onClick={startStep}
                      iconName="Play"
                      iconPosition="left"
                    >
                      Start Step
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsActive(false)}
                      iconName="Pause"
                      iconPosition="left"
                    >
                      Pause
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    onClick={nextStep}
                    disabled={currentStep === exercise.instructions.length - 1}
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Completion Screen */
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={40} className="text-success" />
              </div>
              
              <div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  Exercise Complete!
                </h3>
                <p className="text-muted-foreground">
                  You've successfully completed the {exercise.title} exercise.
                </p>
              </div>

              <div className="bg-success/5 border border-success/20 rounded-organic p-4">
                <div className="flex items-start space-x-2">
                  <Icon name="Sparkles" size={18} className="text-success mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground mb-1">Benefits:</p>
                    <p className="text-sm text-muted-foreground">{exercise.benefits}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Journal
                </Button>
                
                <Button
                  variant="primary"
                  onClick={handleComplete}
                  iconName="Heart"
                  iconPosition="left"
                >
                  Mark as Helpful
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;