import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import DashboardNav from './components/DashboardNav';
import JournalPrompt from './components/JournalPrompt';
import MoodPatternCard from './components/MoodPatternCard';
import WeeklyProgressCard from './components/WeeklyProgressCard';
import RecentJournalEntries from './components/RecentJournalEntries';
import QuickActions from './components/QuickActions';
import ProgressSummary from './components/ProgressSummary';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate('/authentication-login-register');
      return;
    }
    
    // Fetch user data, journal entries, etc.
    const fetchData = async () => {
      try {
        // Fetch data from API or database
        // ...
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/30 mb-4"></div>
          <div className="text-muted-foreground">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard | Your Innerline</title>
        <meta name="description" content="Your personal journaling dashboard" />
      </Helmet>

      {/* Dashboard Navigation */}
      <DashboardNav />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Journal Prompt */}
            <JournalPrompt />
            
            {/* Quick Actions */}
            <QuickActions />
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            {/* Mood Pattern Card */}
            <MoodPatternCard />
            
            {/* Weekly Progress Card */}
            <WeeklyProgressCard />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Journal Entries */}
            <RecentJournalEntries />
            
            {/* Progress Summary */}
            <ProgressSummary />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;