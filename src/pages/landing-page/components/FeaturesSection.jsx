import React from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      icon: 'Brain',
      title: 'AI Sentiment Analysis',
      description: 'Advanced AI understands your emotional tone and provides personalized insights to support your mental wellness journey.',
      color: 'text-primary'
    },
    {
      icon: 'TrendingUp',
      title: 'Mood Tracking',
      description: 'Visualize your emotional patterns over time with intuitive charts and weekly summaries to track your progress.',
      color: 'text-secondary'
    },
    {
      icon: 'Shield',
      title: 'Private & Secure',
      description: 'Your thoughts remain completely private with end-to-end encryption and full control over your personal data.',
      color: 'text-success'
    },
    {
      icon: 'Zap',
      title: 'Therapeutic Exercises',
      description: 'Receive contextual breathing exercises, guided visualizations, and reframing techniques based on your entries.',
      color: 'text-accent'
    },
    {
      icon: 'AlertTriangle',
      title: 'Crisis Support',
      description: 'Intelligent detection of distress signals with immediate access to mental health resources and emergency support.',
      color: 'text-warning'
    },
    {
      icon: 'Download',
      title: 'Data Control',
      description: 'Export your journal entries, download your data, or delete your account anytime with complete transparency.',
      color: 'text-muted-foreground'
    }
  ];

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-4">
            Intelligent Wellness Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of AI-driven emotional intelligence combined with therapeutic best practices
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-background rounded-organic-lg border border-border hover:shadow-therapeutic-lg transition-therapeutic"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-organic flex items-center justify-center shrink-0 group-hover:scale-110 transition-therapeutic">
                  <Icon name={feature.icon} size={24} className={feature.color} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;