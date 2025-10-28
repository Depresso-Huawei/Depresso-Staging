import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Activity, 
  Brain, 
  Clock, 
  TrendingUp, 
  Calendar, 
  Target,
  CheckCircle,
  PlayCircle,
  BarChart3
} from 'lucide-react';

const WellnessTracker: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<number | null>(null);

  const typingDynamics = {
    avgSpeed: 68,
    pausePatterns: 'Contemplative',
    emotionalIndicators: ['Thoughtful pauses', 'Steady rhythm', 'Confident corrections'],
    stressLevel: 'Low',
    engagement: 'High'
  };

  const dailyActivities = [
    {
      id: 1,
      title: 'Morning Mindfulness',
      description: '5-minute breathing meditation',
      duration: 5,
      completed: true,
      category: 'mindfulness',
      streak: 7
    },
    {
      id: 2,
      title: 'Gratitude Practice',
      description: 'Write 3 things you\'re grateful for',
      duration: 10,
      completed: true,
      category: 'gratitude',
      streak: 5
    },
    {
      id: 3,
      title: 'Nature Connection',
      description: 'Spend time outdoors or with plants',
      duration: 15,
      completed: false,
      category: 'nature',
      streak: 3
    },
    {
      id: 4,
      title: 'Positive Affirmations',
      description: 'Speak kindly to yourself',
      duration: 8,
      completed: false,
      category: 'self-compassion',
      streak: 0
    }
  ];

  const cognitiveScenarios = [
    {
      id: 1,
      title: 'The Job Interview Worry',
      situation: 'You have an important job interview tomorrow and keep thinking "I\'ll definitely mess this up."',
      originalThought: 'I\'ll mess this up and they\'ll think I\'m incompetent.',
      alternatives: [
        'I\'ve prepared well and have valuable skills to offer.',
        'Even if it doesn\'t go perfectly, I can learn from the experience.',
        'Nervousness is normal and shows that I care about this opportunity.'
      ],
      completed: false
    },
    {
      id: 2,
      title: 'Social Media Comparison',
      situation: 'Scrolling through social media makes you feel like everyone else has their life together.',
      originalThought: 'Everyone is more successful and happier than me.',
      alternatives: [
        'People typically share their highlights, not their struggles.',
        'My journey is unique and comparing isn\'t fair to myself.',
        'I can celebrate others\' successes without diminishing my own worth.'
      ],
      completed: true
    },
    {
      id: 3,
      title: 'Friend Didn\'t Respond',
      situation: 'Your friend hasn\'t responded to your message in two days.',
      originalThought: 'They must be angry with me or don\'t want to be friends anymore.',
      alternatives: [
        'They might be busy with work, family, or personal matters.',
        'Some people take longer to respond to messages.',
        'I can check in again without assuming the worst.'
      ],
      completed: false
    }
  ];

  const weeklyProgress = {
    mindfulness: 85,
    mood: 78,
    activities: 60,
    sleep: 75,
    social: 90
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl mb-2" style={{ color: 'var(--slate-blue)' }}>
          Wellness Tracker & Growth 📊
        </h1>
        <p className="text-gray-600">
          Track your progress and build healthy patterns that support your wellbeing.
        </p>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Expressive Analytics</TabsTrigger>
          <TabsTrigger value="activities">Daily Activities</TabsTrigger>
          <TabsTrigger value="reframing">Cognitive Reframing</TabsTrigger>
        </TabsList>

        {/* Expressive Dynamics Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="w-6 h-6" style={{ color: 'var(--slate-blue)' }} />
              <h2 className="text-lg" style={{ color: 'var(--slate-blue)' }}>
                Expressive Dynamics Analysis
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Understanding your emotional patterns through typing behavior and interaction data.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Typing Speed</span>
                    <span style={{ color: 'var(--slate-blue)' }}>{typingDynamics.avgSpeed} WPM</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Emotional Engagement</span>
                    <Badge style={{ backgroundColor: 'var(--soft-mint)', color: 'white' }}>
                      {typingDynamics.engagement}
                    </Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Stress Indicators</span>
                    <Badge style={{ backgroundColor: 'var(--pastel-blue)', color: 'white' }}>
                      {typingDynamics.stressLevel}
                    </Badge>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium" style={{ color: 'var(--slate-blue)' }}>
                  Pattern Recognition
                </h3>
                <div className="space-y-2">
                  {typingDynamics.emotionalIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: 'var(--soft-mint)' }}
                      />
                      <span className="text-sm text-gray-600">{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Weekly Progress Overview */}
          <Card className="p-6">
            <h2 className="text-lg mb-4" style={{ color: 'var(--slate-blue)' }}>
              Weekly Progress Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(weeklyProgress).map(([category, progress]) => (
                <div key={category} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full border-4 flex items-center justify-center"
                       style={{ 
                         borderColor: 'var(--pastel-blue)',
                         backgroundColor: `rgba(168, 207, 229, ${progress / 100})`
                       }}>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <span className="text-xs text-gray-600 capitalize">{category}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Daily Activities */}
        <TabsContent value="activities" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-6 h-6" style={{ color: 'var(--slate-blue)' }} />
                <h2 className="text-lg" style={{ color: 'var(--slate-blue)' }}>
                  My Wellness Plan
                </h2>
              </div>
              <Badge style={{ backgroundColor: 'var(--soft-mint)', color: 'white' }}>
                2/4 Completed Today
              </Badge>
            </div>

            <div className="grid gap-4">
              {dailyActivities.map((activity) => (
                <Card key={activity.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        activity.completed 
                          ? 'bg-soft-mint border-soft-mint text-white' 
                          : 'border-gray-300'
                      }`}
                      style={activity.completed ? { 
                        backgroundColor: 'var(--soft-mint)', 
                        borderColor: 'var(--soft-mint)' 
                      } : {}}>
                        {activity.completed && <CheckCircle className="w-4 h-4" />}
                      </div>
                      
                      <div>
                        <h3 className="font-medium">{activity.title}</h3>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {activity.duration} min
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Target className="w-3 h-3 mr-1" />
                            {activity.streak} day streak
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant={activity.completed ? "outline" : "default"}
                      size="sm"
                      className="flex items-center space-x-2"
                      style={!activity.completed ? { backgroundColor: 'var(--coral-accent)' } : {}}
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>{activity.completed ? 'Review' : 'Start'}</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Cognitive Reframing */}
        <TabsContent value="reframing" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Brain className="w-6 h-6" style={{ color: 'var(--slate-blue)' }} />
              <h2 className="text-lg" style={{ color: 'var(--slate-blue)' }}>
                Cognitive Reframing Scenarios
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Practice challenging negative thought patterns with guided "what if" scenarios.
            </p>

            <div className="space-y-4">
              {cognitiveScenarios.map((scenario) => (
                <Card key={scenario.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium flex-1">{scenario.title}</h3>
                    <Badge
                      variant={scenario.completed ? "default" : "secondary"}
                      style={scenario.completed ? { backgroundColor: 'var(--soft-mint)' } : {}}
                    >
                      {scenario.completed ? 'Completed' : 'Practice'}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{scenario.situation}</p>
                  
                  {activeScenario === scenario.id ? (
                    <div className="space-y-4">
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">Original Thought:</h4>
                        <p className="text-red-700">{scenario.originalThought}</p>
                      </div>
                      
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Alternative Perspectives:</h4>
                        <div className="space-y-2">
                          {scenario.alternatives.map((alt, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <span className="text-green-600 font-medium">{index + 1}.</span>
                              <p className="text-green-700">{alt}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => setActiveScenario(null)}
                          variant="outline"
                          size="sm"
                        >
                          Close
                        </Button>
                        <Button
                          size="sm"
                          style={{ backgroundColor: 'var(--coral-accent)' }}
                        >
                          Mark as Practiced
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setActiveScenario(scenario.id)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Practice This Scenario
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WellnessTracker;