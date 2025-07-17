import React from 'react';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = () => {
  const steps = [
    {
      step: '01',
      icon: 'UserPlus',
      title: 'Create Your Account',
      description: 'Sign up with your email and create a secure, private space for your thoughts and reflections.',
      color: 'bg-primary/10 text-primary'
    },
    {
      step: '02',
      icon: 'PenTool',
      title: 'Write Freely',
      description: 'Express your thoughts, feelings, and experiences in our intuitive journaling interface designed for emotional safety.',
      color: 'bg-secondary/10 text-secondary'
    },
    {
      step: '03',
      icon: 'Brain',
      title: 'AI Analysis',
      description: 'Our intelligent system analyzes your emotional tone and provides personalized insights and therapeutic suggestions.',
      color: 'bg-accent/10 text-accent'
    },
    {
      step: '04',
      icon: 'TrendingUp',
      title: 'Track Progress',
      description: 'Visualize your emotional journey with mood tracking, weekly summaries, and progress celebrations.',
      color: 'bg-success/10 text-success'
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start your mental wellness journey in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-border transform translate-x-4 -translate-y-1/2 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                </div>
              )}

              {/* Step Content */}
              <div className="relative z-10">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-card border-2 border-border rounded-full mb-4 group-hover:border-primary transition-therapeutic">
                  <span className="text-lg font-heading font-semibold text-primary">
                    {step.step}
                  </span>
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-organic mb-4 ${step.color} group-hover:scale-110 transition-therapeutic`}>
                  <Icon name={step.icon} size={24} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-heading font-medium text-foreground mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Ready to begin your wellness journey?
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-primary">
            <Icon name="ArrowRight" size={16} />
            <span>Start with your first journal entry</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;