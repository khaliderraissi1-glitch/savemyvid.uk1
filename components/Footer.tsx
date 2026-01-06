
import React from 'react';
import { ViewType } from '../App';

interface FooterProps {
  setView: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="border-t border-slate-800 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <i className="fas fa-play text-white text-[10px]"></i>
            </div>
            <span className="text-lg font-bold">SaveMyVid <span className="text-blue-500">UK</span></span>
          </div>
          <p className="text-slate-500 text-sm">© 2025 SaveMyVid.uk - UK Registration #9942021</p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm text-slate-400 justify-center md:justify-start">
          <button onClick={() => setView('about')} className="hover:text-blue-500 transition-colors font-medium">About Us</button>
          <button onClick={() => setView('terms')} className="hover:text-blue-500 transition-colors font-medium">Terms of Service</button>
          <button onClick={() => setView('privacy')} className="hover:text-blue-500 transition-colors font-medium">Privacy Policy</button>
          <button onClick={() => setView('cookies')} className="hover:text-blue-500 transition-colors font-medium">Cookie Policy</button>
        </div>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-blue-600 transition-colors">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-blue-600 transition-colors">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-blue-600 transition-colors">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800/50">
        <p className="text-center text-slate-600 text-[10px] leading-relaxed max-w-3xl mx-auto uppercase tracking-widest font-bold">
          SaveMyVid is an independent service based in the UK and is not affiliated with Instagram, Facebook, or TikTok. Our tool operates in compliance with UK fair-use guidelines. Users are responsible for complying with content copyright and platform terms. UK GDPR Compliant.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
