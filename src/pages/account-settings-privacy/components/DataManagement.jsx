import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataManagement = ({ onExportData, onDeleteData }) => {
  const [exportFormat, setExportFormat] = useState('txt');
  const [exportOptions, setExportOptions] = useState({
    journalEntries: true,
    moodData: true,
    insights: false,
    timestamps: true
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatOptions = [
    { value: 'txt', label: 'Text Files (.txt)', description: 'Individual text files for each entry' },
    { value: 'zip', label: 'ZIP Archive (.zip)', description: 'All data in a compressed archive' },
    { value: 'json', label: 'JSON Format (.json)', description: 'Structured data format' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Mock export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const exportData = {
        format: exportFormat,
        options: exportOptions,
        timestamp: new Date().toISOString(),
        entries: 45,
        moodRecords: 38
      };
      
      onExportData(exportData);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE MY ACCOUNT') {
      return;
    }
    
    setIsDeleting(true);
    try {
      // Mock deletion process
      await new Promise(resolve => setTimeout(resolve, 1500));
      onDeleteData();
    } catch (error) {
      console.error('Deletion failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportOptionChange = (key, value) => {
    setExportOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const dataStats = [
    { label: 'Journal Entries', value: '45', icon: 'BookOpen', color: 'text-primary' },
    { label: 'Mood Records', value: '38', icon: 'Heart', color: 'text-success' },
    { label: 'Days Active', value: '52', icon: 'Calendar', color: 'text-accent' },
    { label: 'Data Size', value: '2.3 MB', icon: 'HardDrive', color: 'text-secondary' }
  ];

  return (
    <div className="bg-card rounded-organic-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Database" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground">Data Management</h3>
          <p className="text-sm text-muted-foreground">Export, download, or delete your data</p>
        </div>
      </div>

      {/* Data Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {dataStats.map((stat, index) => (
          <div key={index} className="p-3 bg-muted/30 rounded-organic border border-border/50">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name={stat.icon} size={16} className={stat.color} />
              <span className="text-xs font-caption text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-lg font-heading font-semibold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Export Section */}
      <div className="space-y-6">
        <div className="p-4 bg-success/5 border border-success/20 rounded-organic">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Download" size={18} className="text-success" />
            <h4 className="font-medium text-foreground">Export Your Data</h4>
          </div>
          
          <div className="space-y-4">
            <Select
              label="Export Format"
              description="Choose how you'd like to receive your data"
              options={formatOptions}
              value={exportFormat}
              onChange={setExportFormat}
            />

            <div>
              <h5 className="font-medium text-foreground mb-3">What to include:</h5>
              <div className="space-y-2">
                <Checkbox
                  label="Journal Entries"
                  description="All your written journal entries with timestamps"
                  checked={exportOptions.journalEntries}
                  onChange={(e) => handleExportOptionChange('journalEntries', e.target.checked)}
                />
                <Checkbox
                  label="Mood Data"
                  description="Mood ratings and emotional tracking data"
                  checked={exportOptions.moodData}
                  onChange={(e) => handleExportOptionChange('moodData', e.target.checked)}
                />
                <Checkbox
                  label="AI Insights"
                  description="Generated insights and sentiment analysis results"
                  checked={exportOptions.insights}
                  onChange={(e) => handleExportOptionChange('insights', e.target.checked)}
                />
                <Checkbox
                  label="Timestamps"
                  description="Include creation and modification dates"
                  checked={exportOptions.timestamps}
                  onChange={(e) => handleExportOptionChange('timestamps', e.target.checked)}
                />
              </div>
            </div>

            <Button
              variant="success"
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              {isExporting ? 'Preparing Export...' : 'Export Data'}
            </Button>
          </div>
        </div>

        {/* Delete Section */}
        <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-organic">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Trash2" size={18} className="text-destructive" />
            <h4 className="font-medium text-foreground">Delete Account</h4>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 bg-destructive/10 rounded-organic">
              <h5 className="font-medium text-destructive mb-2">⚠️ This action cannot be undone</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• All journal entries will be permanently deleted</li>
                <li>• Mood data and insights will be removed</li>
                <li>• Your account will be deactivated immediately</li>
                <li>• This action cannot be reversed</li>
              </ul>
            </div>

            {!showDeleteConfirm ? (
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                iconName="AlertTriangle"
                iconPosition="left"
              >
                Delete My Account
              </Button>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Type "DELETE MY ACCOUNT" to confirm:
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-organic bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-destructive"
                    placeholder="DELETE MY ACCOUNT"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    loading={isDeleting}
                    disabled={deleteConfirmation !== 'DELETE MY ACCOUNT'}
                    iconName="Trash2"
                    iconPosition="left"
                    className="flex-1"
                  >
                    {isDeleting ? 'Deleting Account...' : 'Confirm Deletion'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmation('');
                    }}
                    disabled={isDeleting}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Rights Information */}
        <div className="p-4 bg-muted/30 rounded-organic border border-border/50">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={18} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-2">Your Data Rights</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• You have the right to access all your personal data</p>
                <p>• You can request corrections to any inaccurate information</p>
                <p>• You can delete your account and all associated data at any time</p>
                <p>• Data exports are provided in standard, machine-readable formats</p>
                <p>• We retain data only as long as necessary for the service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;