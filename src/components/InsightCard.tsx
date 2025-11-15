import { LucideIcon } from 'lucide-react';

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}

export function InsightCard({ icon: Icon, title, subtitle, onClick }: InsightCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-slate-800/80 hover:bg-slate-700/80 rounded-2xl p-4 transition-all duration-200 text-left"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 bg-slate-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-slate-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm mb-1">{title}</p>
          {subtitle && <p className="text-slate-400 text-xs">{subtitle}</p>}
        </div>
      </div>
    </button>
  );
}
