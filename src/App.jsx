import React, { useRef } from 'react';
import Hero from './components/Hero';
import Workflow from './components/Workflow';
import Features from './components/Features';
import CTA from './components/CTA';
import DailyChallenge from './components/DailyChallenge';
import StoryJournal from './components/StoryJournal';
import PracticePlay from './components/PracticePlay';
import MemoryTimeline from './components/MemoryTimeline';

function App() {
  const journalRef = useRef(null);

  const focusJournalWith = (seed) => {
    try {
      const el = document.getElementById('journal');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (journalRef.current) {
        // Optionally, we could prefill via a state setter passed down. For simplicity, scroll only.
      }
    } catch {}
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-extrabold tracking-tight text-xl">
            Fluent<span className="text-indigo-600">Leap</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#workflow" className="hover:text-indigo-600">Workflow</a>
            <a href="#features" className="hover:text-indigo-600">Features</a>
            <a href="#challenge" className="hover:text-indigo-600">Daily Challenge</a>
            <a href="#journal" className="hover:text-indigo-600">Journal</a>
            <a href="#practice" className="hover:text-indigo-600">Practice</a>
            <a href="#timeline" className="hover:text-indigo-600">Timeline</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <Workflow />
        <DailyChallenge onUseInJournal={focusJournalWith} />
        <StoryJournal ref={journalRef} />
        <PracticePlay />
        <Features />
        <MemoryTimeline />
        <CTA />
      </main>

      <footer className="py-10 border-t border-slate-200">
        <div className="container mx-auto px-6 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} FluentLeap. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-700">Privacy</a>
            <a href="#" className="hover:text-slate-700">Terms</a>
            <a href="#" className="hover:text-slate-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
