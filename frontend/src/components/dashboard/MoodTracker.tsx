import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Textarea } from '../ui/Textarea';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Smile, Meh, Frown, Heart, Zap, Loader2 } from 'lucide-react';

const moods = [
  { type: 'happy', label: 'Happy', icon: Smile, color: 'bg-green-100 text-green-600 hover:bg-green-200' },
  { type: 'calm', label: 'Calm', icon: Heart, color: 'bg-blue-100 text-blue-600 hover:bg-blue-200' },
  { type: 'neutral', label: 'Neutral', icon: Meh, color: 'bg-slate-100 text-slate-600 hover:bg-slate-200' },
  { type: 'anxious', label: 'Anxious', icon: Zap, color: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' },
  { type: 'sad', label: 'Sad', icon: Frown, color: 'bg-orange-100 text-orange-600 hover:bg-orange-200' },
];

export function MoodTracker({ onMoodLogged }: { onMoodLogged: () => void }) {
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState('');
  const [moodScore, setMoodScore] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedMood) return;

    setLoading(true);
    const { error } = await supabase.from('mood_logs').insert({
      user_id: user.id,
      mood_type: selectedMood,
      mood_score: moodScore,
      energy_level: energyLevel,
      notes: notes,
    });

    setLoading(false);

    if (!error) {
      setSuccess(true);
      setSelectedMood('');
      setMoodScore(5);
      setEnergyLevel(5);
      setNotes('');
      setTimeout(() => setSuccess(false), 3000);
      onMoodLogged();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Select your mood
            </label>
            <div className="grid grid-cols-5 gap-2">
              {moods.map(({ type, label, icon: Icon, color }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedMood(type)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                    selectedMood === type
                      ? 'ring-2 ring-teal-500 ' + color
                      : color
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Mood intensity: {moodScore}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={moodScore}
              onChange={(e) => setMoodScore(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Energy level: {energyLevel}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>

          <Textarea
            label="Notes (optional)"
            placeholder="What's on your mind?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />

          {success && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
              Mood logged successfully!
            </div>
          )}

          <Button type="submit" className="w-full" disabled={!selectedMood || loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging Mood...
              </>
            ) : (
              'Log Mood'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
