import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Marketing Professional',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c3c8e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      content: `Inner Line has transformed how I process my emotions. The AI insights help me understand patterns I never noticed before, and the crisis support gave me confidence to explore deeper feelings safely.`,
      rating: 5,
      highlight: 'AI insights'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Graduate Student',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      content: `The privacy features are incredible. Knowing my thoughts are completely secure allows me to be truly honest in my journaling. The mood tracking helps me see progress even on difficult days.`,
      rating: 5,
      highlight: 'privacy features'
    },
    {
      name: 'Emily Johnson',
      role: 'Healthcare Worker',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      content: `As someone in healthcare, I appreciate the evidence-based therapeutic exercises. The breathing techniques and reframing prompts have become essential tools in my daily wellness routine.`,
      rating: 5,
      highlight: 'therapeutic exercises'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from people who've found support and growth through Inner Line
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-organic-lg p-6 border border-border hover:shadow-therapeutic-lg transition-therapeutic group"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-muted-foreground leading-relaxed mb-6 relative">
                <Icon name="Quote" size={20} className="text-primary/30 absolute -top-2 -left-1" />
                <p className="pl-6">
                  {testimonial.content}
                </p>
              </blockquote>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10">
                  <Image
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Highlight Badge */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  <Icon name="Heart" size={12} />
                  <span>Loves: {testimonial.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-6 px-8 py-4 bg-card rounded-organic border border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm font-medium text-foreground">HIPAA Compliant</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} className="text-success" />
              <span className="text-sm font-medium text-foreground">256-bit Encryption</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Therapist Approved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;