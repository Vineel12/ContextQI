import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  onClick?: () => void;
  size?: 'small' | 'large';
}

export function FeatureCard({ icon: Icon, title, description, onClick, size = 'small' }: FeatureCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-slate-800/80 hover:bg-slate-700/80 rounded-3xl ${
        size === 'large' ? 'p-6' : 'p-5'
      } transition-all duration-200 text-left group`}
    >
      <div className={`${size === 'large' ? 'w-12 h-12' : 'w-10 h-10'} bg-slate-700/50 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-slate-600/50 transition-colors`}>
        <Icon className={`${size === 'large' ? 'w-6 h-6' : 'w-5 h-5'} text-slate-300`} />
      </div>
      <h3 className="text-white mb-1">{title}</h3>
      {description && <p className="text-slate-400 text-sm leading-relaxed">{description}</p>}
    </button>
  );
}
