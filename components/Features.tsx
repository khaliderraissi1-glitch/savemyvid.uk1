
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      icon: 'fa-location-arrow',
      title: 'UK Local Servers',
      desc: 'Blazing fast downloads via our London and Manchester data centres for minimum latency.'
    },
    {
      icon: 'fa-shield-halved',
      title: 'GDPR Compliant',
      desc: 'We respect UK privacy laws. No tracking, no cookies without consent, and full data protection.'
    },
    {
      icon: 'fa-mobile-button',
      title: 'Optimised for UK ISPs',
      desc: 'Specially tuned to work flawlessly on Virgin Media, BT, Sky, and EE networks.'
    },
    {
      icon: 'fa-check-circle',
      title: '100% Free Forever',
      desc: 'No hidden costs. Just high-quality video downloads for the UK social community.'
    }
  ];

  return (
    <section id="features" className="max-w-7xl mx-auto px-4 py-24 scroll-mt-20">
      <div className="text-center mb-16">
        <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.3em] mb-4">UK Premium Service</h2>
        <h3 className="text-4xl font-black mb-4">Why SaveMyVid UK?</h3>
        <p className="text-slate-400 max-w-xl mx-auto">The most reliable video downloader built specifically for the United Kingdom's digital landscape.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div key={i} className="glass p-8 rounded-3xl hover:border-blue-500/50 transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
              <i className={`fas ${f.icon} text-2xl`}></i>
            </div>
            <h3 className="text-xl font-black mb-3">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
