import React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Heart, Brain, Users, TrendingUp, Shield, Phone } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-warm-cream to-soft-mint">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted-lavender rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">Depresso</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-gray-800 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-800 transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-800 transition-colors">Testimonials</a>
              <a href="#crisis" className="text-coral font-medium hover:text-coral/80 transition-colors">Crisis Help</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Your Mental Wellness Journey Starts Here
            </h1>

            <div className="my-12 py-8 px-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200">
              <p className="text-xl sm:text-2xl text-gray-600 italic font-light">
                "The greatest glory in living lies not in never falling,<br />
                but in rising every time we fall."
              </p>
              <p className="text-sm text-gray-500 mt-4">— Nelson Mandela</p>
            </div>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              AI-powered mental health support that combines therapeutic journaling,
              holistic wellness tracking, and professional care—all in one compassionate platform.
            </p>

            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-coral hover:bg-coral/90 text-white px-12 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Begin Your Assessment
            </Button>

            <p className="text-sm text-gray-500 mt-4">
              Free to start • HIPAA compliant • Your data is private and secure
            </p>
          </div>

          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <Card hover className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-muted-lavender/20 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-muted-lavender" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  AI-Powered Journaling
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Express yourself through text, voice, or video. Our AI provides
                  real-time insights and gentle therapeutic prompts based on CBT principles.
                </p>
              </CardContent>
            </Card>

            <Card hover className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-soft-mint/30 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-soft-mint" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Wellness Tracking
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor your emotional patterns, sleep, exercise, and more.
                  Discover insights that help you understand what truly impacts your wellbeing.
                </p>
              </CardContent>
            </Card>

            <Card hover className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-coral/20 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-coral" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Community & Care
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with a supportive community and find professional therapists
                  who understand your needs. You're never alone on this journey.
                </p>
              </CardContent>
            </Card>
          </div>

          <div id="how-it-works" className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 mb-24">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
              How Depresso Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-muted-lavender rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Complete Assessment
                </h3>
                <p className="text-gray-600 text-sm">
                  Share your story and help us understand your unique needs
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-muted-lavender rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Get Your Plan
                </h3>
                <p className="text-gray-600 text-sm">
                  Receive a personalized wellness plan tailored to your goals
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-muted-lavender rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Track Progress
                </h3>
                <p className="text-gray-600 text-sm">
                  Journal daily and watch AI insights reveal your patterns
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-muted-lavender rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Thrive Together
                </h3>
                <p className="text-gray-600 text-sm">
                  Connect with community and professional support when needed
                </p>
              </div>
            </div>
          </div>

          <div id="testimonials" className="mb-24">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
              Stories of Hope
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <p className="text-gray-600 italic mb-6">
                    "Depresso helped me understand my anxiety patterns in a way therapy
                    alone never did. The AI insights are surprisingly accurate and compassionate."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-soft-mint rounded-full flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Sarah M.</p>
                      <p className="text-sm text-gray-500">6 months with Depresso</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <p className="text-gray-600 italic mb-6">
                    "The community feature made me realize I wasn't alone. Reading others'
                    journeys gave me hope when I needed it most."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted-lavender rounded-full flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Michael T.</p>
                      <p className="text-sm text-gray-500">1 year with Depresso</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <p className="text-gray-600 italic mb-6">
                    "Finding my therapist through Depresso was seamless, and having
                    everything in one place makes managing my mental health so much easier."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center text-white font-bold">
                      J
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Jessica L.</p>
                      <p className="text-sm text-gray-500">3 months with Depresso</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-coral hover:bg-coral/90 text-white px-12 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Start Your Journey Today
            </Button>
          </div>
        </div>
      </section>

      <footer id="crisis" className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-coral rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Depresso</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your mental wellness companion, available 24/7 to support your journey.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>HIPAA Compliant</li>
                <li>End-to-End Encryption</li>
                <li>You Control Your Data</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            <div className="bg-coral/20 rounded-xl p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Crisis Resources
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">If you're in crisis:</p>
                <p>988 Suicide & Crisis Lifeline</p>
                <p>Text HOME to 741741</p>
                <p className="text-xs text-white/80 mt-3">
                  Available 24/7 • Free & Confidential
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Depresso AI. All rights reserved. • Terms of Service • Privacy Policy</p>
            <p className="mt-2 text-xs">
              Depresso is not a substitute for professional mental health care or emergency services.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
