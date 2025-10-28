import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import SignUpPage from './components/SignUpPage';
import OnboardingFlow from './components/OnboardingFlow';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Journal from './components/Journal';
import WellnessTracker from './components/WellnessTracker';
import Community from './components/Community';
import CareConnect from './components/CareConnect';
import Settings from './components/Settings';

type AppState = 'landing' | 'signup' | 'signin' | 'onboarding' | 'app';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [activeTab, setActiveTab] = useState('home');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard />;
      case 'journal':
        return <Journal />;
      case 'wellness':
        return <WellnessTracker />;
      case 'community':
        return <Community />;
      case 'care':
        return <CareConnect />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const renderCurrentView = () => {
    switch (appState) {
      case 'landing':
        return (
          <LandingPage
            onGetStarted={() => setAppState('signup')}
            onSignIn={() => setAppState('signin')}
          />
        );
      case 'signup':
        return (
          <SignUpPage
            onBack={() => setAppState('landing')}
            onSignUp={() => setAppState('onboarding')}
            onSignIn={() => setAppState('signin')}
          />
        );
      case 'signin':
        return (
          <SignUpPage
            onBack={() => setAppState('landing')}
            onSignUp={() => setAppState('app')}
            onSignIn={() => setAppState('app')}
          />
        );
      case 'onboarding':
        return (
          <OnboardingFlow
            onComplete={() => setAppState('app')}
            onBack={() => setAppState('signup')}
          />
        );
      case 'app':
        return (
          <div className="min-h-screen flex flex-col bg-white">
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-20">
              {renderActiveComponent()}
            </main>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg" style={{ borderColor: 'var(--light-gray)' }}>
              <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return renderCurrentView();
}