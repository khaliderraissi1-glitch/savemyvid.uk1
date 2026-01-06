
import React from 'react';

const HowTo: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Copy the Link',
      desc: 'Open the video on Instagram, TikTok, or Facebook and copy the shareable URL from the app.'
    },
    {
      number: '02',
      title: 'Paste on SaveMyVid',
      desc: 'Insert the link into our downloader bar above and click the Download button to fetch data.'
    },
    {
      number: '03',
      title: 'Save to Device',
      desc: 'Choose your preferred quality (HD or SD) and save the video directly to your local storage.'
    }
  ];

  const faqs = [
    { q: "Is it free to use?", a: "Yes, SaveMyVid is 100% free and will always be. We rely on minimal ads to keep the servers running." },
    { q: "Can I download private videos?", a: "For privacy reasons and legal compliance, we can only download videos that are set to public by the user." },
    { q: "Are there download limits?", a: "No, you can download as many videos as you want without any restrictions or speed caps." }
  ];

  return (
    <section id="how-to" className="max-w-7xl mx-auto px-4 py-24 border-t border-slate-900 scroll-mt-20">
      <div className="grid lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.3em] mb-6">Simple Process</h2>
          <h3 className="text-4xl font-black mb-12">How it Works</h3>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-8 items-start group">
                <span className="text-5xl font-black text-slate-900 leading-none group-hover:text-blue-500/20 transition-colors">{step.number}</span>
                <div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black text-purple-500 uppercase tracking-[0.3em] mb-6">Frequently Asked</h2>
          <h3 className="text-4xl font-black mb-12">Q&A</h3>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="glass p-7 rounded-3xl border border-slate-800/50 hover:bg-slate-900/40 transition-colors">
                <h4 className="font-bold mb-3 flex items-center gap-3 text-slate-200">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  {faq.q}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowTo;
