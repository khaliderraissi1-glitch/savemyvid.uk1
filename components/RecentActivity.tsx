
import React, { useEffect, useState } from 'react';

const RecentActivity: React.FC = () => {
  const [offset, setOffset] = useState(0);
  
  const activities = [
    { platform: 'tiktok', title: 'Viral Dance Video', time: 'Just now' },
    { platform: 'instagram', title: 'Stunning Travel Reel', time: '12s ago' },
    { platform: 'facebook', title: 'Funny Pet Clip', time: '45s ago' },
    { platform: 'tiktok', title: 'Tech Review 2024', time: '1m ago' },
    { platform: 'instagram', title: 'Cooking Masterclass', time: '2m ago' },
    { platform: 'tiktok', title: 'Fitness Motivation', time: '3m ago' },
    { platform: 'facebook', title: 'News Highlight', time: '4m ago' },
    { platform: 'instagram', title: 'Nature Photography', time: '5m ago' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % (activities.length * 280));
    }, 30);
    return () => clearInterval(timer);
  }, [activities.length]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 overflow-hidden relative">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Global Feed</h3>
        <div className="flex-1 h-px bg-slate-800/40"></div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black text-emerald-500 uppercase">Live</span>
        </div>
      </div>
      
      <div className="relative">
        <div 
          className="flex gap-4 transition-transform duration-75 ease-linear"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {[...activities, ...activities].map((act, i) => (
            <div key={i} className="flex-none w-64 glass p-4 rounded-2xl border border-slate-800/30 flex items-center gap-4 hover:border-blue-500/30 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                act.platform === 'tiktok' ? 'bg-pink-500/10 text-pink-500' :
                act.platform === 'instagram' ? 'bg-orange-500/10 text-orange-500' :
                'bg-blue-500/10 text-blue-500'
              }`}>
                <i className={`fab fa-${act.platform}`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-200 truncate">{act.title}</p>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{act.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradients to fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default RecentActivity;
