import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'End-to-End Encryption',
      description: 'Your journal entries are encrypted and completely private'
    },
    {
      icon: 'Lock',
      title: 'HIPAA Compliant',
      description: 'We follow strict healthcare privacy standards'
    },
    {
      icon: 'Eye',
      title: 'No Data Sharing',
      description: 'Your personal reflections are never shared or sold'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      {/* Trust Message */}
      <div className="text-center mb-6">
        <h3 className="font-heading font-medium text-foreground mb-2">
          Your Privacy is Sacred
        </h3>
        <p className="text-sm text-muted-foreground">
          We've built Inner Line with your mental health privacy as our top priority
        </p>
      </div>

      {/* Trust Features */}
      <div className="grid gap-4 sm:grid-cols-3">
        {trustFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 bg-card/50 rounded-organic border border-border/50"
          >
            <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mb-3">
              <Icon name={feature.icon} size={20} className="text-success" />
            </div>
            <h4 className="font-medium text-foreground text-sm mb-1">
              {feature.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Privacy Policy Link */}
      <div className="text-center mt-6">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 transition-therapeutic">
            Privacy Policy
          </button>
          {' '}and{' '}
          <button className="text-primary hover:text-primary/80 transition-therapeutic">
            Terms of Service
          </button>
        </p>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center mt-4 space-x-2">
        <Icon name="ShieldCheck" size={16} className="text-success" />
        <span className="text-xs font-caption text-success">
          SSL Secured & Verified
        </span>
      </div>
    </div>
  );
};

export default TrustIndicators;