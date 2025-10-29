import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';

type AppView = 'landing' | 'signin' | 'signup';

function AppContent() {
  const { user, loading } = useAuth();
  const [view, setView] = useState<AppView>('landing');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-gray via-warm-cream to-soft-mint flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-muted-lavender border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your wellness journey...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (view === 'landing') {
      return <LandingPage onGetStarted={() => setView('signup')} />;
    }

    return view === 'signin' ? (
      <SignIn onToggleMode={() => setView('signup')} />
    ) : (
      <SignUp onToggleMode={() => setView('signin')} />
    );
  }

  return <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
