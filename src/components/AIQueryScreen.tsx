import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { Screen } from '../App';
import { useEffect, useRef, useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { chat as apiChat, getApiBase } from '../lib/api';

interface AIQueryScreenProps {
  onNavigate: (screen: Screen) => void;
}

const suggestedQueries = [
  'What tasks were assigned this week?',
  'Summarize yesterday\'s discussions',
  'Show me all decisions made in #engineering',
  'What are the upcoming deadlines?',
];

type ChatMsg = { id: string; type: 'user' | 'ai' | 'system'; message: string; time: string };
const initialHistory: ChatMsg[] = [];

export function AIQueryScreen({ onNavigate }: AIQueryScreenProps) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>(initialHistory);
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scroll to bottom on new message
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || sending) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const idUser = crypto.randomUUID();
    const idAi = crypto.randomUUID();
    const base = getApiBase();

    setSending(true);
    setMessages((m) => [
      ...m,
      { id: idUser, type: 'user', message: text, time },
      { id: idAi, type: 'ai', message: base ? 'Thinking…' : 'Set VITE_API_BASE_URL to enable backend', time },
    ]);
    setInputValue('');

    if (!base) { setSending(false); return; }

    try {
      const reply = await apiChat(text);
      setMessages((m) => m.map((msg) => (msg.id === idAi ? { ...msg, message: reply || 'No response' } : msg)));
    } catch (e: any) {
      setMessages((m) => m.map((msg) => (msg.id === idAi ? { ...msg, message: `Error: ${e?.message || 'Request failed'}` } : msg)));
    } finally {
      setSending(false);
    }
  };

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
      <div ref={listRef} className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6">
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
          {messages.map((chat) => (
            <MessageBubble
              key={chat.id}
              message={chat.message}
              time={chat.time}
              type={chat.type as any}
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
            onClick={() => send(inputValue)}
            disabled={!inputValue.trim() || sending}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              inputValue.trim() && !sending
                ? 'bg-indigo-500 hover:bg-indigo-600'
                : 'bg-slate-700/50'
            }`}
          >
            <Send className={`w-5 h-5 ${inputValue.trim() && !sending ? 'text-white' : 'text-slate-500'}`} />
          </button>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </div>
  );
}