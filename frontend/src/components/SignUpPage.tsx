import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Heart, ArrowLeft, Mail, Lock, User } from 'lucide-react';

interface SignUpPageProps {
  onBack: () => void;
  onSignUp: () => void;
  onSignIn: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onBack, onSignUp, onSignIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSignUp();
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="bg-white border-b" style={{ borderColor: 'var(--light-gray)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
              style={{ color: 'var(--slate-blue)' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8" style={{ color: 'var(--coral-accent)' }} />
              <span className="text-xl" style={{ color: 'var(--slate-blue)' }}>Depresso</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Motivational Content */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12" style={{ backgroundColor: 'rgba(168, 207, 229, 0.05)' }}>
          <div className="max-w-md">
            <h2 className="text-3xl mb-6" style={{ color: 'var(--slate-blue)' }}>
              Take the first step towards better mental health
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--pastel-blue)' }}>
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-2" style={{ color: 'var(--slate-blue)' }}>Personalized Support</h3>
                  <p style={{ color: 'var(--slate-blue)' }}>Get tailored recommendations based on your unique needs and goals.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--sky-blue)' }}>
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-2" style={{ color: 'var(--slate-blue)' }}>Safe Community</h3>
                  <p style={{ color: 'var(--slate-blue)' }}>Connect with others who understand your journey in a supportive environment.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--coral-accent)' }}>
                  <Lock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-2" style={{ color: 'var(--slate-blue)' }}>Complete Privacy</h3>
                  <p style={{ color: 'var(--slate-blue)' }}>Your data is encrypted and protected with the highest security standards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <Card className="w-full max-w-md p-8" style={{ backgroundColor: 'var(--crisp-white)', border: '1px solid var(--light-gray)' }}>
            <div className="text-center mb-8">
              <h1 className="text-2xl mb-2" style={{ color: 'var(--slate-blue)' }}>Create Your Account</h1>
              <p style={{ color: 'var(--slate-blue)' }}>Join thousands on their mental wellness journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" style={{ color: 'var(--slate-blue)' }}>Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--slate-blue)' }} />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    style={{ 
                      borderColor: errors.email ? 'var(--coral-accent)' : 'var(--light-gray)',
                      focusRingColor: 'var(--sky-blue)'
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && <p className="text-sm mt-1" style={{ color: 'var(--coral-accent)' }}>{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password" style={{ color: 'var(--slate-blue)' }}>Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--slate-blue)' }} />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10"
                    style={{ 
                      borderColor: errors.password ? 'var(--coral-accent)' : 'var(--light-gray)',
                      focusRingColor: 'var(--sky-blue)'
                    }}
                    placeholder="Create a strong password"
                  />
                </div>
                {errors.password && <p className="text-sm mt-1" style={{ color: 'var(--coral-accent)' }}>{errors.password}</p>}
              </div>

              <div>
                <Label htmlFor="confirmPassword" style={{ color: 'var(--slate-blue)' }}>Confirm Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--slate-blue)' }} />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10"
                    style={{ 
                      borderColor: errors.confirmPassword ? 'var(--coral-accent)' : 'var(--light-gray)',
                      focusRingColor: 'var(--sky-blue)'
                    }}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <p className="text-sm mt-1" style={{ color: 'var(--coral-accent)' }}>{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                />
                <Label htmlFor="agreeToTerms" className="text-sm leading-5" style={{ color: 'var(--slate-blue)' }}>
                  I agree to the <button type="button" className="underline" style={{ color: 'var(--sky-blue)' }}>Terms of Service</button> and <button type="button" className="underline" style={{ color: 'var(--sky-blue)' }}>Privacy Policy</button>
                </Label>
              </div>
              {errors.agreeToTerms && <p className="text-sm" style={{ color: 'var(--coral-accent)' }}>{errors.agreeToTerms}</p>}

              <Button
                type="submit"
                className="w-full"
                style={{ backgroundColor: 'var(--coral-accent)', color: 'white' }}
              >
                Create Account
              </Button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: 'var(--light-gray)' }}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white" style={{ color: 'var(--slate-blue)' }}>Or continue with</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  style={{ borderColor: 'var(--light-gray)', color: 'var(--slate-blue)' }}
                >
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  style={{ borderColor: 'var(--light-gray)', color: 'var(--slate-blue)' }}
                >
                  Continue with Apple
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p style={{ color: 'var(--slate-blue)' }}>
                Already have an account?{' '}
                <button
                  onClick={onSignIn}
                  className="underline"
                  style={{ color: 'var(--sky-blue)' }}
                >
                  Sign in
                </button>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;