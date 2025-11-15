import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface DecisionCardProps {
  title: string;
  channel: string;
  date: string;
  onClick?: () => void;
}

export function DecisionCard({ title, channel, date, onClick }: DecisionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 rounded-2xl p-4 transition-all text-left"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="text-white text-sm flex-1">{title}</div>
        <ChevronRight 
          className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${
            isExpanded ? 'rotate-90' : ''
          }`} 
        />
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span className="bg-slate-700/50 px-2 py-1 rounded">#{channel}</span>
        <span className="bg-slate-700/50 px-2 py-1 rounded">{date}</span>
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <p className="text-slate-300 text-sm leading-relaxed">
            This decision was made after careful consideration of team input and project requirements. Implementation is scheduled for next sprint.
          </p>
        </div>
      )}
    </button>
  );
}
