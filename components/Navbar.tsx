
import React, { useState, useEffect } from 'react';
import { ViewType } from '../App';

const ProModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass max-w-lg w-full p-8 rounded-[32px] border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.2)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
          <i className="fas fa-times text-xl"></i>
        </button>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/40">
            <i className="fas fa-crown text-white text-2xl"></i>
          </div>
          <h2 className="text-3xl font-black mb-2 tracking-tight">SaveMyVid <span className="text-blue-500">PRO</span></h2>
          <p className="text-slate-400 mb-8 font-medium">Coming soon to revolutionize your workflow.</p>
          
          <div className="space-y-4 mb-8 text-left">
            {[
              "Unlimited 4K Resolution Downloads",
              "Direct Cloud Saving (Google Drive/Dropbox)",
              "Batch Video Processing",
              "Ad-Free Premium Experience"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                <i className="fas fa-check-circle text-blue-500"></i>
                <span className="text-sm font-bold text-slate-200">{feature}</span>
              </div>
            ))}
          </div>
          
          <button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/30">
            JOIN THE WAITLIST
          </button>
        </div>
      </div>
    </div>
  );
};

interface NavbarProps {
  setView: (view: ViewType) => void;
  currentView: ViewType;
}

const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProOpen, setIsProOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const [serverStatus, setServerStatus] = useState<'online' | 'busy'>('online');

  useEffect(() => {
    const interval = setInterval(() => {
      setServerStatus(Math.random() > 0.1 ? 'online' : 'busy');
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleHomeClick = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    setView('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={handleHomeClick}>
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <i className="fas fa-play text-white text-sm ml-0.5"></i>
              </div>
              <span className="text-2xl font-black tracking-tighter">
                SaveMy<span className="text-blue-500">Vid</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 rounded-full border border-slate-800/50">
                <span className={`flex h-1.5 w-1.5 rounded-full ${serverStatus === 'online' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`}></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nodes: Online</span>
              </div>
              
              <div className="flex items-center space-x-6">
                <button onClick={() => setLang(lang === 'EN' ? 'ES' : 'EN')} className="text-slate-500 hover:text-white text-xs font-black transition-all">
                  {lang} <i className="fas fa-chevron-down ml-1 text-[8px]"></i>
                </button>
                <button onClick={() => setView('about')} className={`text-xs font-bold transition-all uppercase tracking-widest ${currentView === 'about' ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}>About</button>
                <button onClick={() => scrollTo('how-to')} className="text-slate-400 hover:text-white text-xs font-bold transition-all uppercase tracking-widest">Guide</button>
                <button 
                  onClick={() => setIsProOpen(true)}
                  className="bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white px-5 py-2 rounded-xl text-[10px] font-black border border-blue-500/20 transition-all uppercase tracking-tighter"
                >
                  GO PRO
                </button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white bg-slate-800/50 rounded-lg"
              >
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden absolute top-full left-0 right-0 glass border-b border-slate-800/50 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="p-6 space-y-6">
            <button onClick={() => { setView('about'); setIsOpen(false); }} className="block w-full text-left text-slate-300 font-bold uppercase tracking-widest">About Us</button>
            <button onClick={() => setIsProOpen(true)} className="block w-full text-left text-blue-500 font-black uppercase tracking-widest">Upgrade to PRO</button>
            <button onClick={() => scrollTo('how-to')} className="block w-full text-left text-slate-300 font-bold uppercase tracking-widest">Instructions</button>
            <button onClick={() => { setView('terms'); setIsOpen(false); }} className="block w-full text-left text-slate-300 font-bold uppercase tracking-widest">Terms</button>
          </div>
        </div>
      </nav>
      <ProModal isOpen={isProOpen} onClose={() => setIsProOpen(false)} />
    </>
  );
};

export default Navbar;
