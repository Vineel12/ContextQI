import { Brain, MessageSquare, Sparkles, TrendingUp } from 'lucide-react';
import { Screen } from '../App';
import { FeatureCard } from './FeatureCard';
import { useState } from 'react';

interface WelcomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoggingIn(true);
    // Simulate Google OAuth login
    setTimeout(() => {
      setIsLoggingIn(false);
      onNavigate('oauth');
    }, 1500);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col bg-slate-950">
      {/* Status Bar */}
      <div className="h-8" />

      {/* Logo & Title */}
      <div className="text-center mb-12 mt-8">
        <div className="w-20 h-20 bg-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl text-white mb-3">ContextIQ</h1>
        <p className="text-slate-400">
          AI-Powered Collaboration Intelligence
        </p>
      </div>

      {/* Features */}
      <div className="flex-1 space-y-4 mb-8">
        <FeatureCard
          icon={MessageSquare}
          title="Unified Dashboard"
          description="Connect Slack, Teams and Discord in one place"
        />
        <FeatureCard
          icon={Brain}
          title="AI Insights"
          description="Extract tasks, decisions, and summaries automatically"
        />
        <FeatureCard
          icon={TrendingUp}
          title="Smart Analytics"
          description="Track team productivity and conversation trends"
        />
        <FeatureCard
          icon={Sparkles}
          title="AI Assistant"
          description="Chat with AI to find information instantly"
        />
      </div>

      {/* Google Login Button */}
      <div className="space-y-3">
        <button
          onClick={handleGoogleLogin}
          disabled={isLoggingIn}
          className="w-full bg-white hover:bg-gray-100 text-slate-900 py-4 rounded-2xl flex items-center justify-center gap-3 transition-colors disabled:opacity-50"
        >
          {isLoggingIn ? (
            <>
              <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>
        
        <p className="text-slate-500 text-xs text-center px-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      {/* Bottom Spacing */}
      <div className="h-8" />
    </div>
  );
}
