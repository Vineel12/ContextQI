import { ArrowLeft, Search, Filter } from 'lucide-react';
import { Screen } from '../App';
import { ChannelCard } from './ChannelCard';
import { useState } from 'react';

interface ChannelListScreenProps {
  onNavigate: (screen: Screen, channelId?: string) => void;
}

const allChannels = [
  { id: '1', name: 'engineering-team', messages: 1247, platform: 'Slack', trend: 'up' as const, timeAgo: '2m ago' },
  { id: '2', name: 'product-design', messages: 892, platform: 'Slack', trend: 'up' as const, timeAgo: '15m ago' },
  { id: '3', name: 'marketing', messages: 654, platform: 'Teams', trend: 'stable' as const, timeAgo: '1h ago' },
  { id: '4', name: 'customer-success', messages: 534, platform: 'Discord', trend: 'up' as const, timeAgo: '2h ago' },
  { id: '5', name: 'sales-team', messages: 423, platform: 'Slack', trend: 'down' as const, timeAgo: '3h ago' },
  { id: '6', name: 'dev-ops', messages: 389, platform: 'Teams', trend: 'stable' as const, timeAgo: '4h ago' },
  { id: '7', name: 'general', messages: 2156, platform: 'Slack', trend: 'up' as const, timeAgo: '5m ago' },
  { id: '8', name: 'random', messages: 1089, platform: 'Discord', trend: 'stable' as const, timeAgo: '30m ago' },
];

export function ChannelListScreen({ onNavigate }: ChannelListScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');

  const platforms = ['All', 'Slack', 'Teams', 'Discord'];

  const filteredChannels = allChannels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'All' || channel.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Status Bar */}
      <div className="h-8" />

      {/* Header */}
      <div className="px-6 py-4 mb-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-11 h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl text-white mb-1">Channels</h1>
            <p className="text-slate-400 text-sm">{filteredChannels.length} channels</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search channels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/80 text-white rounded-2xl pl-12 pr-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Platform Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
                selectedPlatform === platform
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-400'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Channel List */}
      <div className="px-6 pb-8">
        {filteredChannels.length > 0 ? (
          <div className="space-y-3">
            {filteredChannels.map((channel) => (
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
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-slate-400">No channels found</p>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </div>
  );
}
