import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-indigo-50 to-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            FluentLeap
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-amber-500">English Mastery Toolkit</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600">
            Your daily AI-powered workout for vocabulary, idioms, grammar, and creative writing — all in one focused flow.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="#workflow" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-6 py-3 font-semibold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition" aria-label="Start your daily challenge">
              <Rocket size={20} /> Start Daily Challenge
            </a>
            <a href="#features" className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-6 py-3 font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition" aria-label="See how it works">
              <Play size={18} /> See Features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
