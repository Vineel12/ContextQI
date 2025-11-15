import { ArrowLeft, CheckSquare, Lightbulb, FileText, ArrowRight } from 'lucide-react';
import { Screen } from '../App';
import { StatCard } from './StatCard';
import { TaskCard } from './TaskCard';
import { useState } from 'react';

interface InsightsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const initialTasks = [
  { id: '1', title: 'Complete dashboard design', channel: 'engineering-team', assignee: 'Sarah Chen', priority: 'high' as const, dueDate: 'Today' },
  { id: '2', title: 'Frontend implementation', channel: 'engineering-team', assignee: 'Alex Kumar', priority: 'high' as const, dueDate: 'Tomorrow' },
  { id: '3', title: 'Update marketing materials', channel: 'marketing', assignee: 'Emma Wilson', priority: 'medium' as const, dueDate: 'Nov 18' },
  { id: '4', title: 'Customer feedback review', channel: 'customer-success', assignee: 'Mike Johnson', priority: 'medium' as const, dueDate: 'Nov 20' },
  { id: '5', title: 'Q4 sales report', channel: 'sales-team', assignee: 'Lisa Brown', priority: 'low' as const, dueDate: 'Nov 25' },
];

export function InsightsScreen({ onNavigate }: InsightsScreenProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    if (completed) {
      setCompletedTasks(prev => [...prev, taskId]);
    } else {
      setCompletedTasks(prev => prev.filter(id => id !== taskId));
    }
  };

  const activeTasks = tasks.filter(task => !completedTasks.includes(task.id));

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Status Bar */}
      <div className="h-8" />

      {/* Header */}
      <div className="px-6 py-4 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-11 h-11 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl text-white">AI Insights</h1>
            <p className="text-slate-400 text-sm">From your conversations</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={CheckSquare} value={activeTasks.length} label="Tasks" color="blue" />
          <StatCard icon={Lightbulb} value="4" label="Decisions" color="purple" />
          <StatCard icon={FileText} value="3" label="Summaries" color="orange" />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-8 space-y-6">
        {/* Tasks Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-blue-400" />
              <h3 className="text-white">Active Tasks</h3>
            </div>
          </div>
          {activeTasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  channel={task.channel}
                  assignee={task.assignee}
                  priority={task.priority}
                  dueDate={task.dueDate}
                  onComplete={(completed) => handleTaskComplete(task.id, completed)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/50 rounded-2xl p-8 text-center">
              <CheckSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">All tasks completed! 🎉</p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <button
            onClick={() => onNavigate('decisions')}
            className="w-full bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 rounded-2xl p-5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-white mb-1">Key Decisions</h3>
                  <p className="text-slate-400 text-sm">View all team decisions</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('summaries')}
            className="w-full bg-slate-800/80 hover:bg-slate-700/80 active:bg-slate-600/80 rounded-2xl p-5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-white mb-1">Conversation Summaries</h3>
                  <p className="text-slate-400 text-sm">View meeting summaries</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500" />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </div>
  );
}
