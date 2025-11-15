import { ArrowLeft, Lightbulb } from 'lucide-react';
import { Screen } from '../App';
import { DecisionCard } from './DecisionCard';
import { useState } from 'react';

interface DecisionsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const decisions = [
  { id: '1', title: 'Use glassmorphism for new UI design', channel: 'product-design', date: 'Today, 10:26 AM' },
  { id: '2', title: 'Review meeting scheduled for tomorrow at 2pm', channel: 'engineering-team', date: 'Today, 10:28 AM' },
  { id: '3', title: 'Switch to monthly sprint cycles', channel: 'engineering-team', date: 'Yesterday' },
  { id: '4', title: 'Hire 2 more designers for Q1', channel: 'general', date: 'Nov 13' },
  { id: '5', title: 'Migrate to new cloud infrastructure', channel: 'dev-ops', date: 'Nov 12' },
  { id: '6', title: 'Launch beta testing program', channel: 'product-design', date: 'Nov 10' },
  { id: '7', title: 'Increase marketing budget by 20%', channel: 'marketing', date: 'Nov 9' },
  { id: '8', title: 'Implement new customer feedback system', channel: 'customer-success', date: 'Nov 8' },
];

export function DecisionsScreen({ onNavigate }: DecisionsScreenProps) {
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('all');

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Status Bar */}
      <div className="h-8" />

      {/* Header */}
      <div className="px-6 py-4 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => onNavigate('insights')}
            className="w-11 h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl text-white">Key Decisions</h1>
            <p className="text-slate-400 text-sm">{decisions.length} decisions tracked</p>
          </div>
        </div>

        {/* Header Card */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-3xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white mb-1">Important Decisions</h3>
              <p className="text-slate-300 text-sm">Track key team decisions and outcomes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 mb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-indigo-500 text-white'
                : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-400'
            }`}
          >
            All Decisions
          </button>
          <button
            onClick={() => setFilter('week')}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
              filter === 'week'
                ? 'bg-indigo-500 text-white'
                : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-400'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setFilter('month')}
            className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
              filter === 'month'
                ? 'bg-indigo-500 text-white'
                : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-400'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Decisions List */}
      <div className="px-6 pb-8">
        <div className="space-y-3">
          {decisions.map((decision) => (
            <DecisionCard
              key={decision.id}
              title={decision.title}
              channel={decision.channel}
              date={decision.date}
            />
          ))}
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </div>
  );
}
