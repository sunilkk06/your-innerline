import React, { useState } from 'react';
import { supabase } from '../../../utils/supabase';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import { useAuth } from '../../../contexts/AuthContext';

const MyDataTab = () => {
  const { user } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');
  const [exportOptions, setExportOptions] = useState({
    journalEntries: true,
    moodData: true,
    userProfile: true,
    insights: false
  });
  const [deletePassword, setDeletePassword] = useState('');

  const handleExportOptionChange = (option, value) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const handleExportData = async () => {
    if (!user) return;
    
    setIsExporting(true);
    
    try {
      // Fetch journal entries
      let journalData = [];
      if (exportOptions.journalEntries) {
        const { data: entries, error: entriesError } = await supabase
          .from('journal_entries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (entriesError) throw entriesError;
        journalData = entries || [];
      }
      
      // Fetch mood data
      let moodData = [];
      if (exportOptions.moodData) {
        const { data: moods, error: moodsError } = await supabase
          .from('mood_records')
          .select('*')
          .eq('user_id', user.id)
          .order('recorded_at', { ascending: false });
          
        if (moodsError) throw moodsError;
        moodData = moods || [];
      }
      
      // Fetch user profile
      let profileData = null;
      if (exportOptions.userProfile) {
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (profileError && profileError.code !== 'PGRST116') throw profileError;
        profileData = profile || null;
      }
      
      // Combine all data
      const exportData = {
        user_id: user.id,
        export_date: new Date().toISOString(),
        journal_entries: exportOptions.journalEntries ? journalData : [],
        mood_data: exportOptions.moodData ? moodData : [],
        user_profile: exportOptions.userProfile ? profileData : null
      };
      
      // Convert to selected format and download
      let dataStr, filename, mimeType;
      
      if (exportFormat === 'json') {
        dataStr = JSON.stringify(exportData, null, 2);
        filename = `innerline-data-export-${new Date().toISOString().split('T')[0]}.json`;
        mimeType = 'application/json';
      } else {
        // Convert to CSV (simplified version)
        let csvContent = "Journal Entries:\n";
        csvContent += "ID,Date,Content,Mood,Tags\n";
        
        journalData.forEach(entry => {
          csvContent += `${entry.id},${entry.created_at},"${entry.content.replace(/"/g, '""')}",${entry.mood || ''},${entry.tags || ''}\n`;
        });
        
        csvContent += "\n\nMood Data:\n";
        csvContent += "ID,Date,Mood,Notes\n";
        
        moodData.forEach(mood => {
          csvContent += `${mood.id},${mood.recorded_at},${mood.mood_value},"${mood.notes?.replace(/"/g, '""') || ''}"\n`;
        });
        
        dataStr = csvContent;
        filename = `innerline-data-export-${new Date().toISOString().split('T')[0]}.csv`;
        mimeType = 'text/csv';
      }
      
      // Create download link
      const blob = new Blob([dataStr], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again later.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || !deletePassword) return;
    
    setIsDeleting(true);
    
    try {
      // First authenticate the user to confirm identity
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: deletePassword
      });
      
      if (authError) throw new Error('Password verification failed. Please enter your correct password.');
      
      // Delete journal entries
      const { error: journalError } = await supabase
        .from('journal_entries')
        .delete()
        .eq('user_id', user.id);
        
      if (journalError) throw journalError;
      
      // Delete mood records
      const { error: moodError } = await supabase
        .from('mood_records')
        .delete()
        .eq('user_id', user.id);
        
      if (moodError) throw moodError;
      
      // Delete user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .delete()
        .eq('user_id', user.id);
        
      if (profileError) throw profileError;
      
      // Finally delete the user account
      const { error: userError } = await supabase.auth.admin.deleteUser(user.id);
      
      if (userError) throw userError;
      
      // Sign out
      await supabase.auth.signOut();
      
      // Redirect to home page
      window.location.href = '/';
      
    } catch (error) {
      console.error('Account deletion failed:', error);
      alert(`Failed to delete account: ${error.message}`);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium text-foreground">My Data</h2>
          <p className="text-sm text-muted-foreground">
            Control, export, and manage your personal data
          </p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-muted/50 rounded-full">
          <Icon name="Lock" size={14} className="text-success" />
          <span className="text-xs font-caption text-muted-foreground">End-to-End Encrypted</span>
        </div>
      </div>

      {/* Data Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-muted/30 rounded-organic p-4 flex items-center space-x-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="BookOpen" size={20} className="text-primary" />
          </div>
          <div>
            <div className="text-2xl font-medium">45</div>
            <div className="text-sm text-muted-foreground">Journal Entries</div>
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-organic p-4 flex items-center space-x-4">
          <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="Heart" size={20} className="text-success" />
          </div>
          <div>
            <div className="text-2xl font-medium">38</div>
            <div className="text-sm text-muted-foreground">Mood Records</div>
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-organic p-4 flex items-center space-x-4">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="Calendar" size={20} className="text-accent" />
          </div>
          <div>
            <div className="text-2xl font-medium">52</div>
            <div className="text-sm text-muted-foreground">Days Active</div>
          </div>
        </div>
      </div>

      {/* Export Data Section */}
      <div className="bg-white rounded-organic p-6 shadow-therapeutic">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Download" size={18} className="text-success" />
          <h3 className="font-medium text-foreground">Export Your Data</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Download a copy of your data in your preferred format
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Format
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="json"
                  checked={exportFormat === 'json'}
                  onChange={() => setExportFormat('json')}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground">JSON</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={() => setExportFormat('csv')}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground">CSV</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              What to include
            </label>
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
                label="User Profile"
                description="Your account information and preferences"
                checked={exportOptions.userProfile}
                onChange={(e) => handleExportOptionChange('userProfile', e.target.checked)}
              />
              <Checkbox
                label="AI Insights"
                description="Generated insights and patterns from your data"
                checked={exportOptions.insights}
                onChange={(e) => handleExportOptionChange('insights', e.target.checked)}
              />
            </div>
          </div>
          
          <div className="pt-2">
            <Button
              onClick={handleExportData}
              disabled={isExporting || !Object.values(exportOptions).some(v => v)}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              {isExporting ? 'Preparing Export...' : 'Export Data'}
            </Button>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-muted/30 rounded-organic">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Info" size={14} className="text-muted-foreground" />
            <p className="text-muted-foreground">
              Your exported data is processed locally and never shared with third parties.
              Keep your downloaded files secure as they contain personal information.
            </p>
          </div>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="bg-white rounded-organic p-6 shadow-therapeutic border border-error/20">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Trash2" size={18} className="text-error" />
          <h3 className="font-medium text-foreground">Delete Your Account</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete your account and all associated data
        </p>
        
        {!showDeleteConfirm ? (
          <Button
            variant="danger"
            onClick={() => setShowDeleteConfirm(true)}
            iconName="Trash2"
            iconPosition="left"
          >
            Delete My Account
          </Button>
        ) : (
          <div className="border border-error/20 rounded-organic p-4 bg-error/5">
            <h4 className="font-medium text-error mb-2">⚠️ This action cannot be undone</h4>
            <ul className="text-sm text-muted-foreground space-y-1 mb-4">
              <li>• All journal entries will be permanently deleted</li>
              <li>• Mood data and insights will be removed</li>
              <li>• Your account will be deactivated immediately</li>
            </ul>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Enter your password to confirm
              </label>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-organic focus:outline-none focus:ring-error focus:border-error"
                placeholder="Your password"
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletePassword('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteAccount}
                disabled={isDeleting || !deletePassword}
                loading={isDeleting}
              >
                Permanently Delete Account
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Privacy Rights Section */}
      <div className="bg-white rounded-organic p-6 shadow-therapeutic">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={18} className="text-primary" />
          <h3 className="font-medium text-foreground">Your Privacy Rights</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex space-x-4 items-start">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Eye" size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Right to Access</h4>
              <p className="text-sm text-muted-foreground">
                You can export and download all your personal data at any time
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4 items-start">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Edit" size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Right to Rectification</h4>
              <p className="text-sm text-muted-foreground">
                You can update or correct your personal information in account settings
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4 items-start">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Trash" size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Right to Erasure</h4>
              <p className="text-sm text-muted-foreground">
                You can delete your account and all associated data at any time
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4 items-start">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Lock" size={16} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Data Security</h4>
              <p className="text-sm text-muted-foreground">
                Your journal entries and personal data are encrypted and stored securely
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDataTab;