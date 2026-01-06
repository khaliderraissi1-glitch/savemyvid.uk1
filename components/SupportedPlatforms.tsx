
import React from 'react';

const SupportedPlatforms: React.FC = () => {
  const platforms = [
    { 
      name: 'TikTok', 
      icon: 'fa-tiktok', 
      color: 'hover:text-pink-500', 
      seoDesc: 'Fastest UK TikTok downloader to save videos without watermarks. High-quality MP4 extraction for every viral clip.',
      features: ['No Watermark', 'HD Quality', 'MP4 Format'] 
    },
    { 
      name: 'Instagram', 
      icon: 'fa-instagram', 
      color: 'hover:text-orange-500', 
      seoDesc: 'Premium Instagram Reels downloader for UK users. Save Stories, IGTV, and posts in original high-definition quality.',
      features: ['Reels', 'Stories', 'HD Photos'] 
    },
    { 
      name: 'Facebook', 
      icon: 'fa-facebook', 
      color: 'hover:text-blue-500', 
      seoDesc: 'Download Facebook videos in HD with ease. Compatible with public Watch videos, Reels, and personal timeline clips.',
      features: ['Watch HD', 'FB Reels', 'Fast Links'] 
    }
  ];

  return (
    <section id="platforms" className="max-w-7xl mx-auto px-4 py-24 scroll-mt-24">
      <div className="text-center mb-16">
        <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.3em] mb-4">Multi-Platform Support</h2>
        <h3 className="text-4xl font-black mb-4">Optimised for Every Network</h3>
        <p className="text-slate-500 max-w-xl mx-auto text-sm font-medium">We provide dedicated extraction algorithms for each platform to ensure maximum compatibility and speed across the UK.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {platforms.map((p, i) => (
          <div key={i} className="glass p-10 rounded-[32px] text-center border border-slate-800/50 group transition-all duration-500 hover:border-blue-500/20">
            <div className={`text-5xl mb-6 text-slate-700 ${p.color} transition-colors duration-500`}>
              <i className={`fab ${p.icon}`}></i>
            </div>
            <h4 className="text-2xl font-black mb-4">{p.name}</h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium">
              {p.seoDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {p.features.map((f, fi) => (
                <span key={fi} className="px-3 py-1 bg-slate-900/50 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-full border border-slate-800 group-hover:border-blue-500/30 transition-colors">
                  {f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupportedPlatforms;
