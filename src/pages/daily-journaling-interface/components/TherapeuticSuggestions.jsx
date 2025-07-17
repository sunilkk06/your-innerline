import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TherapeuticSuggestions = ({ sentiment, onStartExercise, exercisesBySentiment }) => {
  const [expandedExercise, setExpandedExercise] = useState(null);

  const exercisesBysentiment = {
    anxious: [
    {
      id: 'breathing-4-7-8',
      title: '4-7-8 Breathing Reset',
      duration: '2 minutes',
      icon: 'Wind',
      description: 'Calm your nervous system with this proven breathing technique',
      instructions: [
      'Exhale completely through your mouth',
      'Close your mouth and inhale through nose for 4 counts',
      'Hold your breath for 7 counts',
      'Exhale through mouth for 8 counts',
      'Repeat 3-4 times'],

      benefits: 'Reduces anxiety and promotes relaxation'
    },
    {
      id: 'grounding-5-4-3-2-1',
      title: '5-4-3-2-1 Grounding',
      duration: '3 minutes',
      icon: 'Anchor',
      description: 'Ground yourself in the present moment',
      instructions: [
      'Name 5 things you can see',
      'Name 4 things you can touch',
      'Name 3 things you can hear',
      'Name 2 things you can smell',
      'Name 1 thing you can taste'],

      benefits: 'Brings you back to the present and reduces overwhelm'
    }],

    sad: [
    {
      id: 'self-compassion',
      title: 'Self-Compassion Practice',
      duration: '5 minutes',
      icon: 'Heart',
      description: 'Treat yourself with the kindness you deserve',
      instructions: [
      'Place your hand on your heart',
      'Acknowledge: "This is a moment of suffering"',
      'Remember: "Suffering is part of life"',
      'Offer yourself: "May I be kind to myself"',
      'Take three deep, caring breaths'],

      benefits: 'Reduces self-criticism and promotes emotional healing'
    },
    {
      id: 'gratitude-shift',
      title: 'Gentle Gratitude Shift',
      duration: '3 minutes',
      icon: 'Sparkles',
      description: 'Find small moments of appreciation',
      instructions: [
      'Think of one small thing that went okay today',
      'Notice one person who cares about you',
      'Appreciate one thing your body did for you',
      'Acknowledge one thing you accomplished',
      'Feel grateful for this moment of reflection'],

      benefits: 'Gently shifts focus toward positive aspects'
    }],

    happy: [
    {
      id: 'joy-amplification',
      title: 'Joy Amplification',
      duration: '2 minutes',
      icon: 'Sun',
      description: 'Deepen and extend your positive feelings',
      instructions: [
      'Close your eyes and smile naturally',
      'Recall the moment that brought you joy',
      'Notice where you feel happiness in your body',
      'Breathe into that feeling and expand it',
      'Set an intention to carry this feeling forward'],

      benefits: 'Strengthens positive neural pathways'
    }],

    grateful: [
    {
      id: 'gratitude-expansion',
      title: 'Gratitude Expansion',
      duration: '4 minutes',
      icon: 'Gift',
      description: 'Deepen your appreciation practice',
      instructions: [
      'Write down what you\'re grateful for',
      'Think about why this matters to you',
      'Consider who else might be involved',
      'Feel the warmth of appreciation in your chest',
      'Send a mental thank you to someone'],

      benefits: 'Enhances well-being and connection'
    }],

    neutral: [
    {
      id: 'mindful-check-in',
      title: 'Mindful Check-In',
      duration: '3 minutes',
      icon: 'Compass',
      description: 'Connect with your inner state',
      instructions: [
      'Take three deep breaths',
      'Scan your body from head to toe',
      'Notice any emotions without judgment',
      'Ask: "What do I need right now?"',
      'Set a gentle intention for the rest of your day'],

      benefits: 'Increases self-awareness and presence'
    }]

  };

  const currentExercises = exercisesBysentiment[sentiment] || exercisesBySentiment.neutral;

  const toggleExercise = (exerciseId) => {
    setExpandedExercise(expandedExercise === exerciseId ? null : exerciseId);
  };

  const startExercise = (exercise) => {
    onStartExercise(exercise);
    setExpandedExercise(null);
  };

  return (
    <div className="bg-card rounded-organic-lg border border-border shadow-therapeutic p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Lightbulb" size={20} className="text-primary" />
        <h3 className="font-heading font-medium text-foreground">
          Suggested Exercises
        </h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-6">
        Based on your emotional tone, here are some gentle exercises that might help
      </p>

      <div className="space-y-3">
        {currentExercises.map((exercise) =>
        <div
          key={exercise.id}
          className="border border-border rounded-organic transition-therapeutic hover:shadow-therapeutic-sm">

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name={exercise.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{exercise.title}</h4>
                    <p className="text-sm text-muted-foreground">{exercise.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleExercise(exercise.id)}
                  iconName={expandedExercise === exercise.id ? 'ChevronUp' : 'ChevronDown'}
                  iconPosition="right">

                    {expandedExercise === exercise.id ? 'Less' : 'More'}
                  </Button>
                  
                  <Button
                  variant="primary"
                  size="sm"
                  onClick={() => startExercise(exercise)}
                  iconName="Play"
                  iconPosition="left">

                    Start
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-2">
                {exercise.description}
              </p>
            </div>

            {expandedExercise === exercise.id &&
          <div className="px-4 pb-4 border-t border-border bg-muted/30">
                <div className="pt-4 space-y-4">
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Instructions:</h5>
                    <ol className="space-y-1">
                      {exercise.instructions.map((instruction, index) =>
                  <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                          <span className="text-primary font-medium min-w-[20px]">{index + 1}.</span>
                          <span>{instruction}</span>
                        </li>
                  )}
                    </ol>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Icon name="Info" size={16} className="text-primary mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-foreground">Benefits: </span>
                      <span className="text-sm text-muted-foreground">{exercise.benefits}</span>
                    </div>
                  </div>
                </div>
              </div>
          }
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <p className="text-xs text-muted-foreground">
            These exercises are suggestions. Listen to your body and do what feels right for you.
          </p>
        </div>
      </div>
    </div>);

};

export default TherapeuticSuggestions;