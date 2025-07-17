import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CrisisSettings = ({ settings, onUpdateSettings }) => {
  const [crisisSettings, setCrisisSettings] = useState({
    emergencyContactName: settings?.emergencyContactName || '',
    emergencyContactPhone: settings?.emergencyContactPhone || '',
    preferredHelpline: settings?.preferredHelpline || 'national',
    autoTriggerEnabled: settings?.autoTriggerEnabled ?? true,
    immediateResponse: settings?.immediateResponse ?? true,
    shareWithContact: settings?.shareWithContact ?? false,
    crisisKeywords: settings?.crisisKeywords ?? true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const helplineOptions = [
    { 
      value: 'national', 
      label: 'National Suicide Prevention Lifeline (988)',
      description: '24/7 crisis support nationwide'
    },
    { 
      value: 'crisis-text', 
      label: 'Crisis Text Line (Text HOME to 741741)',
      description: 'Text-based crisis support'
    },
    { 
      value: 'local', 
      label: 'Local Crisis Center',
      description: 'Regional crisis support services'
    },
    { 
      value: 'custom', 
      label: 'Custom Helpline',
      description: 'Your preferred crisis support number'
    }
  ];

  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 crisis support and suicide prevention',
      availability: 'Available 24/7'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free, confidential crisis support via text',
      availability: 'Available 24/7'
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-4357',
      description: 'Mental health and substance abuse support',
      availability: 'Available 24/7'
    },
    {
      name: 'National Domestic Violence Hotline',
      number: '1-800-799-7233',
      description: 'Support for domestic violence situations',
      availability: 'Available 24/7'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCrisisSettings(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (key, value) => {
    setCrisisSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (crisisSettings.emergencyContactName && !crisisSettings.emergencyContactPhone) {
      newErrors.emergencyContactPhone = 'Phone number is required when contact name is provided';
    }
    
    if (crisisSettings.emergencyContactPhone && !/^\+?[\d\s\-\(\)]+$/.test(crisisSettings.emergencyContactPhone)) {
      newErrors.emergencyContactPhone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    onUpdateSettings(crisisSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCrisisSettings({
      emergencyContactName: settings?.emergencyContactName || '',
      emergencyContactPhone: settings?.emergencyContactPhone || '',
      preferredHelpline: settings?.preferredHelpline || 'national',
      autoTriggerEnabled: settings?.autoTriggerEnabled ?? true,
      immediateResponse: settings?.immediateResponse ?? true,
      shareWithContact: settings?.shareWithContact ?? false,
      crisisKeywords: settings?.crisisKeywords ?? true
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-organic-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
            <Icon name="Heart" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">Crisis Support Settings</h3>
            <p className="text-sm text-muted-foreground">Configure emergency response preferences</p>
          </div>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Crisis Detection Settings */}
        <div className="p-4 bg-warning/5 border border-warning/20 rounded-organic">
          <h4 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="AlertTriangle" size={18} className="text-warning" />
            <span>Crisis Detection</span>
          </h4>
          
          <div className="space-y-4">
            <Checkbox
              label="Automatic Crisis Detection"
              description="Monitor journal entries for signs of distress and provide immediate support"
              checked={crisisSettings.autoTriggerEnabled}
              onChange={(e) => handleCheckboxChange('autoTriggerEnabled', e.target.checked)}
              disabled={!isEditing}
            />
            
            <Checkbox
              label="Immediate Response Mode"
              description="Show crisis resources immediately when distress is detected"
              checked={crisisSettings.immediateResponse}
              onChange={(e) => handleCheckboxChange('immediateResponse', e.target.checked)}
              disabled={!isEditing}
            />
            
            <Checkbox
              label="Crisis Keyword Monitoring"
              description="Detect specific words and phrases that may indicate crisis"
              checked={crisisSettings.crisisKeywords}
              onChange={(e) => handleCheckboxChange('crisisKeywords', e.target.checked)}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Phone" size={18} className="text-primary" />
            <span>Emergency Contact (Optional)</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Contact Name"
              type="text"
              name="emergencyContactName"
              value={crisisSettings.emergencyContactName}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Enter contact name"
              description="Trusted person to contact in crisis"
            />
            
            <Input
              label="Contact Phone"
              type="tel"
              name="emergencyContactPhone"
              value={crisisSettings.emergencyContactPhone}
              onChange={handleInputChange}
              disabled={!isEditing}
              error={errors.emergencyContactPhone}
              placeholder="Enter phone number"
              description="Phone number for emergency contact"
            />
          </div>
          
          <Checkbox
            label="Share crisis alerts with emergency contact"
            description="Allow your emergency contact to be notified when crisis support is triggered"
            checked={crisisSettings.shareWithContact}
            onChange={(e) => handleCheckboxChange('shareWithContact', e.target.checked)}
            disabled={!isEditing}
          />
        </div>

        {/* Preferred Helpline */}
        <div>
          <Select
            label="Preferred Crisis Helpline"
            description="Choose your primary crisis support resource"
            options={helplineOptions}
            value={crisisSettings.preferredHelpline}
            onChange={(value) => setCrisisSettings(prev => ({ ...prev, preferredHelpline: value }))}
            disabled={!isEditing}
          />
        </div>

        {/* Crisis Resources */}
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Lifeline" size={18} className="text-success" />
            <span>Available Crisis Resources</span>
          </h4>
          
          <div className="grid gap-3">
            {crisisResources.map((resource, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted/20 rounded-organic border border-border/50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                    <Icon name="Phone" size={16} className="text-success" />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">{resource.name}</h5>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                    <p className="text-xs text-muted-foreground">{resource.availability}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-medium text-foreground">{resource.number}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.href = `tel:${resource.number.replace(/\D/g, '')}`}
                    iconName="ExternalLink"
                    className="text-xs"
                  >
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
              className="flex-1"
            >
              Save Settings
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              iconName="X"
              iconPosition="left"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        )}

        {/* Important Notice */}
        <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-organic">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={18} className="text-destructive mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Important Notice</h4>
              <p className="text-sm text-muted-foreground">
                If you're experiencing a mental health crisis or having thoughts of self-harm, 
                please reach out for immediate help. These automated systems are supportive tools 
                but cannot replace professional crisis intervention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisSettings;