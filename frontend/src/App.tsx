import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { Questionnaire } from './components/Questionnaire';
import { Dashboard } from './components/Dashboard';
import { supabase } from './lib/supabase';

function AppContent() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkOnboarding();
    } else {
      setLoading(false);
    }
  }, [user]);

  const checkOnboarding = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('user_profiles')
      .select('onboarding_completed')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setOnboardingComplete(data.onboarding_completed);
    }
    setLoading(false);
  };

  const handleGetStarted = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const handleQuestionnaireComplete = () => {
    setOnboardingComplete(true);
  };

  const handleSignOut = () => {
    setOnboardingComplete(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-coral border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user && !onboardingComplete) {
    return <Questionnaire onComplete={handleQuestionnaireComplete} />;
  }

  if (user && onboardingComplete) {
    return <Dashboard onSignOut={handleSignOut} />;
  }

  return (
    <>
      <LandingPage onGetStarted={handleGetStarted} onSignIn={handleSignIn} />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
