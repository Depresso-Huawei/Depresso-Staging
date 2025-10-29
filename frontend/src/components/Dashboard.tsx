import { useState, useEffect } from 'react';
import {
  Heart,
  TrendingUp,
  Calendar,
  Activity,
  Phone,
  LogOut,
  Smile,
  Meh,
  Frown,
  Battery,
  Zap,
  Moon,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onSignOut: () => void;
}

interface MoodEntry {
  id: string;
  mood_score: number;
  energy_level: number;
  stress_level: number;
  notes: string | null;
  created_at: string;
}

interface UserProfile {
  full_name: string | null;
}

export function Dashboard({ onSignOut }: DashboardProps) {
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [newMood, setNewMood] = useState({
    mood_score: 5,
    energy_level: 5,
    stress_level: 5,
    notes: '',
  });
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (user) {
      loadProfile();
      loadMoodEntries();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('user_profiles')
      .select('full_name')
      .eq('id', user.id)
      .maybeSingle();
    if (data) setProfile(data);
  };

  const loadMoodEntries = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(7);
    if (data) setMoodEntries(data);
  };

  const handleAddMood = async () => {
    if (!user) return;

    const { error } = await supabase.from('mood_entries').insert({
      user_id: user.id,
      ...newMood,
    });

    if (!error) {
      setShowMoodModal(false);
      setNewMood({ mood_score: 5, energy_level: 5, stress_level: 5, notes: '' });
      loadMoodEntries();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onSignOut();
  };

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 0;
    const sum = moodEntries.reduce((acc, entry) => acc + entry.mood_score, 0);
    return Math.round(sum / moodEntries.length);
  };

  const getMoodIcon = (score: number) => {
    if (score >= 7) return <Smile className="w-6 h-6 text-green-500" />;
    if (score >= 4) return <Meh className="w-6 h-6 text-yellow-500" />;
    return <Frown className="w-6 h-6 text-coral" />;
  };

  const averageMood = getAverageMood();
  const latestEntry = moodEntries[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-coral" fill="#FF6B6B" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">Depresso</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setShowCrisis(!showCrisis)}
                className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 text-coral hover:text-coral-dark transition-colors font-medium rounded-lg hover:bg-coral/10 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 min-h-[44px]"
                aria-label="Crisis resources"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Crisis Help</span>
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 text-gray-600 hover:text-gray-900 transition-colors font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 min-h-[44px]"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showCrisis && (
        <div className="fixed top-16 right-4 bg-white rounded-xl shadow-2xl p-4 sm:p-6 z-40 max-w-sm w-full mx-4 sm:mx-0 sm:w-96 border-2 border-coral">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Crisis Resources</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-coral/10 rounded-lg">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">988 Suicide & Crisis Lifeline</p>
              <a href="tel:988" className="text-xl sm:text-2xl font-bold text-coral hover:text-coral-dark block mt-1 sm:mt-2">
                988
              </a>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">24/7 free and confidential support</p>
            </div>
            <div className="p-3 sm:p-4 bg-soft-blue/10 rounded-lg">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Crisis Text Line</p>
              <p className="text-lg sm:text-xl font-bold text-soft-blue mt-1 sm:mt-2">Text HOME to 741741</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Connect with a Crisis Counselor</p>
            </div>
          </div>
          <button
            onClick={() => setShowCrisis(false)}
            className="mt-4 w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 min-h-[44px]"
          >
            Close
          </button>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}!
          </h1>
          <p className="text-base sm:text-lg text-gray-600">How are you feeling today?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Wellness Journey</h2>
              <button
                onClick={() => setShowMoodModal(true)}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-coral hover:bg-coral-dark text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-coral focus:ring-offset-2 min-h-[44px]"
              >
                Log Today's Mood
              </button>
            </div>

            {latestEntry ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-coral/10 to-coral/5 p-4 sm:p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-600">Mood</span>
                      {getMoodIcon(latestEntry.mood_score)}
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                      {latestEntry.mood_score}/10
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-4 sm:p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-600">Energy</span>
                      <Zap className="w-6 h-6 text-yellow-600" />
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                      {latestEntry.energy_level}/10
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-soft-blue/10 to-soft-blue/5 p-4 sm:p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-600">Stress</span>
                      <Activity className="w-6 h-6 text-soft-blue" />
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                      {latestEntry.stress_level}/10
                    </p>
                  </div>
                </div>

                {moodEntries.length > 1 && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">7-Day Trend</h3>
                    <div className="flex items-end justify-between h-32 sm:h-40 gap-2">
                      {moodEntries.slice(0, 7).reverse().map((entry, index) => {
                        const height = (entry.mood_score / 10) * 100;
                        return (
                          <div key={entry.id} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-gradient-to-t from-coral to-soft-blue rounded-t-lg transition-all hover:opacity-80"
                              style={{ height: `${height}%` }}
                              title={`Mood: ${entry.mood_score}/10`}
                            />
                            <span className="text-xs text-gray-500 mt-2">
                              {new Date(entry.created_at).toLocaleDateString('en-US', { weekday: 'short' })}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg text-gray-600 mb-6">No mood entries yet. Start tracking today!</p>
                <button
                  onClick={() => setShowMoodModal(true)}
                  className="px-6 py-3 bg-coral hover:bg-coral-dark text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-coral focus:ring-offset-2 min-h-[44px]"
                >
                  Log Your First Mood
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-soft-blue/20 to-soft-blue/10 rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-soft-blue" />
                <h3 className="text-lg font-bold text-gray-900">Weekly Average</h3>
              </div>
              <p className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                {averageMood > 0 ? `${averageMood}/10` : 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                {averageMood >= 7
                  ? 'You\'re doing great! Keep it up.'
                  : averageMood >= 4
                  ? 'Making progress. Stay consistent.'
                  : averageMood > 0
                  ? 'We\'re here for you. Consider reaching out.'
                  : 'Start tracking to see your progress.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-6 h-6 text-coral" />
                <h3 className="text-lg font-bold text-gray-900">Check-In Streak</h3>
              </div>
              <p className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                {moodEntries.length}
              </p>
              <p className="text-sm text-gray-600">Total check-ins completed</p>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Moon className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-900">Daily Tip</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Take 5 minutes today for deep breathing. Inhale for 4 counts, hold for 4, exhale for 4. This simple practice can reduce stress and anxiety.
              </p>
            </div>
          </div>
        </div>
      </main>

      {showMoodModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">How are you feeling?</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Overall Mood
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newMood.mood_score}
                  onChange={(e) => setNewMood({ ...newMood, mood_score: parseInt(e.target.value) })}
                  className="w-full h-3 bg-gradient-to-r from-coral to-soft-blue rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-600">Low</span>
                  <span className="text-2xl font-bold text-coral">{newMood.mood_score}</span>
                  <span className="text-sm text-gray-600">High</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Energy Level
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newMood.energy_level}
                  onChange={(e) => setNewMood({ ...newMood, energy_level: parseInt(e.target.value) })}
                  className="w-full h-3 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-600">Tired</span>
                  <span className="text-2xl font-bold text-yellow-600">{newMood.energy_level}</span>
                  <span className="text-sm text-gray-600">Energized</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Stress Level
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newMood.stress_level}
                  onChange={(e) => setNewMood({ ...newMood, stress_level: parseInt(e.target.value) })}
                  className="w-full h-3 bg-gradient-to-r from-green-400 to-red-400 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-600">Calm</span>
                  <span className="text-2xl font-bold text-soft-blue">{newMood.stress_level}</span>
                  <span className="text-sm text-gray-600">Stressed</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Notes (Optional)
                </label>
                <textarea
                  value={newMood.notes}
                  onChange={(e) => setNewMood({ ...newMood, notes: e.target.value })}
                  placeholder="How are you feeling? What's on your mind?"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none transition-all resize-none text-base"
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowMoodModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 min-h-[44px]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMood}
                className="flex-1 px-6 py-3 bg-coral hover:bg-coral-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-4 focus:ring-coral focus:ring-offset-2 min-h-[44px]"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
