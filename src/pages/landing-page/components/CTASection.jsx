import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const navigate = useNavigate();

  const handleStartJournaling = () => {
    navigate('/authentication-login-register');
  };

  const benefits = [
    'Start journaling in under 2 minutes',
    'AI-powered emotional insights',
    'Complete privacy and data control',
    '24/7 crisis support resources'
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main CTA Content */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-heading font-semibold text-foreground mb-6">
            Begin Your Wellness Journey Today
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands who've found clarity, peace, and emotional growth through intelligent journaling
          </p>
        </div>

        {/* Benefits List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3 text-left">
              <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center shrink-0">
                <Icon name="Check" size={16} className="text-white" />
              </div>
              <span className="text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            variant="default"
            size="lg"
            onClick={handleStartJournaling}
            iconName="PenTool"
            iconPosition="left"
            className="px-8 py-4 text-lg font-medium shadow-therapeutic-lg hover:shadow-therapeutic animate-breathe"
          >
            Start Journaling Free
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
            iconName="Play"
            iconPosition="left"
            className="px-8 py-4 text-lg"
          >
            See How It Works
          </Button>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span>10,000+ active users</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={16} className="text-warning" />
            <span>4.9/5 user rating</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span>100% secure & private</span>
          </div>
        </div>

        {/* Reassurance Message */}
        <div className="mt-12 p-6 bg-background/80 backdrop-blur-sm rounded-organic border border-border">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Icon name="Heart" size={24} className="text-primary" />
            <h3 className="text-lg font-heading font-medium text-foreground">
              Your Mental Health Matters
            </h3>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Taking the first step toward better mental health takes courage. We're here to support you every step of the way with compassionate technology and evidence-based therapeutic approaches.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;