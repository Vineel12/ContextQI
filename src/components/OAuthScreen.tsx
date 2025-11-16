import { ArrowLeft, Check } from 'lucide-react';
import { Screen } from '../App';
import { useState } from 'react';

interface OAuthScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface ConnectionState {
  discord: boolean;
}

export function OAuthScreen({ onNavigate }: OAuthScreenProps) {
  const [connected, setConnected] = useState<ConnectionState>({
    discord: false,
  });

  const toggleConnection = (platform: keyof ConnectionState) => {
    setConnected(prev => ({ ...prev, [platform]: !prev[platform] }));
  };

  const handleContinue = () => {
    if (Object.values(connected).some(val => val)) {
      onNavigate('dashboard');
    }
  };

  const hasConnection = Object.values(connected).some(val => val);

  return (
    <div className="min-h-screen p-6 flex flex-col bg-slate-950">
      {/* Status Bar */}
      <div className="h-8" />

      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => onNavigate('welcome')}
          className="w-11 h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">Connect Platforms</h1>
        <p className="text-slate-400">
          Link your communication platforms to start analyzing conversations
        </p>
      </div>

      {/* Connection Cards */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {/* Slack and Teams removed */}

        {/* Discord Card */}
        <div className="bg-slate-800/80 rounded-3xl p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-1">Discord</h3>
              <p className="text-slate-400 text-sm">
                Connect your Discord server
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleConnection('discord')}
            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-colors ${
              connected.discord
                ? 'bg-green-500/20 text-green-400'
                : 'bg-slate-700/50 hover:bg-slate-700 text-white'
            }`}
          >
            {connected.discord && <Check className="w-5 h-5" />}
            {connected.discord ? 'Connected' : 'Connect Discord'}
          </button>
        </div>

        {/* Gmail card removed */}

        <div className="bg-slate-800/50 rounded-2xl p-4">
          <p className="text-slate-400 text-sm text-center">
            🔒 Your data is encrypted and never shared
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!hasConnection}
        className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors mb-8 mt-6 ${
          hasConnection
            ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
            : 'bg-slate-800/50 text-slate-500 cursor-not-allowed'
        }`}
      >
        Continue
      </button>
    </div>
  );
}
