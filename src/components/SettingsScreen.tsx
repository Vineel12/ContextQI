import { ArrowLeft, User, Bell, Shield, HelpCircle, LogOut, ChevronRight, Moon, Globe } from 'lucide-react';
import { Screen } from '../App';
import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { connectDiscord, getApiBase } from '../lib/api';
 

interface SettingsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const settings = useSettings();
  const [notifications, setNotifications] = useState(settings.notifications);
  const [darkMode, setDarkMode] = useState(settings.darkMode);
  const [language, setLanguage] = useState(settings.language);
  // Navigates to dedicated pages for profile, privacy, help

  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');

  // Connected platforms local state
  
  const base = getApiBase();


  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      onNavigate('welcome');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Status Bar */}
      <div className="h-8" />

      {/* Header */}
      <div className="px-6 py-4 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-11 h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl text-white">Settings</h1>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-6">
        {/* Profile Section */}
        <div>
          <h3 className="text-slate-400 text-sm mb-3 px-2">Profile</h3>
          <div className="bg-slate-800/80 rounded-2xl overflow-hidden">
            <button onClick={() => onNavigate('profile')} className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-700/50 active:bg-slate-600/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white text-sm">{name}</div>
                  <div className="text-slate-400 text-xs">{email}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="text-slate-400 text-sm mb-3 px-2">Preferences</h3>
          <div className="bg-slate-800/80 rounded-2xl overflow-hidden divide-y divide-slate-700/50">
            {/* Notifications Toggle */}
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-white text-sm">Notifications</div>
                  <div className="text-slate-400 text-xs">Push notifications</div>
                </div>
              </div>
              <button
                onClick={() => { const v = !notifications; setNotifications(v); settings.setNotifications(v); }}
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  notifications ? 'bg-indigo-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Moon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-white text-sm">Dark Mode</div>
                  <div className="text-slate-400 text-xs">Theme preference</div>
                </div>
              </div>
              <button
                onClick={() => { const v = !darkMode; setDarkMode(v); settings.setDarkMode(v); }}
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  darkMode ? 'bg-indigo-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Language Selector */}
            <button
              onClick={() => {
                const languages = ['English', 'Spanish', 'French', 'German', 'Japanese'];
                const currentIndex = languages.indexOf(language);
                const nextIndex = (currentIndex + 1) % languages.length;
                const next = languages[nextIndex];
                setLanguage(next);
                settings.setLanguage(next);
              }}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-700/50 active:bg-slate-600/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-left">
                  <div className="text-white text-sm">Language</div>
                  <div className="text-slate-400 text-xs">{language}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Connected Platforms (Discord only) */}
        <div>
          <h3 className="text-slate-400 text-sm mb-3 px-2">Connected Platforms</h3>
          <div className="bg-slate-800/80 rounded-2xl p-5">
            <div className="space-y-3">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs">D</span>
                  </div>
                  <span className="text-white text-sm">Discord</span>
                </div>
                <button
                  onClick={() => (base ? connectDiscord() : alert('Set VITE_API_BASE_URL to enable Discord connect'))}
                  className="text-indigo-400 text-xs hover:text-indigo-300 transition-colors"
                >
                  Connect
                </button>
              </div>
              
            </div>
          </div>
        </div>

        {/* Other Options */}
        <div>
          <h3 className="text-slate-400 text-sm mb-3 px-2">Other</h3>
          <div className="bg-slate-800/80 rounded-2xl overflow-hidden divide-y divide-slate-700/50">
            <button onClick={() => onNavigate('privacy')} className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-700/50 active:bg-slate-600/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-orange-400" />
                </div>
                <span className="text-white text-sm">Privacy & Security</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </button>

            <button onClick={() => onNavigate('help')} className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-700/50 active:bg-slate-600/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-white text-sm">Help & Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 border border-red-500/30 text-red-400 py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>

        <p className="text-slate-500 text-xs text-center">
          ContextIQ v1.0.0
        </p>
      </div>

      {/* Bottom Spacing */}
      <div className="h-8" />

      {/* Navigates to dedicated pages */}
    </div>
  );
}
