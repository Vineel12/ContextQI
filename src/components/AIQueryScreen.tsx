import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { Screen } from '../App';
import { useState } from 'react';
import { MessageBubble } from './MessageBubble';

interface AIQueryScreenProps {
  onNavigate: (screen: Screen) => void;
}

const suggestedQueries = [
  'What tasks were assigned this week?',
  'Summarize yesterday\'s discussions',
  'Show me all decisions made in #engineering',
  'What are the upcoming deadlines?',
];

const chatHistory = [
  {
    id: '1',
    type: 'user' as const,
    message: 'What tasks were discussed in the engineering channel today?',
    time: '10:35 AM',
  },
  {
    id: '2',
    type: 'ai' as const,
    message: 'Based on today\'s conversations in #engineering-team, I found 2 main tasks:\n\n1. Complete dashboard design - assigned to Sarah Chen\n2. Frontend implementation - assigned to Alex Kumar with an EOD deadline\n\nThere was also a decision to schedule a review meeting for tomorrow at 2pm.',
    time: '10:35 AM',
  },
  {
    id: '3',
    type: 'user' as const,
    message: 'What\'s the status of the dashboard redesign?',
    time: '10:38 AM',
  },
  {
    id: '4',
    type: 'ai' as const,
    message: 'The dashboard redesign is currently in progress. Sarah Chen completed the design phase with a prototype including glassmorphism effects. Mike Johnson reviewed it positively and suggested adding micro-interactions. The next phase is frontend implementation by Alex Kumar.',
    time: '10:38 AM',
  },
];

export function AIQueryScreen({ onNavigate }: AIQueryScreenProps) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Status Bar */}
      <div className="h-8" />

      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-11 h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl text-white">AI Assistant</h1>
            <p className="text-slate-400 text-sm">Ask about your workspace</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6">
        {/* Suggested Queries */}
        <div className="mb-8">
          <h3 className="text-slate-400 text-sm mb-3">Suggested Questions</h3>
          <div className="space-y-2">
            {suggestedQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => setInputValue(query)}
                className="w-full bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 rounded-2xl p-4 text-left text-slate-300 text-sm transition-colors"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History */}
        <div>
          {chatHistory.map((chat) => (
            <MessageBubble
              key={chat.id}
              message={chat.message}
              time={chat.time}
              type={chat.type}
              userName={chat.type === 'ai' ? 'AI Assistant' : undefined}
            />
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-slate-800">
        <div className="bg-slate-800/80 rounded-2xl px-4 py-3 flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none"
          />
          <button
            disabled={!inputValue.trim()}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              inputValue.trim()
                ? 'bg-indigo-500 hover:bg-indigo-600'
                : 'bg-slate-700/50'
            }`}
          >
            <Send className={`w-5 h-5 ${inputValue.trim() ? 'text-white' : 'text-slate-500'}`} />
          </button>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </div>
  );
}