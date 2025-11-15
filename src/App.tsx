import { useState } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import { WelcomeScreen } from './components/WelcomeScreen';
import { OAuthScreen } from './components/OAuthScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ChannelListScreen } from './components/ChannelListScreen';
import { ChannelDetailScreen } from './components/ChannelDetailScreen';
import { InsightsScreen } from './components/InsightsScreen';
import { DecisionsScreen } from './components/DecisionsScreen';
import { SummariesScreen } from './components/SummariesScreen';
import { AIQueryScreen } from './components/AIQueryScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { PrivacySecurityScreen } from './components/PrivacySecurityScreen';
import { HelpSupportScreen } from './components/HelpSupportScreen';

export type Screen = 
  | 'welcome'
  | 'oauth'
  | 'dashboard'
  | 'channels'
  | 'channel-detail'
  | 'insights'
  | 'decisions'
  | 'summaries'
  | 'ai-query'
  | 'settings'
  | 'profile'
  | 'privacy'
  | 'help';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const navigateTo = (screen: Screen, channelId?: string) => {
    if (channelId) setSelectedChannel(channelId);
    setCurrentScreen(screen);
  };

  return (
    <SettingsProvider>
      <div className="min-h-screen">
        <div className="mx-auto max-w-md min-h-screen">
        {currentScreen === 'welcome' && <WelcomeScreen onNavigate={navigateTo} />}
        {currentScreen === 'oauth' && <OAuthScreen onNavigate={navigateTo} />}
        {currentScreen === 'dashboard' && <DashboardScreen onNavigate={navigateTo} />}
        {currentScreen === 'channels' && <ChannelListScreen onNavigate={navigateTo} />}
        {currentScreen === 'channel-detail' && <ChannelDetailScreen onNavigate={navigateTo} channelId={selectedChannel} />}
        {currentScreen === 'insights' && <InsightsScreen onNavigate={navigateTo} />}
        {currentScreen === 'decisions' && <DecisionsScreen onNavigate={navigateTo} />}
        {currentScreen === 'summaries' && <SummariesScreen onNavigate={navigateTo} />}
        {currentScreen === 'ai-query' && <AIQueryScreen onNavigate={navigateTo} />}
        {currentScreen === 'settings' && <SettingsScreen onNavigate={navigateTo} />}
        {currentScreen === 'profile' && <ProfileScreen onNavigate={navigateTo} />}
        {currentScreen === 'privacy' && <PrivacySecurityScreen onNavigate={navigateTo} />}
        {currentScreen === 'help' && <HelpSupportScreen onNavigate={navigateTo} />}
        </div>
      </div>
    </SettingsProvider>
  );
}
