import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/ui/Navbar';
import HeroSection from './components/HeroSection';
import FooterSection from './components/FooterSection';

const LandingPage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Your Innerline - Your Private Space to Reflect, Grow, and Breathe</title>
        <meta 
          name="description" 
          content="Discover Your Innerline, an intelligent journaling platform for mental wellness. AI-powered sentiment analysis, mood tracking, and therapeutic support in a private, secure environment." 
        />
        <meta name="keywords" content="mental health, journaling, AI sentiment analysis, mood tracking, therapy, wellness, privacy, emotional support" />
        <meta property="og:title" content="Your Innerline - Your Private Space to Reflect, Grow, and Breathe" />
        <meta property="og:description" content="Intelligent journaling platform with AI-powered insights for mental wellness and emotional growth." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Innerline - Mental Wellness Journaling" />
        <meta name="twitter:description" content="Private, secure journaling with AI-powered emotional insights and therapeutic support." />
      </Helmet>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default LandingPage;