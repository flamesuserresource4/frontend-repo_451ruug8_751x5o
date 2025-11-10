import React, { useMemo, useState } from 'react';
import { Sparkles, Send, CheckCircle2 } from 'lucide-react';

const StoryJournal = ({ seed, onFeedback }) => {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const base = import.meta.env.VITE_BACKEND_URL || '';
  const today = useMemo(() => new Date().toISOString().slice(0,10), []);

  const counts = useMemo(() => {
    const tokens = text.trim().split(/\s+/).filter(Boolean).length;
    const unique = new Set(text.toLowerCase().match(/[a-zA-Z']+/g) || []).size;
    return { tokens, unique };
  }, [text]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const res = await fetch(`${base}/api/story`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: today, text })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to submit');
      const fidRes = await fetch(`${base}/api/feedback/${data.story_id}`, { method: 'POST' });
      const fb = await fidRes.json();
      if (!fidRes.ok) throw new Error(fb?.detail || 'Failed to get feedback');
      setFeedback(fb);
      onFeedback?.(fb);
    } catch (e) {
      alert(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="journal" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-fuchsia-600 bg-fuchsia-50 px-3 py-1 rounded-full">
            Story Journal <Sparkles className="h-4 w-4" />
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">Write your short story</h2>
          <p className="mt-1 text-slate-600">Aim for 80–150 words. Try to use today’s word and idiom naturally.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={seed || 'Once upon a time...'}
                className="w-full h-48 sm:h-64 resize-y outline-none bg-transparent text-slate-900 placeholder-slate-400"
              />
              <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                <div>
                  <span className="font-medium text-slate-900">{counts.tokens}</span> words · <span className="font-medium text-slate-900">{counts.unique}</span> unique
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || text.trim().length < 20}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2 hover:bg-slate-800 disabled:opacity-50"
                >
                  {submitting ? 'Submitting…' : (<><Send className="h-4 w-4" /> Submit & Get Feedback</>)}
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">AI Feedback</h3>
              {!feedback && <p className="mt-2 text-sm text-slate-600">Submit your story to get readability, strengths, suggestions, and a refined version.</p>}
              {feedback && (
                <div className="mt-3 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="font-medium">Score:</span> {feedback.score}
                  </div>
                  <div className="text-sm"><span className="font-medium">Readability:</span> {feedback.readability}</div>
                  {feedback.strengths?.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-slate-900">Strengths</div>
                      <ul className="mt-1 list-disc list-inside text-sm text-slate-700 space-y-1">
                        {feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                  )}
                  {feedback.suggestions?.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-slate-900">Suggestions</div>
                      <ul className="mt-1 list-disc list-inside text-sm text-slate-700 space-y-1">
                        {feedback.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                  )}
                  {feedback.best_version && (
                    <div>
                      <div className="text-sm font-medium text-slate-900">Best Version</div>
                      <p className="mt-1 text-sm text-slate-700 whitespace-pre-line">{feedback.best_version}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryJournal;
