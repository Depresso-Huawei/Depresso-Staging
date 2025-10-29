import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Loader2 } from 'lucide-react';

export function JournalEntry({ onEntryCreated }: { onEntryCreated: () => void }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content) return;

    setLoading(true);
    const { error } = await supabase.from('journal_entries').insert({
      user_id: user.id,
      title: title || 'Untitled Entry',
      content: content,
    });

    setLoading(false);

    if (!error) {
      setSuccess(true);
      setTitle('');
      setContent('');
      setTimeout(() => setSuccess(false), 3000);
      onEntryCreated();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-600" />
          <CardTitle>Journal Entry</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title (optional)"
            placeholder="Give your entry a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            label="Your thoughts"
            placeholder="Write about your day, feelings, or anything on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
          />

          {success && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
              Journal entry saved successfully!
            </div>
          )}

          <Button type="submit" className="w-full" disabled={!content || loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving Entry...
              </>
            ) : (
              'Save Entry'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
