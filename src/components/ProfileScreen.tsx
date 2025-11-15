import { ArrowLeft } from 'lucide-react';
import { Screen } from '../App';
import { useState } from 'react';

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="h-8" />
      <div className="px-6 py-4 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('settings')} className="w-11 h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl text-white">Profile</h1>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-4">
        <div className="bg-slate-800/80 rounded-2xl p-5">
          <label className="block text-slate-300 text-sm mb-2">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl text-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/40" />
          <label className="block text-slate-300 text-sm mt-4 mb-2">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl text-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/40" />
          <button onClick={() => onNavigate('settings')} className="mt-5 w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-500/90 text-white py-3 rounded-xl transition-colors">Save</button>
        </div>
      </div>
      <div className="h-8" />
    </div>
  );
}
