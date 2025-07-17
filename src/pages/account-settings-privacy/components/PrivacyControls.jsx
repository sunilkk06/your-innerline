import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const PrivacyControls = ({ settings, onUpdateSettings }) => {
  const [privacySettings, setPrivacySettings] = useState({
    aiAnalysisEnabled: settings?.aiAnalysisEnabled ?? true,
    sentimentTracking: settings?.sentimentTracking ?? true,
    moodInsights: settings?.moodInsights ?? true,
    dataRetention: settings?.dataRetention ?? '1year',
    anonymousAnalytics: settings?.anonymousAnalytics ?? false,
    researchParticipation: settings?.researchParticipation ?? false,
    crisisDetection: settings?.crisisDetection ?? true,
    emergencyContacts: settings?.emergencyContacts ?? true
  });

  const retentionOptions = [
    { value: '3months', label: '3 Months', description: 'Data deleted after 3 months' },
    { value: '6months', label: '6 Months', description: 'Data deleted after 6 months' },
    { value: '1year', label: '1 Year', description: 'Data deleted after 1 year' },
    { value: 'indefinite', label: 'Keep Indefinitely', description: 'Data kept until manually deleted' }
  ];

  const handleSettingChange = (key, value) => {
    const newSettings = {
      ...privacySettings,
      [key]: value
    };
    setPrivacySettings(newSettings);
    onUpdateSettings(newSettings);
  };

  const privacyControls = [
    {
      id: 'aiAnalysisEnabled',
      title: 'AI Sentiment Analysis',
      description: 'Allow AI to analyze your journal entries for emotional insights',
      icon: 'Brain',
      checked: privacySettings.aiAnalysisEnabled,
      critical: false
    },
    {
      id: 'sentimentTracking',
      title: 'Sentiment Tracking',
      description: 'Track emotional patterns over time for personalized insights',
      icon: 'TrendingUp',
      checked: privacySettings.sentimentTracking,
      critical: false
    },
    {
      id: 'moodInsights',
      title: 'Mood Insights',
      description: 'Generate weekly mood summaries and trend analysis',
      icon: 'BarChart3',
      checked: privacySettings.moodInsights,
      critical: false
    },
    {
      id: 'crisisDetection',
      title: 'Crisis Language Detection',
      description: 'Monitor entries for signs of distress and provide immediate support',
      icon: 'AlertTriangle',
      checked: privacySettings.crisisDetection,
      critical: true
    },
    {
      id: 'emergencyContacts',
      title: 'Emergency Resource Access',
      description: 'Show crisis helplines and emergency contacts when needed',
      icon: 'Phone',
      checked: privacySettings.emergencyContacts,
      critical: true
    },
    {
      id: 'anonymousAnalytics',
      title: 'Anonymous Usage Analytics',
      description: 'Help improve the app by sharing anonymous usage patterns',
      icon: 'BarChart2',
      checked: privacySettings.anonymousAnalytics,
      critical: false
    },
    {
      id: 'researchParticipation',
      title: 'Mental Health Research',
      description: 'Contribute anonymized data to mental health research studies',
      icon: 'Microscope',
      checked: privacySettings.researchParticipation,
      critical: false
    }
  ];

  return (
    <div className="bg-card rounded-organic-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Shield" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground">Privacy Controls</h3>
          <p className="text-sm text-muted-foreground">Manage how your data is used and analyzed</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Data Retention Setting */}
        <div className="p-4 bg-muted/30 rounded-organic border border-border/50">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Clock" size={18} className="text-primary" />
            <h4 className="font-medium text-foreground">Data Retention Period</h4>
          </div>
          <Select
            label="How long should we keep your data?"
            description="Choose how long your journal entries and mood data are stored"
            options={retentionOptions}
            value={privacySettings.dataRetention}
            onChange={(value) => handleSettingChange('dataRetention', value)}
            className="mt-2"
          />
        </div>

        {/* Privacy Controls */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Settings" size={18} className="text-primary" />
            <span>Feature Controls</span>
          </h4>
          
          {privacyControls.map((control) => (
            <div
              key={control.id}
              className={`p-4 rounded-organic border transition-therapeutic ${
                control.critical 
                  ? 'bg-warning/5 border-warning/20' :'bg-card border-border hover:shadow-therapeutic-sm'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                  control.critical ? 'bg-warning/10' : 'bg-primary/10'
                }`}>
                  <Icon 
                    name={control.icon} 
                    size={16} 
                    className={control.critical ? 'text-warning' : 'text-primary'} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-foreground flex items-center space-x-2">
                        <span>{control.title}</span>
                        {control.critical && (
                          <span className="px-2 py-0.5 bg-warning/20 text-warning text-xs rounded-full font-caption">
                            Recommended
                          </span>
                        )}
                      </h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        {control.description}
                      </p>
                    </div>
                    <Checkbox
                      checked={control.checked}
                      onChange={(e) => handleSettingChange(control.id, e.target.checked)}
                      className="ml-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy Notice */}
        <div className="p-4 bg-success/5 border border-success/20 rounded-organic">
          <div className="flex items-start space-x-3">
            <Icon name="Lock" size={18} className="text-success mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Your Privacy Matters</h4>
              <p className="text-sm text-muted-foreground">
                All data processing happens with your explicit consent. You can change these settings at any time, 
                and your journal entries remain private and encrypted regardless of these preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 px-3 py-1 bg-muted/50 rounded-full">
            <Icon name="Shield" size={14} className="text-success" />
            <span className="text-xs font-caption text-muted-foreground">HIPAA Compliant</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 bg-muted/50 rounded-full">
            <Icon name="Lock" size={14} className="text-success" />
            <span className="text-xs font-caption text-muted-foreground">End-to-End Encrypted</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 bg-muted/50 rounded-full">
            <Icon name="Eye" size={14} className="text-success" />
            <span className="text-xs font-caption text-muted-foreground">Zero Data Sharing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControls;