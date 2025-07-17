import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import DashboardNav from '../dashboard/components/DashboardNav';
import Icon from '../../components/AppIcon';
import MyDataTab from './components/MyDataTab';

const AccountSettingsPrivacy = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('myData');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'myData', label: 'My Data', icon: 'Database' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'security', label: 'Security', icon: 'Lock' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'myData':
        return <MyDataTab />;
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-foreground">Profile Settings</h2>
            <p className="text-muted-foreground">
              This is a placeholder for profile settings. In a complete implementation, 
              this would include name, email, profile picture, etc.
            </p>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-foreground">Privacy Settings</h2>
            <p className="text-muted-foreground">
              This is a placeholder for privacy settings. In a complete implementation, 
              this would include data sharing preferences, visibility options, etc.
            </p>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-foreground">Notification Settings</h2>
            <p className="text-muted-foreground">
              This is a placeholder for notification settings. In a complete implementation, 
              this would include email notifications, app notifications, etc.
            </p>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-foreground">Security Settings</h2>
            <p className="text-muted-foreground">
              This is a placeholder for security settings. In a complete implementation, 
              this would include password change, two-factor authentication, etc.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Account Settings | Your Innerline</title>
        <meta name="description" content="Manage your account settings and privacy preferences" />
      </Helmet>

      {/* Dashboard Navigation */}
      <DashboardNav />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="mr-4 p-2 rounded-full hover:bg-muted transition-therapeutic"
          >
            <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
          </button>
          <h1 className="text-2xl font-medium">Account Settings</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-organic shadow-therapeutic overflow-hidden">
              <nav className="flex flex-col">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 px-4 py-3 text-left transition-therapeutic ${
                      activeTab === tab.id
                        ? 'bg-primary/10 text-primary border-l-4 border-primary'
                        : 'text-muted-foreground hover:bg-muted/50 border-l-4 border-transparent'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-organic p-6 shadow-therapeutic">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountSettingsPrivacy;