import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AboutSection = () => {
  const values = [
    {
      icon: 'Heart',
      title: 'Empathy First',
      description: 'Every feature is designed with deep understanding of mental health challenges and the courage it takes to seek support.'
    },
    {
      icon: 'Shield',
      title: 'Privacy by Design',
      description: 'Your mental health data is yours alone. We use end-to-end encryption and give you complete control over your information.'
    },
    {
      icon: 'Users',
      title: 'Evidence-Based',
      description: 'Our therapeutic approaches are grounded in proven psychological research and validated by mental health professionals.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Journal Entries', description: 'Written by our community' },
    { number: '95%', label: 'User Satisfaction', description: 'Report improved mood tracking' },
    { number: '24/7', label: 'Crisis Support', description: 'Emergency resources available' },
    { number: '100%', label: 'Privacy Protected', description: 'End-to-end encrypted data' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-depth-subtle">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-4">
            About Inner Line
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We believe that mental wellness should be accessible, private, and personalized. Inner Line combines the therapeutic benefits of journaling with intelligent technology to support your emotional well-being.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-background rounded-organic-lg p-8 md:p-12 mb-16 shadow-therapeutic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To create a safe, intelligent space where individuals can explore their emotions, track their mental wellness journey, and receive personalized support through the power of AI and therapeutic best practices.
              </p>
              <div className="flex items-center space-x-2 text-primary">
                <Icon name="Sparkles" size={20} />
                <span className="font-medium">Empowering emotional intelligence through technology</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-organic-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Person writing in journal in peaceful setting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-semibold text-foreground text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-background rounded-organic border border-border hover:shadow-therapeutic-sm transition-therapeutic"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={value.icon} size={28} className="text-primary" />
                </div>
                <h4 className="text-lg font-heading font-medium text-foreground mb-3">
                  {value.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-background rounded-organic-lg p-8 shadow-therapeutic">
          <h3 className="text-2xl font-heading font-semibold text-foreground text-center mb-12">
            Trusted by Our Community
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;