import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../lib/utils';
import { TrendingUp, Smile, Meh, Frown, Heart, Zap } from 'lucide-react';

interface MoodLog {
  id: string;
  mood_type: string;
  mood_score: number;
  energy_level: number;
  notes: string;
  created_at: string;
}

const moodIcons: Record<string, any> = {
  happy: Smile,
  calm: Heart,
  neutral: Meh,
  anxious: Zap,
  sad: Frown,
};

const moodColors: Record<string, string> = {
  happy: 'bg-green-100 text-green-700',
  calm: 'bg-blue-100 text-blue-700',
  neutral: 'bg-slate-100 text-slate-700',
  anxious: 'bg-yellow-100 text-yellow-700',
  sad: 'bg-orange-100 text-orange-700',
};

export function MoodHistory({ refresh }: { refresh: number }) {
  const { user } = useAuth();
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchMoodLogs = async () => {
      const { data, error } = await supabase
        .from('mood_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && data) {
        setMoodLogs(data);
      }
      setLoading(false);
    };

    fetchMoodLogs();
  }, [user, refresh]);

  const averageMood = moodLogs.length > 0
    ? (moodLogs.reduce((sum, log) => sum + log.mood_score, 0) / moodLogs.length).toFixed(1)
    : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Mood History</CardTitle>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <TrendingUp className="w-4 h-4" />
            <span>Avg: {averageMood}/10</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-slate-500 text-center py-4">Loading...</p>
        ) : moodLogs.length === 0 ? (
          <p className="text-slate-500 text-center py-4">No mood logs yet. Start tracking!</p>
        ) : (
          <div className="space-y-3">
            {moodLogs.map((log) => {
              const Icon = moodIcons[log.mood_type] || Meh;
              const colorClass = moodColors[log.mood_type] || 'bg-slate-100 text-slate-700';

              return (
                <div
                  key={log.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-800 capitalize">
                        {log.mood_type}
                      </span>
                      <span className="text-xs text-slate-500">
                        {formatDate(log.created_at)}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 mb-1">
                      Mood: {log.mood_score}/10 • Energy: {log.energy_level}/10
                    </div>
                    {log.notes && (
                      <p className="text-sm text-slate-500 line-clamp-2">{log.notes}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
