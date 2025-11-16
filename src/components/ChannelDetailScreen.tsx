import { ArrowLeft, Hash, Users, Sparkles } from 'lucide-react';
import { Screen } from '../App';
import { MessageBubble } from './MessageBubble';
import { InsightCard } from './InsightCard';
import { CheckSquare, FileText } from 'lucide-react';

interface ChannelDetailScreenProps {
  onNavigate: (screen: Screen) => void;
  channelId: string | null;
}

const messages = [
  { id: '1', user: 'Sarah Chen', time: '10:24 AM', content: 'Hey team, I\'ve finished the new dashboard design. Check out the prototype link!' },
  { id: '2', user: 'Mike Johnson', time: '10:26 AM', content: 'Looks amazing! Love the glassmorphism effects. Can we add some micro-interactions?' },
  { id: '3', user: 'Emily Davis', time: '10:28 AM', content: 'We should schedule a review meeting tomorrow at 2pm to discuss implementation.' },
  { id: '4', user: 'Alex Kumar', time: '10:30 AM', content: 'I can start on the frontend components. Will have the base structure ready by EOD.' },
];

const insights = [
  { icon: CheckSquare, title: 'Complete dashboard design', subtitle: 'Assigned: Sarah Chen' },
  { icon: CheckSquare, title: 'Frontend implementation', subtitle: 'Assigned: Alex Kumar' },
  { icon: FileText, title: 'Review meeting scheduled for tomorrow 2pm', subtitle: 'Decision' },
];

export function ChannelDetailScreen({ onNavigate }: ChannelDetailScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Status Bar */}
      <div className="h-8" />

      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => onNavigate('channels')}
            className="w-11 h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Hash className="w-5 h-5 text-indigo-400" />
              <h1 className="text-xl text-white">engineering-team</h1>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Users className="w-4 h-4" />
              <span>24 members</span>
              <span>•</span>
              <span>Discord</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl px-3 py-2 whitespace-nowrap">
            <span className="text-indigo-400 text-sm">High Activity</span>
          </div>
          <div className="bg-slate-800/50 rounded-xl px-3 py-2 whitespace-nowrap">
            <span className="text-slate-300 text-sm">248 msgs today</span>
          </div>
          <div className="bg-slate-800/50 rounded-xl px-3 py-2 whitespace-nowrap">
            <span className="text-slate-300 text-sm">5 tasks</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* AI Insights Section */}
        <div className="px-6 py-6">
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-3xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white">AI Insights</h3>
                <p className="text-slate-400 text-sm">From recent messages</p>
              </div>
            </div>

            <div className="space-y-2">
              {insights.map((insight, index) => (
                <InsightCard
                  key={index}
                  icon={insight.icon}
                  title={insight.title}
                  subtitle={insight.subtitle}
                />
              ))}
            </div>
          </div>

          {/* Timeline Header */}
          <h3 className="text-white mb-4">Message Timeline</h3>

          {/* Messages */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="bg-slate-800/80 rounded-3xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-white text-sm">
                    {message.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white text-sm">{message.user}</span>
                      <span className="text-slate-500 text-xs">{message.time}</span>
                    </div>
                    <p className="text-slate-300 text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <button className="w-full mt-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 text-slate-400 transition-colors text-sm">
            Load Earlier Messages
          </button>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </div>
  );
}