import React, { useState, useCallback } from 'react';
import { VideoDisplay } from './components/VideoDisplay';
import { InfoCards } from './components/InfoCards';
import { PracticeMode } from './components/PracticeMode';
import { generateSignDescription, getSigningSavvyUrl } from './services/geminiService';
import { AppState } from './types';

const SUGGESTIONS = ['Hello', 'Thank you', 'Yes', 'No', 'Help', 'Family', 'Love'];

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    term: '',
    isLoadingVideo: false,
    isLoadingText: false,
    videoUrl: null,
    signData: null,
    error: null,
  });

  const [inputTerm, setInputTerm] = useState('');

  const triggerSearch = useCallback((term: string) => {
    setState(prev => ({
      ...prev,
      term: term,
      isLoadingVideo: true,
      isLoadingText: true,
      error: null,
      videoUrl: null,
      signData: null
    }));

    // 1. Text Description (AI)
    generateSignDescription(term)
      .then(data => {
        setState(prev => ({
          ...prev,
          signData: data,
          isLoadingText: false
        }));
      })
      .catch(err => {
        console.error(err);
        setState(prev => ({
          ...prev,
          isLoadingText: false,
        }));
      });

    // 2. Video Source (Signing Savvy via Iframe)
    setTimeout(() => {
      const url = getSigningSavvyUrl(term);
      setState(prev => ({
        ...prev,
        videoUrl: url,
        isLoadingVideo: false
      }));
    }, 1000);
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTerm.trim()) return;
    triggerSearch(inputTerm);
  }, [inputTerm, triggerSearch]);

  const handleSuggestionClick = (word: string) => {
    setInputTerm(word);
    triggerSearch(word);
  };

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 font-sans text-slate-800">
      
      {/* Abstract Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-200/40 mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-96 h-96 rounded-full bg-teal-200/40 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 rounded-full bg-blue-200/40 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <header className="pt-16 pb-10 text-center flex flex-col items-center">
          <div className="mb-6 relative group cursor-default">
             <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
             <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-xl border border-white/50">
               🤟
             </div>
          </div>
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 tracking-tight mb-3 drop-shadow-sm">
            SignAssist
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-lg mx-auto leading-relaxed">
            Learn American Sign Language with AI
          </p>
          <p className="text-sm text-slate-400 mt-3 font-medium tracking-wide">
            Type a word &rarr; Watch &rarr; Practice &rarr; Get real-time feedback
          </p>
        </header>

        {/* Search Bar */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-slate-200/50 p-3 mb-6 border border-white/60 max-w-3xl mx-auto transform transition-all hover:scale-[1.01]">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={inputTerm}
              onChange={(e) => setInputTerm(e.target.value)}
              placeholder="Type a word (e.g., 'Family', 'Love')..."
              className="flex-1 pl-8 pr-4 py-4 bg-transparent border-none focus:ring-0 text-xl text-slate-700 placeholder-slate-400 outline-none w-full"
            />
            <button
              type="submit"
              disabled={state.isLoadingVideo || !inputTerm}
              className={`px-10 py-4 rounded-[1.5rem] font-bold text-white text-lg transition-all shadow-lg flex items-center justify-center gap-2 min-w-[180px]
                ${state.isLoadingVideo || !inputTerm
                  ? 'bg-slate-300 cursor-not-allowed text-slate-500'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 hover:shadow-emerald-200 hover:-translate-y-0.5 active:translate-y-0'
                }`}
            >
              {state.isLoadingVideo ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching
                </>
              ) : (
                'Sign'
              )}
            </button>
          </form>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
            <span className="text-sm text-slate-400 self-center mr-2 font-medium">Suggestions:</span>
            {SUGGESTIONS.map(word => (
                <button 
                    key={word}
                    onClick={() => handleSuggestionClick(word)}
                    className="px-6 py-2.5 bg-white border border-slate-200 rounded-full text-sm text-slate-600 font-medium hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all shadow hover:shadow-md active:scale-95"
                >
                    {word}
                </button>
            ))}
        </div>

        {/* Main Content Grid */}
        <div className="space-y-12">
          
          {/* External Video Iframe */}
          <VideoDisplay 
            videoUrl={state.videoUrl}
            isLoading={state.isLoadingVideo}
            error={state.error}
            term={state.term}
          />

          {/* AI Explanation Cards */}
          <InfoCards 
            data={state.signData}
            isLoading={state.isLoadingText}
          />

          {/* Practice Camera Mode */}
          {state.term && !state.isLoadingVideo && !state.isLoadingText && (
            <div className="animate-fade-in pt-4">
               <PracticeMode term={state.term} />
            </div>
          )}
        </div>

      </div>

      <footer className="mt-32 text-center text-slate-500 text-sm">
        <p className="font-semibold text-slate-600">SignAssist — Built with Gemini 2.5 in Google AI Studio</p>
        <p className="text-xs mt-2 text-slate-400">For educational use only.</p>
      </footer>
      
      {/* Global Style for blob animation */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default App;