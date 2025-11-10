import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const MemoryTimeline = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const base = import.meta.env.VITE_BACKEND_URL || '';

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${base}/api/timeline`);
        const data = await res.json();
        setItems(data.items || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [base]);

  return (
    <section id="timeline" className="py-16 bg-gradient-to-b from-white to-indigo-50/40">
      <div className="container mx-auto px-6">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
            Memory Timeline <Clock className="h-4 w-4" />
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">Your progress over time</h2>
          <p className="mt-1 text-slate-600">Every action is saved: challenges, stories, feedback, and practice.</p>
        </div>

        {loading ? (
          <div className="animate-pulse h-32 rounded-2xl bg-slate-100" />
        ) : (
          <div className="relative ml-3 border-l border-slate-200 pl-6">
            {items.length === 0 && (
              <p className="text-slate-600">No activity yet. Complete today’s flow to see your timeline fill up.</p>
            )}
            <div className="space-y-6">
              {items.map((it) => (
                <div key={it._id} className="relative">
                  <span className="absolute -left-[10px] top-2 h-2.5 w-2.5 rounded-full bg-indigo-600" />
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-sm text-slate-500">{it.date}</div>
                    <div className="mt-1 font-medium text-slate-900">{it.title}</div>
                    {it.detail && <div className="text-sm text-slate-700 mt-1">{it.detail}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MemoryTimeline;
