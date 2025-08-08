import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Smartphone, 
  Moon, 
  Sun, 
  Monitor,
  Save,
  Lock,
  Eye,
  EyeOff,
  Camera,
  Edit,
  Trash2,
  Download,
  Upload
} from 'lucide-react';

import { useAuthStore } from '../stores/authStore';
import DashboardLayout from '../components/DashboardLayout';

const Settings: React.FC = () => {
  const { user, updateUser, updatePreferences } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'preferences', label: 'Preferences', icon: <SettingsIcon className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'integrations', label: 'Integrations', icon: <Smartphone className="w-5 h-5" /> }
  ];

  const handleSave = () => {
    // Simulate saving
    setTimeout(() => {
      alert('Settings saved successfully!');
    }, 500);
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Photo</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{user?.name?.charAt(0)}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-0 p-2 bg-aurora-green rounded-full text-white hover:bg-aurora-blue transition-colors"
            >
              <Camera className="w-4 h-4" />
            </motion.button>
          </div>
          <div>
            <p className="text-white font-medium mb-2">Upload a new photo</p>
            <p className="text-gray-400 text-sm mb-4">JPG, PNG or GIF, max 5MB</p>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-glass-accent transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-aurora-pink hover:text-aurora-purple transition-colors px-4 py-2"
              >
                Remove
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue={user?.name}
              className="w-full bg-glass-dark border border-glass-secondary rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full bg-glass-dark border border-glass-secondary rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
            <input
              type="text"
              defaultValue="Project Manager"
              className="w-full bg-glass-dark border border-glass-secondary rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors"
              placeholder="Enter your job title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
            <select className="w-full bg-glass-dark border border-glass-secondary rounded-lg px-4 py-3 text-white focus:outline-none focus:border-aurora-green transition-colors">
              <option>Product</option>
              <option>Engineering</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      {/* Theme Settings */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'light', label: 'Light', icon: <Sun className="w-6 h-6" /> },
            { id: 'dark', label: 'Dark', icon: <Moon className="w-6 h-6" /> },
            { id: 'auto', label: 'Auto', icon: <Monitor className="w-6 h-6" /> }
          ].map((theme) => (
            <motion.div
              key={theme.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`glass rounded-lg p-4 cursor-pointer border-2 transition-colors ${
                user?.preferences?.theme === theme.id
                  ? 'border-aurora-green'
                  : 'border-glass-secondary hover:border-glass-accent'
              }`}
              onClick={() => updatePreferences({ theme: theme.id as any })}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`${user?.preferences?.theme === theme.id ? 'text-aurora-green' : 'text-gray-400'}`}>
                  {theme.icon}
                </div>
                <span className="text-white font-medium">{theme.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Color Scheme */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Accent Color</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {[
            'from-aurora-green to-aurora-blue',
            'from-aurora-purple to-aurora-pink',
            'from-aurora-yellow to-aurora-green',
            'from-aurora-blue to-aurora-purple',
            'from-aurora-pink to-aurora-yellow',
            'from-red-500 to-pink-500',
            'from-blue-500 to-cyan-500',
            'from-green-500 to-emerald-500'
          ].map((gradient, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg cursor-pointer border-2 border-glass-secondary hover:border-white transition-colors`}
            />
          ))}
        </div>
      </div>

      {/* Animation Settings */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Animations</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Enable Animations</p>
              <p className="text-gray-400 text-sm">Turn off to improve performance</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => updatePreferences({ animations: !user?.preferences?.animations })}
              className={`w-12 h-6 rounded-full transition-colors ${
                user?.preferences?.animations ? 'bg-aurora-green' : 'bg-gray-600'
              }`}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full m-0.5"
                animate={{ x: user?.preferences?.animations ? 24 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
        <div className="space-y-6">
          {[
            { id: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
            { id: 'push', label: 'Push Notifications', description: 'Browser push notifications' },
            { id: 'sound', label: 'Sound Effects', description: 'Play sounds for notifications' },
            { id: 'desktop', label: 'Desktop Alerts', description: 'Show desktop notifications' }
          ].map((setting) => (
            <div key={setting.id} className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{setting.label}</p>
                <p className="text-gray-400 text-sm">{setting.description}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-12 h-6 bg-aurora-green rounded-full"
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full m-0.5"
                  animate={{ x: 24 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      {/* Password */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full bg-glass-dark border border-glass-secondary rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors"
                placeholder="Enter current password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              className="w-full bg-glass-dark border border-glass-secondary rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full bg-glass-dark border border-glass-secondary rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-aurora-green transition-colors"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Enable 2FA</p>
            <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neo-button px-4 py-2 rounded-lg"
          >
            Enable
          </motion.button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'appearance':
        return renderAppearanceTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'security':
        return renderSecurityTab();
      default:
        return (
          <div className="glass rounded-xl p-6 text-center">
            <p className="text-gray-400">Settings for {activeTab} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Settings</h1>
              <p className="text-gray-300">Customize your experience</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="neo-button px-6 py-3 rounded-xl flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-xl p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-aurora-green to-aurora-blue text-white'
                        : 'text-gray-300 hover:text-white hover:bg-glass-accent'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings; 