
import React from 'react';

const ReportFloatingButton: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-3 group">
      <div className="absolute bottom-full right-0 mb-4 scale-0 group-hover:scale-100 transition-all origin-bottom-right">
        <div className="glass px-4 py-2 rounded-xl border border-slate-700 shadow-2xl">
          <p className="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">Report a Bug</p>
        </div>
      </div>
      <a 
        href="mailto:support@savemyvid.uk?subject=Link Extraction Issue"
        className="w-14 h-14 bg-slate-900 border border-slate-800 text-slate-400 rounded-2xl flex items-center justify-center shadow-2xl hover:bg-slate-800 hover:text-white transition-all active:scale-90"
      >
        <i className="fas fa-bug text-xl"></i>
      </a>
    </div>
  );
};

export default ReportFloatingButton;
