import { User, Calendar } from 'lucide-react';
import { useState } from 'react';

interface TaskCardProps {
  title: string;
  channel: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  onClick?: () => void;
  onComplete?: (completed: boolean) => void;
}

export function TaskCard({ title, channel, assignee, priority, dueDate, onClick, onComplete }: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  const priorityColors = {
    high: 'border-red-400 bg-red-500/10',
    medium: 'border-orange-400 bg-orange-500/10',
    low: 'border-slate-400 bg-slate-500/10',
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !isCompleted;
    setIsCompleted(newState);
    onComplete?.(newState);
  };

  return (
    <div
      onClick={onClick}
      className={`w-full bg-slate-800/80 hover:bg-slate-700/80 rounded-2xl p-4 transition-all cursor-pointer ${
        isCompleted ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleCheckboxClick}
          className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
            isCompleted ? 'bg-green-500 border-green-500' : priorityColors[priority]
          }`}
        >
          {isCompleted && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className={`text-white text-sm mb-3 ${isCompleted ? 'line-through' : ''}`}>
            {title}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
            <span className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded">
              <User className="w-3 h-3" />
              {assignee}
            </span>
            <span className="bg-slate-700/50 px-2 py-1 rounded">
              #{channel}
            </span>
            <span className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded">
              <Calendar className="w-3 h-3" />
              {dueDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
