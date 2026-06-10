import { useState, useEffect } from 'react';
import { Logo } from './Logo';

export const LandingPage = ({ onGetStarted, onSignIn, onGoHome }) => {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'hero') setActiveTab('Home');
          if (entry.target.id === 'features') setActiveTab('Features');
          if (entry.target.id === 'how-it-works') setActiveTab('How it Works');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ['hero', 'features', 'how-it-works'].map(id => document.getElementById(id));
    sections.forEach(sec => { if (sec) observer.observe(sec); });

    return () => {
      sections.forEach(sec => { if (sec) observer.unobserve(sec); });
    };
  }, []);

  return (
    <div className="min-h-screen relative z-10">

      <nav className="no-print fixed top-0 left-0 right-0 z-50 animate-fade-in bg-cream/70 backdrop-blur-md shadow-sm border-b border-cream-300/50 transform-gpu" id="landing-nav">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <Logo onGoHome={onGoHome} size="default" />

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden md:flex items-center gap-1 pill-nav mr-2">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); setActiveTab('Home'); }} className={activeTab === 'Home' ? 'pill-nav-item-active no-underline' : 'pill-nav-item no-underline'}>Home</a>
              <a href="#features" onClick={() => setActiveTab('Features')} className={activeTab === 'Features' ? 'pill-nav-item-active no-underline' : 'pill-nav-item no-underline'}>Features</a>
              <a href="#how-it-works" onClick={() => setActiveTab('How it Works')} className={activeTab === 'How it Works' ? 'pill-nav-item-active no-underline' : 'pill-nav-item no-underline'}>How it Works</a>
            </div>
            <button onClick={onSignIn} className="btn-ghost px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium hover:bg-cream-200 transition-colors rounded-full" id="nav-signin">
              Sign In
            </button>
            <button onClick={onGetStarted} className="btn-charcoal px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-transform hover:scale-105 whitespace-nowrap" id="nav-get-started">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-32 sm:pt-40 pb-16 px-5 sm:px-8 max-w-6xl mx-auto" id="hero">
        <div className="text-center animate-float-in">
          <div className="inline-flex items-center gap-2 bg-white border border-cream-300 text-charcoal rounded-full px-4 py-1.5 mb-8 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-breathe" />
            <span className="text-xs font-semibold tracking-wide font-sans">AI-Powered Learning</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif tracking-tight text-charcoal leading-[1.1] mb-6" id="hero-headline">
            Transform Lectures
            <br />
            <span className="text-stone-400 italic">into Knowledge</span>
          </h1>

          <p className="text-stone-500 text-base sm:text-lg max-w-xl mx-auto mb-10 font-sans font-light leading-relaxed">
            Paste any YouTube lecture URL and get beautifully crafted study notes in seconds. Powered by Gemini AI.
          </p>

          <div className="max-w-2xl mx-auto w-full animate-stagger-2">
            <div className="flex items-center gap-1 sm:gap-2 bg-white/60 backdrop-blur-md border border-white rounded-full p-1.5 sm:p-2 shadow-bento hover:shadow-bento-hover transition-shadow duration-500 w-full overflow-hidden">
              <div className="hidden sm:flex items-center gap-2 pl-4 text-stone-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL..."
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-charcoal text-sm sm:text-base placeholder:text-stone-400/60 py-3 px-4 sm:px-3 font-sans"
                id="hero-url-input"
              />
              <button
                onClick={onGetStarted}
                className="btn-charcoal px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-[15px] font-medium font-sans tracking-wide whitespace-nowrap flex items-center gap-2 transition-transform hover:scale-105 flex-shrink-0"
                id="hero-cta"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span className="hidden sm:inline">Generate Notes</span>
                <span className="sm:hidden">Generate</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-stone-400 text-[10px] sm:text-xs font-medium font-sans animate-stagger-3">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              No credit card
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Free to start
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Works with YouTube
            </span>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 max-w-4xl mx-auto pb-24 animate-stagger-3">
        <div className="flex justify-center gap-8 sm:gap-16">
          {[
            { num: '< 10s', label: 'Generation Time' },
            { num: '3', label: 'Study Modes' },
            { num: '98%', label: 'Accuracy' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-5xl font-serif tracking-tight text-charcoal">{stat.num}</div>
              <div className="text-[11px] sm:text-xs text-stone-500 mt-2 font-sans font-semibold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 max-w-6xl mx-auto pb-24" id="features">
        <div className="text-center mb-16 animate-stagger-4">
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-charcoal mb-3">
            Three modes, <span className="italic text-stone-400">one goal</span>
          </h2>
          <p className="text-stone-500 text-base max-w-md mx-auto font-sans">
            Choose the study style that fits your learning needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 animate-stagger-5">

          <div className="md:col-span-5 bg-white border border-cream-300 rounded-[2rem] shadow-sm p-8 sm:p-10 flex flex-col justify-between min-h-[280px] hover:-translate-y-1 transition-transform duration-300 transform-gpu" id="feature-quick">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center mb-6 shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A2B2A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-charcoal mb-3 tracking-tight">Quick Mode</h3>
              <p className="text-stone-500 text-[15px] leading-relaxed font-sans">
                Get the core concepts in bullet points. Perfect for revision before exams.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-8">
              <div className="bg-gold/20 text-charcoal text-xs font-medium font-sans px-3 py-1.5 rounded-full">~2 min</div>
              <div className="bg-white text-stone-500 shadow-sm text-xs font-medium font-sans px-3 py-1.5 rounded-full">Key Points</div>
            </div>
          </div>

          <div className="md:col-span-7 bg-white border border-cream-300 rounded-[2rem] shadow-sm p-8 sm:p-10 flex flex-col justify-between min-h-[280px] hover:-translate-y-1 transition-transform duration-300 transform-gpu" id="feature-detailed">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center mb-6 shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A2B2A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-charcoal mb-3 tracking-tight">Detailed Mode</h3>
              <p className="text-stone-500 text-[15px] leading-relaxed font-sans">
                Comprehensive step-by-step notes with examples, tables, and structured explanations.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-8">
              <div className="bg-gold/20 text-charcoal text-xs font-medium font-sans px-3 py-1.5 rounded-full">~5 min</div>
              <div className="bg-white text-stone-500 shadow-sm text-xs font-medium font-sans px-3 py-1.5 rounded-full">Full Coverage</div>
              <div className="bg-white text-stone-500 shadow-sm text-xs font-medium font-sans px-3 py-1.5 rounded-full">Most Popular</div>
            </div>
          </div>

          <div className="md:col-span-12 bg-white border border-cream-300 rounded-[2rem] shadow-sm p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between sm:gap-6 hover:-translate-y-1 transition-transform duration-300 transform-gpu" id="feature-exam">
            <div className="flex flex-col sm:flex-row items-start sm:gap-6">
              <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center flex-shrink-0 shadow-sm mb-6 sm:mb-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A2B2A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-serif text-charcoal mb-3 tracking-tight">Exam Mode</h3>
                <p className="text-stone-500 text-[15px] leading-relaxed max-w-2xl font-sans">
                  High-yield, exam-focused notes optimized for memorization. Includes mnemonics, key formulas, and potential exam questions.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 mt-8 sm:mt-0">
              <div className="bg-gold/20 text-charcoal text-xs font-medium font-sans px-3 py-1.5 rounded-full">~4 min</div>
              <div className="bg-white text-stone-500 shadow-sm text-xs font-medium font-sans px-3 py-1.5 rounded-full">High Yield</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 max-w-6xl mx-auto pb-24" id="how-it-works">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-charcoal mb-3">
            Simple as <span className="italic text-stone-400">1, 2, 3</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Paste a URL', desc: 'Drop any YouTube lecture link into the input bar' },
            { step: '02', title: 'Choose a mode', desc: 'Pick Quick, Detailed, or Exam mode for your needs' },
            { step: '03', title: 'Get your notes', desc: 'AI generates beautiful, structured study notes instantly' },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-cream-300 rounded-[2rem] p-10 text-center shadow-sm transform-gpu">
              <div className="text-4xl font-serif text-gold-400/60 mb-5">{item.step}</div>
              <h3 className="text-xl font-serif text-charcoal mb-3 tracking-tight">{item.title}</h3>
              <p className="text-stone-500 text-[15px] font-sans leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 max-w-4xl mx-auto pb-24">
        <div className="bg-[#1A1A1A] rounded-[3rem] p-12 sm:p-16 text-center shadow-2xl relative overflow-hidden transform-gpu">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white mb-5 relative z-10">
            Ready to learn <span className="italic text-gold">smarter?</span>
          </h2>
          <p className="text-stone-300 text-base mb-10 max-w-md mx-auto font-sans leading-relaxed relative z-10">
            Join thousands of students transforming their study workflow with AI-powered notes.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-charcoal hover:bg-cream hover:scale-105 transition-all duration-300 px-8 py-3.5 rounded-full text-base font-sans tracking-wide font-semibold shadow-lg relative z-10"
            id="footer-cta"
          >
            Start for Free →
          </button>
        </div>
      </section>

      <footer className="border-t border-cream-300 bg-cream/30 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Logo onGoHome={onGoHome} size="default" />
              <p className="mt-6 text-stone-500 text-[15px] max-w-sm leading-relaxed font-sans">
                Transform any YouTube lecture into beautifully structured study notes in seconds. Powered by advanced AI.
              </p>
            </div>
            
            <div>
              <h4 className="font-serif text-charcoal text-lg font-semibold mb-6">Product</h4>
              <ul className="space-y-4 text-[15px] text-stone-500 font-sans list-none p-0 m-0">
                <li><a href="#features" className="hover:text-charcoal transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-charcoal transition-colors">How it Works</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-charcoal text-lg font-semibold mb-6">Connect</h4>
              <ul className="space-y-4 text-[15px] text-stone-500 font-sans list-none p-0 m-0">
                <li><span className="text-charcoal/80 font-medium">Built by Biplov Ghosh</span></li>
                <li>
                  <a href="mailto:work.biplovghosh@gmail.com" className="hover:text-charcoal transition-colors flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    work.biplovghosh@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-center pt-8 border-t border-cream-300/50 text-sm text-stone-400 font-sans">
            <p>© 2026 Akshar AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
