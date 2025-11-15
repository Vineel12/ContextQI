import { ArrowLeft } from 'lucide-react';
import { Screen } from '../App';

interface HelpSupportScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HelpSupportScreen({ onNavigate }: HelpSupportScreenProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="h-8" />
      <div className="px-6 py-4 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('settings')} className="w-11 h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl text-white">Help & Support</h1>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-4">
        <div className="bg-slate-800/80 rounded-2xl p-5 space-y-2">
          <p className="text-slate-300 text-sm">FAQs: How to connect platforms, manage notifications, and view insights.</p>
          <a href="mailto:support@contextiq.example" className="inline-block bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-500/90 text-white px-4 py-3 rounded-xl transition-colors">Email Support</a>
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
