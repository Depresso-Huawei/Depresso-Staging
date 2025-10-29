import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { MoodTracker } from '../components/dashboard/MoodTracker';
import { JournalEntry } from '../components/dashboard/JournalEntry';
import { MoodHistory } from '../components/dashboard/MoodHistory';
import { Resources } from '../components/dashboard/Resources';
import { Heart, LogOut } from 'lucide-react';
import { getGreeting } from '../lib/utils';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [moodRefresh, setMoodRefresh] = useState(0);
  const [journalRefresh, setJournalRefresh] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Depresso</h1>
                <p className="text-sm text-slate-600">Your mental wellness companion</p>
              </div>
            </div>
            <Button variant="ghost" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            {getGreeting()}, {user?.email?.split('@')[0]}!
          </h2>
          <p className="text-slate-600">
            Take a moment to check in with yourself today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MoodTracker onMoodLogged={() => setMoodRefresh(prev => prev + 1)} />
            <JournalEntry onEntryCreated={() => setJournalRefresh(prev => prev + 1)} />
          </div>

          <div className="space-y-6">
            <MoodHistory refresh={moodRefresh} />
            <Resources />
          </div>
        </div>
      </main>

      <footer className="mt-12 py-6 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-600">
            Remember: You're not alone. If you're in crisis, please reach out to a mental health professional or call a crisis helpline.
          </p>
        </div>
      </footer>
    </div>
  );
}
