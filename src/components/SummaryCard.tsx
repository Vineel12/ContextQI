interface SummaryCardProps {
  title: string;
  content: string;
  channel: string;
  date: string;
  onClick?: () => void;
}

export function SummaryCard({ title, content, channel, date, onClick }: SummaryCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-slate-800/80 hover:bg-slate-700/80 rounded-2xl p-5 transition-colors text-left"
    >
      <div className="text-white mb-3">{title}</div>
      <p className="text-slate-300 text-sm mb-4 leading-relaxed">{content}</p>
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span className="bg-slate-700/50 px-2 py-1 rounded">#{channel}</span>
        <span className="bg-slate-700/50 px-2 py-1 rounded">{date}</span>
      </div>
    </button>
  );
}
