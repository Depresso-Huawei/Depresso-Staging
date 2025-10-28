import React from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Smile, TrendingUp, Calendar, MessageCircle, Heart } from 'lucide-react';

const Dashboard: React.FC = () => {
  const moodData = [
    { day: 'Mon', mood: 7 },
    { day: 'Tue', mood: 6 },
    { day: 'Wed', mood: 8 },
    { day: 'Thu', mood: 5 },
    { day: 'Fri', mood: 7 },
    { day: 'Sat', mood: 9 },
    { day: 'Sun', mood: 8 },
  ];

  const todaysActivities = [
    { id: 1, title: 'Morning Breathing Exercise', completed: true, time: '5 min' },
    { id: 2, title: 'Depression Check-in Journal', completed: false, time: '10 min' },
    { id: 3, title: 'Gentle Movement Activity', completed: false, time: '15 min' },
    { id: 4, title: 'CBT Thought Challenge', completed: false, time: '12 min' },
    { id: 5, title: 'Evening Self-Compassion Practice', completed: false, time: '8 min' },
  ];

  const completedActivities = todaysActivities.filter(activity => activity.completed).length;
  const progressPercentage = (completedActivities / todaysActivities.length) * 100;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl mb-2" style={{ color: 'var(--slate-blue)' }}>
          Welcome to your personalized wellness space! 🌟
        </h1>
        <p style={{ color: 'var(--slate-blue)' }}>
          Based on your assessment, we've created a tailored plan just for you. How are you feeling today?
        </p>
      </div>

      {/* Quick Mood Check */}
      <Card className="p-6" style={{ backgroundColor: 'var(--crisp-white)', border: '1px solid var(--light-gray)' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg" style={{ color: 'var(--slate-blue)' }}>Quick Mood Check</h2>
          <Smile className="w-6 h-6" style={{ color: 'var(--sky-blue)' }} />
        </div>
        <p style={{ color: 'var(--slate-blue)' }} className="mb-4">How would you rate your mood right now?</p>
        <div className="flex justify-between items-center space-x-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
            <button
              key={rating}
              className="w-10 h-10 rounded-full border-2 hover:text-white transition-all duration-200 flex items-center justify-center"
              style={{ 
                borderColor: 'var(--pastel-blue)',
                color: 'var(--slate-blue)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--pastel-blue)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--slate-blue)';
              }}
            >
              {rating}
            </button>
          ))}
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6" style={{ backgroundColor: 'var(--crisp-white)', border: '1px solid var(--light-gray)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: 'var(--slate-blue)' }}>Weekly Average</p>
              <p className="text-2xl" style={{ color: 'var(--sky-blue)' }}>7.1</p>
            </div>
            <TrendingUp className="w-8 h-8" style={{ color: 'var(--pastel-blue)' }} />
          </div>
        </Card>

        <Card className="p-6" style={{ backgroundColor: 'var(--crisp-white)', border: '1px solid var(--light-gray)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: 'var(--slate-blue)' }}>Journal Entries</p>
              <p className="text-2xl" style={{ color: 'var(--sky-blue)' }}>12</p>
            </div>
            <MessageCircle className="w-8 h-8" style={{ color: 'var(--pastel-blue)' }} />
          </div>
        </Card>

        <Card className="p-6" style={{ backgroundColor: 'var(--crisp-white)', border: '1px solid var(--light-gray)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: 'var(--slate-blue)' }}>Wellness Streak</p>
              <p className="text-2xl" style={{ color: 'var(--sky-blue)' }}>5 days</p>
            </div>
            <Heart className="w-8 h-8" style={{ color: 'var(--coral-accent)' }} />
          </div>
        </Card>
      </div>

      {/* Today's Wellness Plan */}
      <Card className="p-6" style={{ backgroundColor: 'var(--crisp-white)', border: '1px solid var(--light-gray)' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg" style={{ color: 'var(--slate-blue)' }}>Today's Wellness Plan</h2>
          <Calendar className="w-6 h-6" style={{ color: 'var(--sky-blue)' }} />
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span style={{ color: 'var(--slate-blue)' }}>Daily Progress</span>
            <span style={{ color: 'var(--sky-blue)' }}>
              {completedActivities}/{todaysActivities.length} completed
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="space-y-3">
          {todaysActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg border"
              style={{
                backgroundColor: activity.completed ? 'rgba(168, 207, 229, 0.1)' : 'var(--crisp-white)',
                borderColor: activity.completed ? 'var(--pastel-blue)' : 'var(--light-gray)'
              }}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full border-2"
                  style={activity.completed 
                    ? { backgroundColor: 'var(--sky-blue)', borderColor: 'var(--sky-blue)' }
                    : { borderColor: 'var(--light-gray)' }
                  }
                />
                <span 
                  className={activity.completed ? 'line-through' : ''}
                  style={{ color: activity.completed ? 'var(--slate-blue)' : 'var(--slate-blue)' }}
                >
                  {activity.title}
                </span>
              </div>
              <span className="text-sm" style={{ color: 'var(--slate-blue)' }}>{activity.time}</span>
            </div>
          ))}
        </div>

        <Button 
          className="w-full mt-4"
          style={{ backgroundColor: 'var(--coral-accent)', color: 'white' }}
        >
          Start Next Activity
        </Button>
      </Card>

      {/* Mood Trends */}
      <Card className="p-6" style={{ backgroundColor: 'var(--crisp-white)', border: '1px solid var(--light-gray)' }}>
        <h2 className="text-lg mb-4" style={{ color: 'var(--slate-blue)' }}>This Week's Mood</h2>
        <div className="flex justify-between items-end h-32">
          {moodData.map((data, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className="w-8 rounded-t-lg"
                style={{
                  height: `${(data.mood / 10) * 100}%`,
                  backgroundColor: 'var(--sky-blue)',
                  minHeight: '20px'
                }}
              />
              <span className="text-xs" style={{ color: 'var(--slate-blue)' }}>{data.day}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;