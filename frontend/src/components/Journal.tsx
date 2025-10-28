import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Mic, Video, Type, Send, Lightbulb, Heart } from 'lucide-react';

const Journal: React.FC = () => {
  const [inputMethod, setInputMethod] = useState<'text' | 'speech' | 'video'>('text');
  const [journalEntry, setJournalEntry] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showCBTPrompts, setShowCBTPrompts] = useState(false);

  const cbtPrompts = [
    "What evidence supports this thought? What evidence contradicts it?",
    "How would you advise a friend who had this thought?",
    "What's the worst that could realistically happen? How would you cope?",
    "Is this thought helpful or harmful to your wellbeing?",
    "What would be a more balanced way to think about this situation?"
  ];

  const recentEntries = [
    {
      id: 1,
      date: '2024-01-15',
      preview: 'Today I felt grateful for small moments...',
      mood: 7,
      sentiment: 'positive'
    },
    {
      id: 2,
      date: '2024-01-14',
      preview: 'Feeling a bit overwhelmed with work...',
      mood: 5,
      sentiment: 'mixed'
    },
    {
      id: 3,
      date: '2024-01-13',
      preview: 'Had a wonderful conversation with a friend...',
      mood: 8,
      sentiment: 'positive'
    }
  ];

  const handleSaveEntry = () => {
    if (journalEntry.trim()) {
      // Here would be the API call to save the entry
      setJournalEntry('');
      setShowCBTPrompts(true);
    }
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    // Audio/video recording logic would go here
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl mb-2" style={{ color: 'var(--slate-blue)' }}>
          Mindful Moments AI Journal ✨
        </h1>
        <p style={{ color: 'var(--slate-blue)' }}>
          Share your thoughts in whatever way feels comfortable - text, voice, or video.
        </p>
      </div>

      {/* Input Method Selection */}
      <Card className="p-6" style={{ backgroundColor: 'var(--crisp-white)', border: '1px solid var(--light-gray)' }}>
        <h2 className="text-lg mb-4" style={{ color: 'var(--slate-blue)' }}>
          How would you like to express yourself today?
        </h2>
        
        <div className="flex gap-4 mb-6">
          <Button
            variant={inputMethod === 'text' ? 'default' : 'outline'}
            onClick={() => setInputMethod('text')}
            className="flex items-center space-x-2"
            style={inputMethod === 'text' ? { backgroundColor: 'var(--sky-blue)', color: 'white' } : { borderColor: 'var(--pastel-blue)', color: 'var(--slate-blue)' }}
          >
            <Type className="w-4 h-4" />
            <span>Text</span>
          </Button>
          
          <Button
            variant={inputMethod === 'speech' ? 'default' : 'outline'}
            onClick={() => setInputMethod('speech')}
            className="flex items-center space-x-2"
            style={inputMethod === 'speech' ? { backgroundColor: 'var(--sky-blue)', color: 'white' } : { borderColor: 'var(--pastel-blue)', color: 'var(--slate-blue)' }}
          >
            <Mic className="w-4 h-4" />
            <span>Voice</span>
          </Button>
          
          <Button
            variant={inputMethod === 'video' ? 'default' : 'outline'}
            onClick={() => setInputMethod('video')}
            className="flex items-center space-x-2"
            style={inputMethod === 'video' ? { backgroundColor: 'var(--sky-blue)', color: 'white' } : { borderColor: 'var(--pastel-blue)', color: 'var(--slate-blue)' }}
          >
            <Video className="w-4 h-4" />
            <span>Video</span>
          </Button>
        </div>

        {/* Text Input */}
        {inputMethod === 'text' && (
          <div className="space-y-4">
            <Textarea
              placeholder="What's on your mind? Share your thoughts, feelings, or experiences..."
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="min-h-32"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--slate-blue)' }}>
                {journalEntry.length} characters
              </span>
              <Button
                onClick={handleSaveEntry}
                disabled={!journalEntry.trim()}
                className="flex items-center space-x-2"
                style={{ backgroundColor: 'var(--coral-accent)', color: 'white' }}
              >
                <Send className="w-4 h-4" />
                <span>Save Entry</span>
              </Button>
            </div>
          </div>
        )}

        {/* Voice Input */}
        {inputMethod === 'speech' && (
          <div className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto rounded-full border-4 flex items-center justify-center" style={{ borderColor: 'var(--pastel-blue)' }}>
              <Mic 
                className="w-12 h-12"
                style={{ color: isRecording ? '#EF4444' : 'var(--slate-blue)' }}
              />
            </div>
            <Button
              onClick={handleRecord}
              className="flex items-center space-x-2"
              style={isRecording 
                ? { backgroundColor: '#EF4444', color: 'white' } 
                : { backgroundColor: 'var(--coral-accent)', color: 'white' }
              }
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            {isRecording && (
              <p className="text-sm" style={{ color: 'var(--slate-blue)' }}>
                Recording... Speak naturally about your thoughts and feelings.
              </p>
            )}
          </div>
        )}

        {/* Video Input */}
        {inputMethod === 'video' && (
          <div className="text-center space-y-4">
            <div className="w-48 h-36 mx-auto rounded-lg border-4 flex items-center justify-center" 
                 style={{ borderColor: 'var(--pastel-blue)', backgroundColor: 'var(--light-gray)' }}>
              <Video 
                className="w-12 h-12"
                style={{ color: 'var(--slate-blue)' }}
              />
            </div>
            <Button
              onClick={handleRecord}
              className="flex items-center space-x-2"
              style={isRecording 
                ? { backgroundColor: '#EF4444', color: 'white' } 
                : { backgroundColor: 'var(--coral-accent)', color: 'white' }
              }
            >
              <Video className="w-4 h-4" />
              {isRecording ? 'Stop Recording' : 'Start Video Journal'}
            </Button>
          </div>
        )}
      </Card>

      {/* CBT Prompts */}
      {showCBTPrompts && (
        <Card className="p-6" style={{ backgroundColor: 'rgba(168, 207, 229, 0.08)', border: '1px solid var(--pastel-blue)' }}>
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-6 h-6" style={{ color: 'var(--coral-accent)' }} />
            <h3 className="text-lg" style={{ color: 'var(--slate-blue)' }}>
              Gentle Reflection Prompts
            </h3>
          </div>
          <p style={{ color: 'var(--slate-blue)' }} className="mb-4">
            Based on your entry, here are some thoughtful questions to explore:
          </p>
          <div className="space-y-3">
            {cbtPrompts.slice(0, 3).map((prompt, index) => (
              <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--crisp-white)', border: '1px solid var(--light-gray)' }}>
                <p style={{ color: 'var(--slate-blue)' }}>{prompt}</p>
              </div>
            ))}
          </div>
          <Button
            className="w-full mt-4"
            variant="outline"
            onClick={() => setShowCBTPrompts(false)}
            style={{ borderColor: 'var(--pastel-blue)', color: 'var(--slate-blue)' }}
          >
            Reflect on These Later
          </Button>
        </Card>
      )}

      {/* Recent Entries */}
      <Card className="p-6" style={{ backgroundColor: 'var(--crisp-white)', border: '1px solid var(--light-gray)' }}>
        <h2 className="text-lg mb-4" style={{ color: 'var(--slate-blue)' }}>Recent Entries</h2>
        <div className="space-y-4">
          {recentEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-lg cursor-pointer transition-colors"
              style={{ 
                border: '1px solid var(--light-gray)',
                backgroundColor: 'var(--crisp-white)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(168, 207, 229, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--crisp-white)';
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm" style={{ color: 'var(--slate-blue)' }}>{entry.date}</span>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: entry.sentiment === 'positive' 
                        ? 'rgba(168, 207, 229, 0.2)' 
                        : entry.sentiment === 'mixed'
                        ? 'rgba(255, 251, 235, 1)'
                        : 'rgba(254, 242, 242, 1)',
                      color: entry.sentiment === 'positive' 
                        ? 'var(--sky-blue)' 
                        : entry.sentiment === 'mixed'
                        ? '#92400e'
                        : '#991b1b'
                    }}
                  >
                    {entry.sentiment}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" style={{ color: 'var(--coral-accent)' }} />
                    <span className="text-sm" style={{ color: 'var(--slate-blue)' }}>{entry.mood}/10</span>
                  </div>
                </div>
              </div>
              <p style={{ color: 'var(--slate-blue)' }}>{entry.preview}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Journal;