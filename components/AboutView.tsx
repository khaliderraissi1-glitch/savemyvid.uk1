
import React from 'react';
import { ViewType } from '../App';

interface AboutViewProps {
  setView: (view: ViewType) => void;
}

const AboutView: React.FC<AboutViewProps> = ({ setView }) => {
  return (
    <div className="pt-32 pb-24 px-4 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Our Mission</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter leading-tight">
            Built for the <span className="text-blue-500">UK Creative Community.</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed font-medium">
            SaveMyVid UK was founded in London with a simple goal: to provide the fastest, most reliable, and secure video extraction service specifically tuned for UK internet infrastructure.
          </p>
        </div>
        <div className="w-full md:w-5/12">
          <div className="glass aspect-square rounded-[40px] border border-slate-800/50 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <i className="fas fa-rocket text-8xl text-blue-500 animate-pulse relative z-10"></i>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {[
          {
            title: "High-Speed Edge",
            desc: "Our extraction nodes are located in London and Manchester to ensure ultra-low latency for UK users.",
            icon: "fa-bolt"
          },
          {
            title: "Privacy First",
            desc: "We are 100% UK GDPR compliant. We don't track your identity or store your history on our servers.",
            icon: "fa-user-shield"
          },
          {
            title: "Crystal HD",
            desc: "We bypass compression layers to fetch the original quality directly from CDN source files.",
            icon: "fa-video"
          }
        ].map((item, i) => (
          <div key={i} className="glass p-10 rounded-[32px] border border-slate-800/50 hover:border-blue-500/30 transition-all">
            <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
              <i className={`fas ${item.icon} text-xl`}></i>
            </div>
            <h3 className="text-xl font-black mb-4">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass p-12 rounded-[40px] border border-slate-800/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-8 tracking-tight">The Technology Behind SaveMyVid</h2>
          <div className="space-y-8 max-w-3xl">
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex-none flex items-center justify-center font-black text-blue-500">1</div>
              <div>
                <h4 className="font-bold text-white mb-2 uppercase tracking-widest text-xs">Proprietary Parser</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Our custom parsing engine identifies metadata headers faster than standard libraries, ensuring your download links are ready in seconds.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex-none flex items-center justify-center font-black text-blue-500">2</div>
              <div>
                <h4 className="font-bold text-white mb-2 uppercase tracking-widest text-xs">UK CDN Optimization</h4>
                <p className="text-slate-400 text-sm leading-relaxed">We utilize localized Content Delivery Networks to route data through the most efficient paths on BT, Sky, and Virgin Media networks.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex-none flex items-center justify-center font-black text-blue-500">3</div>
              <div>
                <h4 className="font-bold text-white mb-2 uppercase tracking-widest text-xs">No-Store Policy</h4>
                <p className="text-slate-400 text-sm leading-relaxed">All processing happens in memory. Once you receive your download link, the connection is purged, ensuring zero footprint.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <button 
          onClick={() => setView('home')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-black px-12 py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest text-sm"
        >
          Back to Downloader
        </button>
      </div>
    </div>
  );
};

export default AboutView;
