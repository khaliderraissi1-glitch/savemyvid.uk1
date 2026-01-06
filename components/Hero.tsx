
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="pt-32 pb-12 px-4 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8 animate-bounce-slow">
        <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">UK's #1 Social Video Downloader • No Watermark</span>
      </div>
      <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">
        Download Social Videos <br />
        <span className="gradient-text">Free in the UK.</span>
      </h1>
      <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed mb-10 font-medium">
        Save TikTok videos without watermark, download Instagram Reels in HD, and capture Facebook clips in seconds. Professional-grade extraction tools for UK creators.
      </p>
      <div className="flex items-center justify-center gap-6 opacity-40 grayscale group">
         <div className="flex flex-col items-center gap-2">
           <i className="fab fa-tiktok text-2xl group-hover:text-pink-500 transition-colors"></i>
           <span className="text-[8px] font-bold uppercase tracking-widest">TikTok</span>
         </div>
         <div className="flex flex-col items-center gap-2">
           <i className="fab fa-instagram text-2xl group-hover:text-orange-500 transition-colors"></i>
           <span className="text-[8px] font-bold uppercase tracking-widest">Instagram</span>
         </div>
         <div className="flex flex-col items-center gap-2">
           <i className="fab fa-facebook text-2xl group-hover:text-blue-500 transition-colors"></i>
           <span className="text-[8px] font-bold uppercase tracking-widest">Facebook</span>
         </div>
      </div>
    </div>
  );
};

export default Hero;
