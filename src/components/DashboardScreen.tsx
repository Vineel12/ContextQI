import { Brain, MessageSquare, CheckSquare, Menu, Search, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import { Screen } from '../App';
import { StatCard } from './StatCard';
import { ChannelCard } from './ChannelCard';

interface DashboardScreenProps {
  onNavigate: (screen: Screen) => void;
}

const recentChannels = [
  { id: '1', name: 'engineering-team', messages: 1247, platform: 'Slack', trend: 'up' as const, timeAgo: '2m ago' },
  { id: '2', name: 'product-design', messages: 892, platform: 'Slack', trend: 'up' as const, timeAgo: '15m ago' },
  { id: '3', name: 'marketing', messages: 654, platform: 'Teams', trend: 'stable' as const, timeAgo: '1h ago' },
];

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Status Bar */}
      <div className="h-8" />

      {/* Scrollable Content */}
      <div className="h-[calc(100vh-2rem)] overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl text-white mb-1">ContextIQ</h1>
              <p className="text-slate-400 text-sm">Good morning, John 👋</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('ai-query')}
                className="w-11 h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 flex items-center justify-center transition-colors"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => onNavigate('settings')}
                className="w-11 h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 flex items-center justify-center transition-colors"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Quick Actions Row */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
            <button
              onClick={() => onNavigate('channels')}
              className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-sm whitespace-nowrap flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Channels
            </button>
            <button
              onClick={() => onNavigate('insights')}
              className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 text-slate-300 text-sm whitespace-nowrap flex items-center gap-2 transition-colors"
            >
              <Brain className="w-4 h-4" />
              Insights
            </button>
            <button
              onClick={() => onNavigate('ai-query')}
              className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 text-slate-300 text-sm whitespace-nowrap flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              AI Chat
            </button>
          </div>
        </div>

        <div className="px-6 pb-8">
          {/* AI Summary Card */}
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-3xl p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white">Daily AI Summary</h3>
                  <span className="px-2 py-1 rounded-lg bg-green-500/20 text-green-400 text-xs">Live</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Your team discussed 3 major decisions and created 12 action items today across 8 channels.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('insights')}
              className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white transition-colors"
            >
              View Full Insights →
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatCard
              icon={MessageSquare}
              value="248"
              label="Messages Today"
              color="blue"
            />
            <StatCard
              icon={CheckSquare}
              value="12"
              label="Active Tasks"
              color="purple"
            />
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-slate-800/80 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-500/10 rounded-xl mx-auto mb-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-white text-lg mb-1">↑ 24%</div>
              <div className="text-slate-400 text-xs">Activity</div>
            </div>
            <div className="bg-slate-800/80 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-500/10 rounded-xl mx-auto mb-2">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-white text-lg mb-1">24</div>
              <div className="text-slate-400 text-xs">Members</div>
            </div>
            <div className="bg-slate-800/80 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-orange-500/10 rounded-xl mx-auto mb-2">
                <Zap className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-white text-lg mb-1">8</div>
              <div className="text-slate-400 text-xs">Channels</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">Recent Activity</h3>
              <button 
                onClick={() => onNavigate('channels')}
                className="text-indigo-400 text-sm hover:text-indigo-300 active:text-indigo-500 transition-colors"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentChannels.map((channel) => (
                <ChannelCard
                  key={channel.id}
                  name={channel.name}
                  messages={channel.messages}
                  platform={channel.platform}
                  trend={channel.trend}
                  timeAgo={channel.timeAgo}
                  onClick={() => onNavigate('channel-detail', channel.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
