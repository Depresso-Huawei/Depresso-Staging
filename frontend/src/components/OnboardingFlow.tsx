import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Heart, ArrowLeft, ArrowRight, User, Brain, Target, MessageSquare, Users } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
  onBack: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    name: '',
    age: '',
    gender: '',
    location: '',
    
    // Step 2: Mental Health Assessment
    concerns: [] as string[],
    
    // Step 3: Current Situation
    therapyHistory: '',
    medication: '',
    supportSystem: '',
    severityLevel: [5],
    additionalContext: '',
    
    // Step 4: Preferences & Goals
    interactionPreferences: [] as string[],
    notifications: {
      dailyCheckin: true,
      weeklyProgress: true,
      communityUpdates: false,
      crisisAlerts: true
    },
    goals: [] as string[],
    
    // Step 5: Professional Support
    hasTherapist: '',
    emergencyContact: '',
    crisisResourcesAcknowledged: false
  });

  const concernOptions = [
    'Depression', 'Anxiety', 'Stress', 'Sleep issues', 
    'Relationship problems', 'Work burnout', 'Self-esteem', 
    'Trauma', 'Grief & loss', 'Substance use'
  ];

  const interactionOptions = [
    'Text journaling', 'Voice messages', 'Video entries', 
    'Guided exercises', 'Community discussions', 'Professional chat'
  ];

  const goalOptions = [
    'Improve mood', 'Reduce anxiety', 'Better sleep', 
    'Stronger relationships', 'Work-life balance', 'Self-confidence',
    'Stress management', 'Emotional regulation'
  ];

  const handleArrayToggle = (array: string[], item: string, field: string) => {
    const newArray = array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const renderStepIcon = (step: number) => {
    const icons = [User, Brain, MessageSquare, Target, Users];
    const Icon = icons[step - 1];
    return <Icon className="w-6 h-6" />;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(168, 207, 229, 0.1)' }}>
                {renderStepIcon(1)}
              </div>
              <h2 className="text-2xl mb-2" style={{ color: 'var(--slate-blue)' }}>Tell us about yourself</h2>
              <p style={{ color: 'var(--slate-blue)' }}>Help us personalize your experience</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" style={{ color: 'var(--slate-blue)' }}>First Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your first name"
                  style={{ borderColor: 'var(--light-gray)' }}
                />
              </div>
              <div>
                <Label htmlFor="age" style={{ color: 'var(--slate-blue)' }}>Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Your age"
                  style={{ borderColor: 'var(--light-gray)' }}
                />
              </div>
              <div>
                <Label style={{ color: 'var(--slate-blue)' }}>Gender (Optional)</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="female"
                      checked={formData.gender === 'female'}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        gender: checked ? 'female' : '' 
                      }))}
                    />
                    <Label htmlFor="female" style={{ color: 'var(--slate-blue)' }}>Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="male"
                      checked={formData.gender === 'male'}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        gender: checked ? 'male' : '' 
                      }))}
                    />
                    <Label htmlFor="male" style={{ color: 'var(--slate-blue)' }}>Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="non-binary"
                      checked={formData.gender === 'non-binary'}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        gender: checked ? 'non-binary' : '' 
                      }))}
                    />
                    <Label htmlFor="non-binary" style={{ color: 'var(--slate-blue)' }}>Non-binary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="prefer-not-to-say"
                      checked={formData.gender === 'prefer-not-to-say'}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        gender: checked ? 'prefer-not-to-say' : '' 
                      }))}
                    />
                    <Label htmlFor="prefer-not-to-say" style={{ color: 'var(--slate-blue)' }}>Prefer not to say</Label>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="location" style={{ color: 'var(--slate-blue)' }}>Location (Optional)</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, State"
                  style={{ borderColor: 'var(--light-gray)' }}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(168, 207, 229, 0.1)' }}>
                {renderStepIcon(2)}
              </div>
              <h2 className="text-2xl mb-2" style={{ color: 'var(--slate-blue)' }}>Help us understand your needs</h2>
              <p style={{ color: 'var(--slate-blue)' }}>Select all areas you'd like support with</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {concernOptions.map((concern) => (
                <Card
                  key={concern}
                  className={`p-4 cursor-pointer transition-all ${
                    formData.concerns.includes(concern) ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: formData.concerns.includes(concern) 
                      ? 'rgba(168, 207, 229, 0.1)' 
                      : 'var(--crisp-white)',
                    borderColor: formData.concerns.includes(concern) 
                      ? 'var(--sky-blue)' 
                      : 'var(--light-gray)',
                    ringColor: 'var(--sky-blue)'
                  }}
                  onClick={() => handleArrayToggle(formData.concerns, concern, 'concerns')}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={formData.concerns.includes(concern)}
                      readOnly
                    />
                    <span style={{ color: 'var(--slate-blue)' }}>{concern}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(168, 207, 229, 0.1)' }}>
                {renderStepIcon(3)}
              </div>
              <h2 className="text-2xl mb-2" style={{ color: 'var(--slate-blue)' }}>Current mental health status</h2>
              <p style={{ color: 'var(--slate-blue)' }}>Help us understand your current situation</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label style={{ color: 'var(--slate-blue)' }}>Have you ever worked with a therapist or counselor?</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="never"
                      checked={formData.therapyHistory === 'never'}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        therapyHistory: checked ? 'never' : '' 
                      }))}
                    />
                    <Label htmlFor="never" style={{ color: 'var(--slate-blue)' }}>Never</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="past"
                      checked={formData.therapyHistory === 'past'}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        therapyHistory: checked ? 'past' : '' 
                      }))}
                    />
                    <Label htmlFor="past" style={{ color: 'var(--slate-blue)' }}>In the past</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="currently"
                      checked={formData.therapyHistory === 'currently'}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        therapyHistory: checked ? 'currently' : '' 
                      }))}
                    />
                    <Label htmlFor="currently" style={{ color: 'var(--slate-blue)' }}>Currently working with someone</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label style={{ color: 'var(--slate-blue)' }}>Are you currently taking any medication for mental health?</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="no-meds"
                      checked={formData.medication === 'no'}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        medication: checked ? 'no' : '' 
                      }))}
                    />
                    <Label htmlFor="no-meds" style={{ color: 'var(--slate-blue)' }}>No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="yes-meds"
                      checked={formData.medication === 'yes'}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        medication: checked ? 'yes' : '' 
                      }))}
                    />
                    <Label htmlFor="yes-meds" style={{ color: 'var(--slate-blue)' }}>Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="prefer-not-to-say-meds"
                      checked={formData.medication === 'prefer-not-to-say-meds'}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        medication: checked ? 'prefer-not-to-say-meds' : '' 
                      }))}
                    />
                    <Label htmlFor="prefer-not-to-say-meds" style={{ color: 'var(--slate-blue)' }}>Prefer not to say</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label style={{ color: 'var(--slate-blue)' }}>How would you rate your current distress level?</Label>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-4">
                    <span style={{ color: 'var(--slate-blue)' }}>1 - Minimal</span>
                    <Input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.severityLevel[0]}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        severityLevel: [parseInt(e.target.value)] 
                      }))}
                      className="flex-1"
                    />
                    <span style={{ color: 'var(--slate-blue)' }}>10 - Severe</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm" style={{ color: 'var(--slate-blue)' }}>
                      Current: {formData.severityLevel[0]}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="context" style={{ color: 'var(--slate-blue)' }}>
                  Anything else you'd like us to know? (Optional)
                </Label>
                <Textarea
                  id="context"
                  value={formData.additionalContext}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalContext: e.target.value }))}
                  placeholder="Share any additional context that might help us support you better..."
                  className="mt-2"
                  style={{ borderColor: 'var(--light-gray)' }}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(168, 207, 229, 0.1)' }}>
                {renderStepIcon(4)}
              </div>
              <h2 className="text-2xl mb-2" style={{ color: 'var(--slate-blue)' }}>Customize your experience</h2>
              <p style={{ color: 'var(--slate-blue)' }}>Set your preferences and goals</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label style={{ color: 'var(--slate-blue)' }}>How would you like to interact with the platform?</Label>
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  {interactionOptions.map((option) => (
                    <Card
                      key={option}
                      className={`p-3 cursor-pointer transition-all ${
                        formData.interactionPreferences.includes(option) ? 'ring-2' : ''
                      }`}
                      style={{
                        backgroundColor: formData.interactionPreferences.includes(option) 
                          ? 'rgba(168, 207, 229, 0.1)' 
                          : 'var(--crisp-white)',
                        borderColor: formData.interactionPreferences.includes(option) 
                          ? 'var(--sky-blue)' 
                          : 'var(--light-gray)',
                        ringColor: 'var(--sky-blue)'
                      }}
                      onClick={() => handleArrayToggle(formData.interactionPreferences, option, 'interactionPreferences')}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={formData.interactionPreferences.includes(option)}
                          readOnly
                        />
                        <span style={{ color: 'var(--slate-blue)' }}>{option}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Label style={{ color: 'var(--slate-blue)' }}>Notification Preferences</Label>
                <div className="space-y-3 mt-3">
                  {Object.entries({
                    dailyCheckin: 'Daily mood check-in reminders',
                    weeklyProgress: 'Weekly progress summaries',
                    communityUpdates: 'Community activity updates',
                    crisisAlerts: 'Crisis support notifications'
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(168, 207, 229, 0.05)', border: '1px solid var(--light-gray)' }}>
                      <span style={{ color: 'var(--slate-blue)' }}>{label}</span>
                      <Checkbox
                        checked={formData.notifications[key as keyof typeof formData.notifications]}
                        onCheckedChange={(checked) => setFormData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, [key]: checked }
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label style={{ color: 'var(--slate-blue)' }}>What are your main goals?</Label>
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  {goalOptions.map((goal) => (
                    <Card
                      key={goal}
                      className={`p-3 cursor-pointer transition-all ${
                        formData.goals.includes(goal) ? 'ring-2' : ''
                      }`}
                      style={{
                        backgroundColor: formData.goals.includes(goal) 
                          ? 'rgba(168, 207, 229, 0.1)' 
                          : 'var(--crisp-white)',
                        borderColor: formData.goals.includes(goal) 
                          ? 'var(--sky-blue)' 
                          : 'var(--light-gray)',
                        ringColor: 'var(--sky-blue)'
                      }}
                      onClick={() => handleArrayToggle(formData.goals, goal, 'goals')}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={formData.goals.includes(goal)}
                          readOnly
                        />
                        <span style={{ color: 'var(--slate-blue)' }}>{goal}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(168, 207, 229, 0.1)' }}>
                {renderStepIcon(5)}
              </div>
              <h2 className="text-2xl mb-2" style={{ color: 'var(--slate-blue)' }}>Connect with care</h2>
              <p style={{ color: 'var(--slate-blue)' }}>Set up your support network and safety resources</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label style={{ color: 'var(--slate-blue)' }}>Do you currently have a therapist or would like to connect with one?</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="no-therapist"
                      checked={formData.hasTherapist === 'no'}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        hasTherapist: checked ? 'no' : '' 
                      }))}
                    />
                    <Label htmlFor="no-therapist" style={{ color: 'var(--slate-blue)' }}>No, but I'm interested</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="yes-therapist"
                      checked={formData.hasTherapist === 'yes'}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        hasTherapist: checked ? 'yes' : '' 
                      }))}
                    />
                    <Label htmlFor="yes-therapist" style={{ color: 'var(--slate-blue)' }}>Yes, I have a therapist</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="not-interested"
                      checked={formData.hasTherapist === 'not-interested'}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        hasTherapist: checked ? 'not-interested' : '' 
                      }))}
                    />
                    <Label htmlFor="not-interested" style={{ color: 'var(--slate-blue)' }}>Not interested right now</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="emergency-contact" style={{ color: 'var(--slate-blue)' }}>
                  Emergency Contact (Optional)
                </Label>
                <Input
                  id="emergency-contact"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                  placeholder="Name and phone number"
                  className="mt-2"
                  style={{ borderColor: 'var(--light-gray)' }}
                />
              </div>

              <Card className="p-6" style={{ backgroundColor: 'rgba(255, 111, 97, 0.05)', border: '1px solid var(--coral-accent)' }}>
                <h3 className="mb-4" style={{ color: 'var(--coral-accent)' }}>Crisis Resources</h3>
                <div className="space-y-2 mb-4">
                  <p style={{ color: 'var(--slate-blue)' }}>
                    <strong>National Suicide Prevention Lifeline:</strong> 988
                  </p>
                  <p style={{ color: 'var(--slate-blue)' }}>
                    <strong>Crisis Text Line:</strong> Text HOME to 741741
                  </p>
                  <p style={{ color: 'var(--slate-blue)' }}>
                    <strong>Emergency Services:</strong> 911
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="crisis-acknowledge"
                    checked={formData.crisisResourcesAcknowledged}
                    onCheckedChange={(checked) => setFormData(prev => ({ 
                      ...prev, 
                      crisisResourcesAcknowledged: checked as boolean 
                    }))}
                  />
                  <Label htmlFor="crisis-acknowledge" className="text-sm leading-5" style={{ color: 'var(--slate-blue)' }}>
                    I acknowledge these crisis resources and understand that Depresso is not a substitute for emergency mental health services.
                  </Label>
                </div>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="bg-white border-b" style={{ borderColor: 'var(--light-gray)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={handlePrevious}
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
            <div className="text-sm" style={{ color: 'var(--slate-blue)' }}>
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Card className="p-8" style={{ backgroundColor: 'var(--crisp-white)', border: '1px solid var(--light-gray)' }}>
          {renderStep()}

          <div className="flex justify-between items-center mt-8 pt-6 border-t" style={{ borderColor: 'var(--light-gray)' }}>
            <Button
              variant="outline"
              onClick={handlePrevious}
              style={{ borderColor: 'var(--pastel-blue)', color: 'var(--slate-blue)' }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 1 ? 'Back to Sign Up' : 'Previous'}
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={currentStep === 5 && !formData.crisisResourcesAcknowledged}
              style={{ backgroundColor: 'var(--coral-accent)', color: 'white' }}
            >
              {currentStep === totalSteps ? 'Complete Setup' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;