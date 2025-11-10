import React, { useEffect, useMemo, useState } from 'react';
import { Gamepad2, Check, X } from 'lucide-react';

const PracticePlay = () => {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const base = import.meta.env.VITE_BACKEND_URL || '';
  const today = useMemo(() => new Date().toISOString().slice(0,10), []);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${base}/api/practice/quiz`);
      const data = await res.json();
      setQuiz(data);
      setAnswers(new Array(data.questions.length).fill(null));
    };
    load();
  }, [base]);

  const submit = async () => {
    const res = await fetch(`${base}/api/practice/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: today, answers })
    });
    const data = await res.json();
    setResult(data);
  };

  if (!quiz) return <section id="practice" className="py-12"><div className="container mx-auto px-6"><div className="animate-pulse h-32 rounded-2xl bg-slate-100" /></div></section>;

  return (
    <section id="practice" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            Practice & Play <Gamepad2 className="h-4 w-4" />
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">Quick daily quiz</h2>
          <p className="mt-1 text-slate-600">Test your grasp of today’s word and idiom.</p>
        </div>

        <div className="space-y-6">
          {quiz.questions.map((q, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="font-medium text-slate-900">Q{idx+1}. {q.prompt}</div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.choices.map((c, i) => {
                  const selected = answers[idx] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setAnswers(prev => Object.assign([...prev], { [idx]: i }))}
                      className={`text-left rounded-xl border px-4 py-3 transition ${selected ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:bg-slate-50'}`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-slate-600">{answers.filter(a => a !== null).length}/{quiz.questions.length} answered</div>
          <button onClick={submit} className="inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-5 py-2.5 hover:bg-indigo-700">
            Submit Quiz
          </button>
        </div>

        {result && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-slate-900">Result: {result.correct}/{result.total}</div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {result.breakdown.map((b, i) => (
                <div key={i} className={`rounded-xl border p-3 ${b.is_correct ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50'}`}>
                  <div className="flex items-center gap-2 font-medium">
                    {b.is_correct ? <Check className="h-4 w-4 text-emerald-600" /> : <X className="h-4 w-4 text-rose-600" />}
                    Q{i+1}
                  </div>
                  <div className="mt-1 text-slate-700">{b.prompt}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PracticePlay;
