import React, { useEffect, useState } from 'react';
import { BookOpenCheck, Volume2, Copy } from 'lucide-react';

const DailyChallenge = ({ onUseInJournal }) => {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const base = import.meta.env.VITE_BACKEND_URL || '';

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${base}/api/challenge/today`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.detail || 'Failed to load challenge');
        if (isMounted) setChallenge(data);
      } catch (e) {
        if (isMounted) setError(e.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, [base]);

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    window.speechSynthesis.speak(utter);
  };

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
  };

  if (loading) return <section id="challenge" className="py-12"><div className="container mx-auto px-6"><div className="animate-pulse h-32 rounded-2xl bg-slate-100" /></div></section>;
  if (error) return <section id="challenge" className="py-12"><div className="container mx-auto px-6 text-red-600">{error}</div></section>;

  return (
    <section id="challenge" className="py-16 bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="container mx-auto px-6">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Today's Challenge <BookOpenCheck className="h-4 w-4" />
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">GRE Word & Idiom</h2>
          <p className="mt-1 text-slate-600">Learn them quickly, then use them in your story below.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{challenge.word}</h3>
                <p className="mt-1 text-slate-600">{challenge.word_meaning}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => speak(challenge.word)} className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100" aria-label="Speak word">
                  <Volume2 className="h-5 w-5" />
                </button>
                <button onClick={() => copyToClipboard(challenge.word)} className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-50 text-slate-700 hover:bg-slate-100" aria-label="Copy word">
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>
            {challenge.word_example && (
              <p className="mt-3 text-sm text-slate-500">Example: {challenge.word_example}</p>
            )}
            <div className="mt-4">
              <button onClick={() => onUseInJournal?.(`${challenge.word}`)} className="text-sm font-medium text-indigo-700 hover:text-indigo-800">Use in story →</button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{challenge.idiom}</h3>
                <p className="mt-1 text-slate-600">{challenge.idiom_meaning}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => speak(challenge.idiom)} className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100" aria-label="Speak idiom">
                  <Volume2 className="h-5 w-5" />
                </button>
                <button onClick={() => copyToClipboard(challenge.idiom)} className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-50 text-slate-700 hover:bg-slate-100" aria-label="Copy idiom">
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>
            {challenge.idiom_example && (
              <p className="mt-3 text-sm text-slate-500">Example: {challenge.idiom_example}</p>
            )}
            <div className="mt-4">
              <button onClick={() => onUseInJournal?.(`${challenge.idiom}`)} className="text-sm font-medium text-indigo-700 hover:text-indigo-800">Use in story →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyChallenge;
