import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartJournaling = () => {
    navigate('/authentication-login-register');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-gentle-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-gentle-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-semibold text-foreground mb-6 leading-tight">
            Your Inner Line
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Your private space to reflect, grow, and breathe
          </p>
        </div>

        {/* Supporting Copy */}
        <div className="mb-12">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover a safe, intelligent journaling platform that understands your emotions and guides your mental wellness journey with AI-powered insights and therapeutic support.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-16">
          <Button
            variant="default"
            size="lg"
            onClick={handleStartJournaling}
            iconName="PenTool"
            iconPosition="left"
            className="px-8 py-4 text-lg font-medium shadow-therapeutic-lg hover:shadow-therapeutic animate-breathe"
          >
            Start Journaling
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span>End-to-end encrypted</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={16} className="text-success" />
            <span>HIPAA compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Heart" size={16} className="text-primary" />
            <span>Therapist approved</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;