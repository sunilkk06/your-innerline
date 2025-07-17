import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import DashboardNav from '../dashboard/components/DashboardNav';
import Icon from '../../components/AppIcon';

const MoodHistoryAnalytics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mood Analytics | Your Innerline</title>
        <meta name="description" content="Track and analyze your mood patterns over time" />
      </Helmet>

      {/* Dashboard Navigation */}
      <DashboardNav />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="mr-4 p-2 rounded-full hover:bg-muted transition-therapeutic"
          >
            <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
          </button>
          <h1 className="text-2xl font-medium">Mood History & Analytics</h1>
        </div>

        <div className="bg-white rounded-organic p-6 shadow-therapeutic mb-6">
          <p className="text-muted-foreground">
            This is a placeholder for the Mood History & Analytics page. In a complete implementation, 
            this would include charts, graphs, and insights about your mood patterns over time.
          </p>
        </div>
      </main>
    </div>
  );
};

export default MoodHistoryAnalytics;