import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const SecuritySection = ({ onUpdateSecurity }) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);

  const activeSessions = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'New York, NY',
      lastActive: '2025-07-15T11:30:00Z',
      current: true,
      ip: '192.168.1.100'
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'New York, NY',
      lastActive: '2025-07-14T20:15:00Z',
      current: false,
      ip: '192.168.1.101'
    },
    {
      id: 3,
      device: 'Firefox on MacOS',
      location: 'New York, NY',
      lastActive: '2025-07-13T14:22:00Z',
      current: false,
      ip: '192.168.1.102'
    }
  ];

  const loginHistory = [
    {
      id: 1,
      timestamp: '2025-07-15T08:30:00Z',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      status: 'success',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      timestamp: '2025-07-14T19:45:00Z',
      device: 'Safari on iPhone',
      location: 'New York, NY',
      status: 'success',
      ip: '192.168.1.101'
    },
    {
      id: 3,
      timestamp: '2025-07-13T12:15:00Z',
      device: 'Firefox on MacOS',
      location: 'New York, NY',
      status: 'failed',
      ip: '192.168.1.102'
    }
  ];

  const handleEnable2FA = async () => {
    setIsEnabling2FA(true);
    try {
      // Mock 2FA setup process
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTwoFactorEnabled(true);
      onUpdateSecurity({ twoFactorEnabled: true });
    } catch (error) {
      console.error('Failed to enable 2FA:', error);
    } finally {
      setIsEnabling2FA(false);
    }
  };

  const handleDisable2FA = () => {
    setTwoFactorEnabled(false);
    onUpdateSecurity({ twoFactorEnabled: false });
  };

  const handleTerminateSession = (sessionId) => {
    // Mock session termination
    console.log('Terminating session:', sessionId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDeviceIcon = (device) => {
    if (device.includes('iPhone') || device.includes('Safari')) return 'Smartphone';
    if (device.includes('Chrome')) return 'Monitor';
    if (device.includes('Firefox')) return 'Laptop';
    return 'Monitor';
  };

  return (
    <div className="bg-card rounded-organic-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Lock" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground">Security Settings</h3>
          <p className="text-sm text-muted-foreground">Manage your account security and access</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Two-Factor Authentication */}
        <div className="p-4 bg-muted/30 rounded-organic border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={18} className="text-primary" />
              <div>
                <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-caption ${
              twoFactorEnabled 
                ? 'bg-success/20 text-success' :'bg-warning/20 text-warning'
            }`}>
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </div>
          </div>

          {!twoFactorEnabled ? (
            <div className="space-y-3">
              <div className="p-3 bg-warning/10 rounded-organic">
                <p className="text-sm text-muted-foreground">
                  Protect your mental health data with two-factor authentication. 
                  This adds an extra security step when logging in.
                </p>
              </div>
              <Button
                variant="primary"
                onClick={handleEnable2FA}
                loading={isEnabling2FA}
                iconName="Shield"
                iconPosition="left"
                size="sm"
              >
                {isEnabling2FA ? 'Setting up...' : 'Enable 2FA'}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-success/10 rounded-organic">
                <p className="text-sm text-muted-foreground">
                  Two-factor authentication is active. Your account is protected with an additional security layer.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleDisable2FA}
                iconName="ShieldOff"
                iconPosition="left"
                size="sm"
              >
                Disable 2FA
              </Button>
            </div>
          )}
        </div>

        {/* Active Sessions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Monitor" size={18} className="text-primary" />
              <span>Active Sessions</span>
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSessions(!showSessions)}
              iconName={showSessions ? 'ChevronUp' : 'ChevronDown'}
              iconPosition="right"
            >
              {showSessions ? 'Hide' : 'Show'} Sessions
            </Button>
          </div>

          {showSessions && (
            <div className="space-y-3">
              {activeSessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-4 rounded-organic border transition-therapeutic ${
                    session.current 
                      ? 'bg-primary/5 border-primary/20' :'bg-card border-border hover:shadow-therapeutic-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon name={getDeviceIcon(session.device)} size={20} className="text-muted-foreground" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-foreground">{session.device}</p>
                          {session.current && (
                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-caption">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {session.location} • Last active {formatDate(session.lastActive)}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">{session.ip}</p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTerminateSession(session.id)}
                        iconName="X"
                        className="text-destructive hover:text-destructive"
                      >
                        End
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Login History */}
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="History" size={18} className="text-primary" />
            <span>Recent Login Activity</span>
          </h4>
          
          <div className="space-y-2">
            {loginHistory.slice(0, 5).map((login) => (
              <div
                key={login.id}
                className="flex items-center justify-between p-3 bg-muted/20 rounded-organic"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    login.status === 'success' ? 'bg-success' : 'bg-destructive'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{login.device}</p>
                    <p className="text-xs text-muted-foreground">
                      {login.location} • {formatDate(login.timestamp)}
                    </p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-caption ${
                  login.status === 'success' ?'bg-success/20 text-success' :'bg-destructive/20 text-destructive'
                }`}>
                  {login.status === 'success' ? 'Success' : 'Failed'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-organic">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={18} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-2">Security Recommendations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use a strong, unique password for your account</li>
                <li>• Enable two-factor authentication for enhanced security</li>
                <li>• Regularly review your active sessions and login history</li>
                <li>• Log out from devices you no longer use</li>
                <li>• Keep your recovery information up to date</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;