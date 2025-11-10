import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl border bg-white border-slate-200 p-8 sm:p-12">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute -inset-20 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.12),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(251,191,36,0.12),transparent_35%)]" />
          </div>

          <div className="relative z-10 grid items-center gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Make your next leap in English</h3>
              <p className="mt-3 text-slate-600">Start your daily challenges now and watch your confidence compound day after day.</p>
              <div className="mt-6">
                <a href="#workflow" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-6 py-3 font-semibold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition">
                  Get Started <ArrowRight size={18} />
                </a>
              </div>
            </div>
            <div className="h-48 sm:h-full">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-500/20 via-fuchsia-400/20 to-amber-400/20 border border-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
