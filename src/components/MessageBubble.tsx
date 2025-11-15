interface MessageBubbleProps {
  message: string;
  time?: string;
  type: 'user' | 'ai';
  userName?: string;
}

export function MessageBubble({ message, time, type, userName }: MessageBubbleProps) {
  if (type === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[80%]">
          <div className="bg-indigo-500 text-white rounded-3xl rounded-tr-lg px-6 py-4">
            <p className="leading-relaxed whitespace-pre-line">{message}</p>
          </div>
          {time && <p className="text-slate-500 text-xs mt-2 text-right">{time}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[80%]">
        <div className="bg-slate-800/80 text-white rounded-3xl rounded-tl-lg px-6 py-4">
          <p className="leading-relaxed whitespace-pre-line">{message}</p>
        </div>
        {time && <p className="text-slate-500 text-xs mt-2">{time}</p>}
      </div>
    </div>
  );
}
