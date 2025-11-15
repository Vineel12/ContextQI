import { ArrowLeft, FileText } from 'lucide-react';
import { Screen } from '../App';
import { SummaryCard } from './SummaryCard';
import { useState } from 'react';

interface SummariesScreenProps {
  onNavigate: (screen: Screen) => void;
}

const summaries = [
  { id: '1', title: 'Engineering Team Daily Sync', content: 'Discussed dashboard redesign, frontend implementation timeline, and upcoming sprint goals.', channel: 'engineering-team', date: 'Today' },
  { id: '2', title: 'Product Strategy Meeting', content: 'Reviewed Q4 roadmap, prioritized features for next release, and aligned on user feedback integration.', channel: 'product-design', date: 'Yesterday' },
  { id: '3', title: 'Marketing Campaign Review', content: 'Analyzed campaign performance metrics, discussed content strategy, and planned social media calendar.', channel: 'marketing', date: 'Nov 13' },
  { id: '4', title: 'Customer Success Standup', content: 'Reviewed open support tickets, discussed customer satisfaction scores, and planned outreach initiatives.', channel: 'customer-success', date: 'Nov 12' },
  { id: '5', title: 'Sales Team Weekly Review', content: 'Analyzed Q4 pipeline, discussed deal progression, and strategized on closing opportunities.', channel: 'sales-team', date: 'Nov 11' },
];

export function SummariesScreen({ onNavigate }: SummariesScreenProps) {
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
            <h1 className="text-2xl text-white">Summaries</h1>
            <p className="text-slate-400 text-sm">{summaries.length} conversation summaries</p>
          </div>
        </div>

        {/* Header Card */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-3xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white mb-1">AI-Generated Summaries</h3>
              <p className="text-slate-300 text-sm">Quick overviews of team conversations</p>
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
            All Summaries
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

      {/* Summaries List */}
      <div className="px-6 pb-8">
        <div className="space-y-4">
          {summaries.map((summary) => (
            <SummaryCard
              key={summary.id}
              title={summary.title}
              content={summary.content}
              channel={summary.channel}
              date={summary.date}
            />
          ))}
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </div>
  );
}
