import { ArrowLeft } from 'lucide-react';
import { Screen } from '../App';

interface PrivacySecurityScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function PrivacySecurityScreen({ onNavigate }: PrivacySecurityScreenProps) {
  // Placeholder actions for now; could dispatch to app state later
  const disconnectAll = () => {
    // no-op in this demo page; actions handled in Settings
  };
  const disableNotifications = () => {
    // no-op in this demo page; actions handled in Settings
  };
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="h-8" />
      <div className="px-6 py-4 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('settings')} className="w-11 h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl text-white">Privacy & Security</h1>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-4">
        <div className="bg-slate-800/80 rounded-2xl p-5 space-y-3">
          <p className="text-slate-300 text-sm">Manage your data and security preferences.</p>
          <button onClick={disconnectAll} className="w-full border border-slate-700/50 text-slate-200 py-3 rounded-xl hover:bg-slate-800 active:bg-slate-800/80 transition-colors">
            Disconnect all platforms
          </button>
          <button onClick={disableNotifications} className="w-full border border-slate-700/50 text-slate-200 py-3 rounded-xl hover:bg-slate-800 active:bg-slate-800/80 transition-colors">
            Disable notifications
          </button>
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
