import { TrendingUp, Minus } from 'lucide-react';

interface ChannelCardProps {
  name: string;
  messages: number;
  platform: string;
  trend: 'up' | 'down' | 'stable';
  timeAgo?: string;
  onClick?: () => void;
}

export function ChannelCard({ name, messages, platform, trend, timeAgo, onClick }: ChannelCardProps) {
  const platformColors = {
    Discord: 'bg-indigo-500',
  };

  const trendIcons = {
    up: <TrendingUp className="w-3 h-3 text-green-400" />,
    down: <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />,
    stable: <Minus className="w-3 h-3 text-slate-400" />,
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 rounded-2xl p-4 transition-colors text-left"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`w-10 h-10 ${platformColors[platform as keyof typeof platformColors] || 'bg-slate-500'} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <span className="text-white text-sm">#</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white text-sm truncate">{name}</h3>
              {trendIcons[trend]}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{messages.toLocaleString()} messages</span>
              {timeAgo && (
                <>
                  <span>•</span>
                  <span>{timeAgo}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-2">
          <span className="px-2 py-1 rounded bg-slate-700/50 text-slate-300 text-xs">
            {platform}
          </span>
        </div>
      </div>
    </button>
  );
}
