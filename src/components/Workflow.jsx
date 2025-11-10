import React from 'react';
import { BookOpen, PenSquare, Sparkles, Image, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    title: 'Learn',
    desc: 'Explore GRE words and idioms with definitions, IPA, audio, collocations, and vivid examples.',
    icon: BookOpen,
  },
  {
    title: 'Practice',
    desc: 'Write a short creative story that uses today’s words and idioms in context.',
    icon: PenSquare,
  },
  {
    title: 'Get Feedback',
    desc: 'Receive instant AI feedback on grammar, style, and a refined “Best Version.”',
    icon: Sparkles,
  },
  {
    title: 'Visualize',
    desc: 'Save your entry to the timeline with a unique AI-generated illustration.',
    icon: Image,
  },
];

const Workflow = () => {
  return (
    <section id="workflow" className="relative py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Daily Flow <CheckCircle2 className="h-4 w-4"/></span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">A focused routine that compounds daily</h2>
          <p className="mt-3 text-slate-600">Master vocabulary, idioms, and grammar by learning, applying, and reflecting — in minutes a day.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ title, desc, icon: Icon }) => (
            <div key={title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
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

export default Workflow;
