import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Palette,
  Type,
  Moon,
  Sun,
  Volume2,
  Smartphone,
  Lock,
  Download,
  Trash2
} from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Accessibility
    textSize: [16],
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
    darkMode: false,
    
    // Privacy
    dataSharing: false,
    analytics: true,
    locationSharing: false,
    communityVisible: true,
    
    // Notifications
    dailyReminders: true,
    journalPrompts: true,
    wellnessCheckIns: true,
    communityUpdates: false,
    emergencyAlerts: true,
    
    // Audio
    soundEffects: true,
    voicePrompts: false,
    meditationSounds: true,
    
    // Data & Security
    biometricLock: false,
    autoBackup: true,
    offlineMode: false
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const accessibilityOptions = [
    {
      id: 'textSize',
      title: 'Text Size',
      description: 'Adjust text size for better readability',
      type: 'slider',
      icon: Type,
      value: settings.textSize,
      min: 12,
      max: 24,
      step: 1
    },
    {
      id: 'highContrast',
      title: 'High Contrast Mode',
      description: 'Increase contrast for better visibility',
      type: 'switch',
      icon: Eye,
      value: settings.highContrast
    },
    {
      id: 'reducedMotion',
      title: 'Reduce Motion',
      description: 'Minimize animations and transitions',
      type: 'switch',
      icon: Smartphone,
      value: settings.reducedMotion
    },
    {
      id: 'screenReader',
      title: 'Screen Reader Support',
      description: 'Enhanced accessibility for screen readers',
      type: 'switch',
      icon: Volume2,
      value: settings.screenReader
    }
  ];

  const privacyOptions = [
    {
      id: 'dataSharing',
      title: 'Anonymous Data Sharing',
      description: 'Help improve the app by sharing anonymous usage data',
      type: 'switch',
      value: settings.dataSharing
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Allow analytics to personalize your experience',
      type: 'switch',
      value: settings.analytics
    },
    {
      id: 'locationSharing',
      title: 'Location Services',
      description: 'Find nearby mental health resources',
      type: 'switch',
      value: settings.locationSharing
    },
    {
      id: 'communityVisible',
      title: 'Community Profile Visibility',
      description: 'Show your profile in the community section',
      type: 'switch',
      value: settings.communityVisible
    }
  ];

  const notificationOptions = [
    {
      id: 'dailyReminders',
      title: 'Daily Check-in Reminders',
      description: 'Gentle reminders to log your mood',
      value: settings.dailyReminders
    },
    {
      id: 'journalPrompts',
      title: 'Journal Prompts',
      description: 'Thoughtful prompts to inspire reflection',
      value: settings.journalPrompts
    },
    {
      id: 'wellnessCheckIns',
      title: 'Wellness Check-ins',
      description: 'Periodic wellness activity reminders',
      value: settings.wellnessCheckIns
    },
    {
      id: 'communityUpdates',
      title: 'Community Updates',
      description: 'New posts and community activity',
      value: settings.communityUpdates
    },
    {
      id: 'emergencyAlerts',
      title: 'Emergency Resource Alerts',
      description: 'Important safety and crisis resources',
      value: settings.emergencyAlerts
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl mb-2" style={{ color: 'var(--slate-blue)' }}>
          Settings & Personalization ⚙️
        </h1>
        <p className="text-gray-600">
          Customize your experience to feel safe, comfortable, and accessible.
        </p>
      </div>

      {/* Accessibility Settings */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Eye className="w-6 h-6" style={{ color: 'var(--slate-blue)' }} />
          <h2 className="text-lg" style={{ color: 'var(--slate-blue)' }}>
            Accessibility
          </h2>
        </div>

        <div className="space-y-6">
          {accessibilityOptions.map((option) => (
            <div key={option.id} className="flex items-center justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <option.icon className="w-5 h-5 mt-1 text-gray-500" />
                <div>
                  <h3 className="font-medium">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                  {option.type === 'slider' && (
                    <div className="mt-3 max-w-48">
                      <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>{option.min}px</span>
                        <span>{option.value[0]}px</span>
                        <span>{option.max}px</span>
                      </div>
                      <Slider
                        value={option.value}
                        onValueChange={(value) => updateSetting(option.id, value)}
                        max={option.max}
                        min={option.min}
                        step={option.step}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </div>
              {option.type === 'switch' && (
                <Switch
                  checked={option.value}
                  onCheckedChange={(value) => updateSetting(option.id, value)}
                />
              )}
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        {/* Theme Settings */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center space-x-2">
            <Palette className="w-5 h-5" style={{ color: 'var(--slate-blue)' }} />
            <span>Appearance</span>
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <Sun className="w-5 h-5 text-gray-500" />
                <Moon className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-600">Easier on the eyes in low light</p>
              </div>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={(value) => updateSetting('darkMode', value)}
            />
          </div>
        </div>
      </Card>

      {/* Privacy & Data */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="w-6 h-6" style={{ color: 'var(--slate-blue)' }} />
          <h2 className="text-lg" style={{ color: 'var(--slate-blue)' }}>
            Privacy & Data
          </h2>
        </div>

        <div className="space-y-6">
          {privacyOptions.map((option) => (
            <div key={option.id} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{option.title}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
              <Switch
                checked={option.value}
                onCheckedChange={(value) => updateSetting(option.id, value)}
              />
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h3 className="font-medium">Data Management</h3>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export My Data</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50">
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Bell className="w-6 h-6" style={{ color: 'var(--slate-blue)' }} />
          <h2 className="text-lg" style={{ color: 'var(--slate-blue)' }}>
            Notifications
          </h2>
        </div>

        <div className="space-y-6">
          {notificationOptions.map((option) => (
            <div key={option.id} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{option.title}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
              <Switch
                checked={option.value}
                onCheckedChange={(value) => updateSetting(option.id, value)}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Lock className="w-6 h-6" style={{ color: 'var(--slate-blue)' }} />
          <h2 className="text-lg" style={{ color: 'var(--slate-blue)' }}>
            Security & Backup
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Biometric Lock</h3>
              <p className="text-sm text-gray-600">Use fingerprint or face ID to secure the app</p>
            </div>
            <Switch
              checked={settings.biometricLock}
              onCheckedChange={(value) => updateSetting('biometricLock', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Auto Backup</h3>
              <p className="text-sm text-gray-600">Automatically backup your data to secure cloud storage</p>
            </div>
            <Switch
              checked={settings.autoBackup}
              onCheckedChange={(value) => updateSetting('autoBackup', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Offline Mode</h3>
              <p className="text-sm text-gray-600">Access key features without internet connection</p>
            </div>
            <Switch
              checked={settings.offlineMode}
              onCheckedChange={(value) => updateSetting('offlineMode', value)}
            />
          </div>
        </div>
      </Card>

      {/* Support & Information */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <User className="w-6 h-6" style={{ color: 'var(--slate-blue)' }} />
          <h2 className="text-lg" style={{ color: 'var(--slate-blue)' }}>
            Support & Information
          </h2>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            Help & FAQ
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Privacy Policy
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Terms of Service
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Contact Support
          </Button>
          <Button variant="outline" className="w-full justify-start">
            About Depresso
          </Button>
        </div>

        <Separator className="my-6" />

        <div className="text-center">
          <p className="text-sm text-gray-500">Version 1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">Built with care for your mental wellness</p>
        </div>
      </Card>

      {/* Save Changes */}
      <Card className="p-6 text-center">
        <Button 
          className="w-full max-w-md"
          style={{ backgroundColor: 'var(--coral-accent)' }}
        >
          Save All Changes
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Your preferences are automatically saved and synced across all your devices.
        </p>
      </Card>
    </div>
  );
};

export default Settings;