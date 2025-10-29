import { useState } from 'react';
import { Heart, Shield, Clock, Users, ArrowRight, Phone } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  const [showCrisis, setShowCrisis] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-coral" fill="#FF6B6B" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">Depresso</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setShowCrisis(!showCrisis)}
                className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base text-coral hover:text-coral-dark transition-colors font-medium rounded-lg hover:bg-coral/10 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"
                aria-label="Crisis resources"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Crisis Help</span>
              </button>
              <button
                onClick={onSignIn}
                className="px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base text-soft-blue hover:text-soft-blue-dark transition-colors font-medium rounded-lg hover:bg-soft-blue/10 focus:outline-none focus:ring-2 focus:ring-soft-blue focus:ring-offset-2"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showCrisis && (
        <div className="fixed top-16 sm:top-20 right-4 bg-white rounded-xl shadow-2xl p-4 sm:p-6 z-40 max-w-sm w-full mx-4 sm:mx-0 sm:w-96 border-2 border-coral">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Crisis Resources</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-coral/10 rounded-lg">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">988 Suicide & Crisis Lifeline</p>
              <a href="tel:988" className="text-xl sm:text-2xl font-bold text-coral hover:text-coral-dark block mt-1 sm:mt-2">
                988
              </a>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">24/7 free and confidential support</p>
            </div>
            <div className="p-3 sm:p-4 bg-soft-blue/10 rounded-lg">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Crisis Text Line</p>
              <p className="text-lg sm:text-xl font-bold text-soft-blue mt-1 sm:mt-2">Text HOME to 741741</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Connect with a Crisis Counselor</p>
            </div>
          </div>
          <button
            onClick={() => setShowCrisis(false)}
            className="mt-4 w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      )}

      <main className="pt-20 sm:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Your Journey to Better
              <br />
              <span className="text-coral">Mental Wellness</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              A safe, supportive space designed with care. Get personalized insights and support when you need it most.
            </p>
            <button
              onClick={onGetStarted}
              className="inline-flex items-center space-x-3 px-6 sm:px-8 py-3 sm:py-4 bg-coral hover:bg-coral-dark text-white text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-coral focus:ring-offset-2 min-h-[44px]"
              aria-label="Get started with Depresso"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <p className="mt-4 text-sm sm:text-base text-gray-500">No credit card required • Free forever</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-24">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-coral/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-coral" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Private & Secure</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Your data is encrypted and never shared. We prioritize your privacy and confidentiality.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-soft-blue/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-soft-blue" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Personalized Care</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                AI-powered insights tailored to your unique journey and mental health goals.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-coral/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-coral" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">24/7 Available</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Access support anytime, anywhere. We're here when you need us most.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-soft-blue/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-soft-blue" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Expert-Backed</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Built with guidance from mental health professionals and therapists.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-coral/10 to-soft-blue/10 rounded-3xl p-8 sm:p-12 md:p-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              You're Not Alone
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands who have taken the first step toward better mental health. Your wellness journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-coral">10,000+</p>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Active Users</p>
              </div>
              <div className="hidden sm:block w-px h-16 bg-gray-300"></div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-soft-blue">50,000+</p>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Check-ins Completed</p>
              </div>
              <div className="hidden sm:block w-px h-16 bg-gray-300"></div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-coral">4.9/5</p>
                <p className="text-sm sm:text-base text-gray-600 mt-1">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Depresso is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              If you're experiencing a mental health crisis, please call 988 or contact emergency services immediately.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
