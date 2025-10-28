import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Heart, Shield, Users, Clock, Star, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onSignIn }) => {
  const testimonials = [
    {
      name: "Sarah M.",
      text: "Depresso helped me understand my emotions better and connected me with the right support when I needed it most.",
      rating: 5
    },
    {
      name: "Michael T.",
      text: "The daily check-ins and personalized insights have made such a difference in my mental health journey.",
      rating: 5
    },
    {
      name: "Emily R.",
      text: "Finally, a platform that feels safe and supportive. The community feature has been life-changing.",
      rating: 5
    }
  ];

  const features = [
    {
      icon: Heart,
      title: "Personalized Care",
      description: "AI-powered insights tailored to your unique mental health journey"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your privacy is our priority with end-to-end encryption and secure data handling"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with others who understand your experience in our moderated community"
    },
    {
      icon: Clock,
      title: "24/7 Resources",
      description: "Access support, tools, and crisis resources whenever you need them"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white border-b" style={{ borderColor: 'var(--light-gray)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8" style={{ color: 'var(--coral-accent)' }} />
              <span className="text-xl" style={{ color: 'var(--slate-blue)' }}>Depresso</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={onSignIn}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ color: 'var(--slate-blue)' }}
              >
                Sign In
              </button>
              <Button
                onClick={onGetStarted}
                style={{ backgroundColor: 'var(--coral-accent)', color: 'white' }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl mb-6" style={{ color: 'var(--slate-blue)' }}>
            Your Mental Wellness Journey Starts Here
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--slate-blue)' }}>
            A safe, supportive platform for depression detection and personalized wellness support. 
            Take the first step towards better mental health today.
          </p>
          
          {/* Inspirational Quote */}
          <Card className="p-8 mb-12 max-w-2xl mx-auto" style={{ backgroundColor: 'rgba(168, 207, 229, 0.08)', border: '1px solid var(--pastel-blue)' }}>
            <p className="text-lg italic" style={{ color: 'var(--slate-blue)' }}>
              "The greatest revolution of our generation is the discovery that human beings, 
              by changing the inner attitudes of their minds, can change the outer aspects of their lives."
            </p>
            <p className="mt-4" style={{ color: 'var(--sky-blue)' }}>— William James</p>
          </Card>

          <Button
            onClick={onGetStarted}
            className="text-lg px-8 py-4 flex items-center space-x-2 mx-auto"
            style={{ backgroundColor: 'var(--coral-accent)', color: 'white' }}
          >
            <span>Begin Your Assessment</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6" style={{ backgroundColor: 'rgba(168, 207, 229, 0.03)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12" style={{ color: 'var(--slate-blue)' }}>
            Why Choose Depresso?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 text-center" style={{ backgroundColor: 'var(--crisp-white)', border: '1px solid var(--light-gray)' }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(168, 207, 229, 0.1)' }}>
                    <Icon className="w-8 h-8" style={{ color: 'var(--sky-blue)' }} />
                  </div>
                  <h3 className="text-lg mb-3" style={{ color: 'var(--slate-blue)' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--slate-blue)' }}>{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12" style={{ color: 'var(--slate-blue)' }}>
            What Our Community Says
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6" style={{ backgroundColor: 'rgba(168, 207, 229, 0.05)', border: '1px solid var(--pastel-blue)' }}>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: 'var(--coral-accent)' }} />
                  ))}
                </div>
                <p className="mb-4" style={{ color: 'var(--slate-blue)' }}>"{testimonial.text}"</p>
                <p style={{ color: 'var(--sky-blue)' }}>— {testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis Resources Footer */}
      <footer className="py-12 px-6" style={{ backgroundColor: 'var(--slate-blue)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg mb-4 text-white">Crisis Resources</h3>
              <div className="space-y-2">
                <p className="text-white">National Suicide Prevention Lifeline</p>
                <p className="text-white">📞 988</p>
                <p className="text-white">Crisis Text Line: Text HOME to 741741</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg mb-4 text-white">Support</h3>
              <div className="space-y-2">
                <p className="text-white">Contact Us</p>
                <p className="text-white">Privacy Policy</p>
                <p className="text-white">Terms of Service</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg mb-4 text-white">About Depresso</h3>
              <p className="text-white">
                Supporting mental health journeys with personalized care, 
                community support, and professional resources.
              </p>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-600">
            <p className="text-white">© 2024 Depresso. All rights reserved.</p>
            <p className="text-white mt-2">
              If you're in crisis, please seek immediate help from emergency services or a mental health professional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;