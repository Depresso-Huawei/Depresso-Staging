import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface QuestionnaireProps {
  onComplete: () => void;
}

const QUESTIONNAIRE_STEPS = [
  {
    step: 1,
    title: 'Tell us about yourself',
    questions: [
      {
        key: 'age_range',
        label: 'What is your age range?',
        type: 'select' as const,
        options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
        required: true,
      },
      {
        key: 'gender',
        label: 'How do you identify?',
        type: 'select' as const,
        options: ['Male', 'Female', 'Non-binary', 'Prefer not to say', 'Other'],
        required: true,
      },
    ],
  },
  {
    step: 2,
    title: 'Your mental health goals',
    questions: [
      {
        key: 'primary_goals',
        label: 'What are your primary mental health goals?',
        type: 'multiselect' as const,
        options: [
          'Reduce anxiety',
          'Manage depression',
          'Improve sleep',
          'Build resilience',
          'Manage stress',
          'Improve relationships',
          'Increase self-awareness',
          'Other',
        ],
        required: true,
      },
    ],
  },
  {
    step: 3,
    title: 'Current well-being',
    questions: [
      {
        key: 'current_mood',
        label: 'How would you rate your overall mood this week?',
        type: 'scale' as const,
        min: 1,
        max: 10,
        minLabel: 'Very low',
        maxLabel: 'Excellent',
        required: true,
      },
      {
        key: 'energy_level',
        label: 'How would you rate your energy levels?',
        type: 'scale' as const,
        min: 1,
        max: 10,
        minLabel: 'Exhausted',
        maxLabel: 'Energized',
        required: true,
      },
    ],
  },
  {
    step: 4,
    title: 'Support preferences',
    questions: [
      {
        key: 'therapy_experience',
        label: 'Have you worked with a mental health professional before?',
        type: 'select' as const,
        options: ['Yes, currently', 'Yes, in the past', 'No, but interested', 'No, not interested'],
        required: true,
      },
      {
        key: 'preferred_support',
        label: 'What type of support are you looking for?',
        type: 'multiselect' as const,
        options: [
          'Daily check-ins',
          'Mood tracking',
          'Guided exercises',
          'Educational resources',
          'Community support',
          'Professional referrals',
        ],
        required: true,
      },
    ],
  },
  {
    step: 5,
    title: 'Lifestyle and habits',
    questions: [
      {
        key: 'sleep_quality',
        label: 'How would you rate your sleep quality?',
        type: 'scale' as const,
        min: 1,
        max: 10,
        minLabel: 'Very poor',
        maxLabel: 'Excellent',
        required: true,
      },
      {
        key: 'exercise_frequency',
        label: 'How often do you exercise?',
        type: 'select' as const,
        options: ['Daily', '3-5 times per week', '1-2 times per week', 'Rarely', 'Never'],
        required: true,
      },
      {
        key: 'stress_triggers',
        label: 'What are your main sources of stress?',
        type: 'multiselect' as const,
        options: ['Work', 'Relationships', 'Health', 'Finances', 'Family', 'School', 'Other'],
        required: true,
      },
    ],
  },
];

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const currentStepData = QUESTIONNAIRE_STEPS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONNAIRE_STEPS.length) * 100;

  const handleResponse = (key: string, value: any) => {
    setResponses({ ...responses, [key]: value });
  };

  const handleMultiSelectToggle = (key: string, option: string) => {
    const current = responses[key] || [];
    const updated = current.includes(option)
      ? current.filter((item: string) => item !== option)
      : [...current, option];
    handleResponse(key, updated);
  };

  const isStepValid = () => {
    return currentStepData.questions.every((q) => {
      if (!q.required) return true;
      const value = responses[q.key];
      if (q.type === 'multiselect') {
        return Array.isArray(value) && value.length > 0;
      }
      return value !== undefined && value !== null && value !== '';
    });
  };

  const handleNext = async () => {
    if (!isStepValid()) return;

    if (currentStep < QUESTIONNAIRE_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const responseEntries = Object.entries(responses).map(([key, value], index) => {
        const stepNumber = QUESTIONNAIRE_STEPS.findIndex((step) =>
          step.questions.some((q) => q.key === key)
        ) + 1;

        return {
          user_id: user.id,
          step_number: stepNumber,
          question_key: key,
          response_value: value,
        };
      });

      const { error: responseError } = await supabase
        .from('questionnaire_responses')
        .insert(responseEntries);

      if (responseError) throw responseError;

      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({ onboarding_completed: true })
        .eq('id', user.id);

      if (profileError) throw profileError;

      onComplete();
    } catch (error) {
      console.error('Error saving responses:', error);
      alert('Failed to save your responses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-600">
              Step {currentStep + 1} of {QUESTIONNAIRE_STEPS.length}
            </span>
            <span className="text-sm font-semibold text-coral">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-coral to-soft-blue transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            {currentStepData.title}
          </h2>

          <div className="space-y-6 sm:space-y-8">
            {currentStepData.questions.map((question) => (
              <div key={question.key}>
                <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  {question.label}
                  {question.required && <span className="text-coral ml-1">*</span>}
                </label>

                {question.type === 'select' && (
                  <select
                    value={responses[question.key] || ''}
                    onChange={(e) => handleResponse(question.key, e.target.value)}
                    className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all text-base min-h-[44px]"
                    required={question.required}
                  >
                    <option value="">Select an option</option>
                    {question.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {question.type === 'multiselect' && (
                  <div className="space-y-3">
                    {question.options?.map((option) => {
                      const isSelected = (responses[question.key] || []).includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleMultiSelectToggle(question.key, option)}
                          className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-2 transition-all text-left flex items-center justify-between min-h-[44px] ${
                            isSelected
                              ? 'border-coral bg-coral/10 text-gray-900'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <span className="text-base">{option}</span>
                          {isSelected && (
                            <Check className="w-5 h-5 text-coral flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {question.type === 'scale' && (
                  <div className="space-y-4">
                    <input
                      type="range"
                      min={question.min}
                      max={question.max}
                      value={responses[question.key] || question.min}
                      onChange={(e) => handleResponse(question.key, parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #FF6B6B 0%, #4A90E2 100%)`,
                      }}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{question.minLabel}</span>
                      <span className="text-2xl font-bold text-coral">
                        {responses[question.key] || question.min}
                      </span>
                      <span className="text-sm text-gray-600">{question.maxLabel}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center justify-center space-x-2 px-6 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 min-h-[44px] sm:w-auto"
                disabled={loading}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!isStepValid() || loading}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 sm:py-4 bg-coral hover:bg-coral-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-coral focus:ring-offset-2 min-h-[44px]"
            >
              <span>
                {loading
                  ? 'Saving...'
                  : currentStep === QUESTIONNAIRE_STEPS.length - 1
                  ? 'Complete'
                  : 'Continue'}
              </span>
              {!loading && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
