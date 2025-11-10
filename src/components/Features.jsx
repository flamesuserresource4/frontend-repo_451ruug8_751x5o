import React from 'react';
import { Brain, Volume2, Search, Gamepad2, Timer, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: 'Smart Usage Tracker',
    desc: 'Detects correct usage with lemmatization across all word forms in your story.',
    icon: Brain,
  },
  {
    title: 'Audio Pronunciation',
    desc: 'Clear TTS playback for words and idioms to perfect your pronunciation.',
    icon: Volume2,
  },
  {
    title: 'Word Lookup',
    desc: 'Quickly search any word for definition, collocations, and examples.',
    icon: Search,
  },
  {
    title: 'Practice & Play',
    desc: 'Grammar fixes, word guesser, and sentence scramble games keep learning fun.',
    icon: Gamepad2,
  },
  {
    title: 'Daily Cadence',
    desc: 'A balanced workout that fits into your day and compounds progress.',
    icon: Timer,
  },
  {
    title: 'Progress Timeline',
    desc: 'Everything you create is saved to a beautiful, visual memory timeline.',
    icon: ShieldCheck,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-indigo-50/50">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">What makes FluentLeap different</h2>
          <p className="mt-3 text-slate-600">An integrated system designed to build real fluency — not just memorization.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ title, desc, icon: Icon }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-500 text-white flex items-center justify-center shadow-md">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
