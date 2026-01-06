
import React, { useState, useEffect } from 'react';
import { VideoMetadata, AppStatus } from '../types';

const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-8 duration-300 border ${
      type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
    } backdrop-blur-xl`}>
      <i className={`fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
      <span className="font-bold text-sm">{message}</span>
    </div>
  );
};

const Downloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [history, setHistory] = useState<VideoMetadata[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const loadingMessages = [
    "Analyzing URL...",
    "Bypassing detection nodes...",
    "Extracting metadata...",
    "Preparing HD links...",
    "Finishing up..."
  ];

  useEffect(() => {
    const savedHistory = localStorage.getItem('smv_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    let timer: number;
    if (status === AppStatus.LOADING) {
      setLoadingStep(0);
      timer = window.setInterval(() => {
        setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [status]);

  const saveToHistory = (newMetadata: VideoMetadata) => {
    const updated = [newMetadata, ...history.filter(h => h.id !== newMetadata.id)].slice(0, 5);
    setHistory(updated);
    localStorage.setItem('smv_history', JSON.stringify(updated));
  };

  const validateUrl = (input: string) => {
    const igRegex = /(instagram\.com)/i;
    const ttRegex = /(tiktok\.com)/i;
    const fbRegex = /(facebook\.com|fb\.watch|fb\.com)/i;
    return igRegex.test(input) || ttRegex.test(input) || fbRegex.test(input);
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      showToast('URL pasted from clipboard');
    } catch (err) {
      showToast('Clipboard access denied', 'error');
    }
  };

  const triggerDownload = (idx: number) => {
    setDownloadingId(idx);
    showToast('Download started...');
    setTimeout(() => {
      setDownloadingId(null);
      showToast('Video saved successfully!', 'success');
    }, 2000);
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = url.trim();
    if (!cleanUrl) return;

    if (!validateUrl(cleanUrl)) {
      setError('Unsupported URL format. Please use TikTok, IG, or FB links.');
      showToast('Unsupported URL', 'error');
      return;
    }

    setStatus(AppStatus.LOADING);
    setError(null);
    setIsPlayingPreview(false);

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: cleanUrl })
      });

      if (!response.ok) throw new Error('Backend extraction failed');

      const data = await response.json();
      setMetadata(data);
      saveToHistory(data);
      setStatus(AppStatus.SUCCESS);
      showToast('Video ready for download!');
    } catch (err) {
      setError('Unable to fetch video. Check link settings or try again.');
      setStatus(AppStatus.ERROR);
      showToast('Extraction failed', 'error');
    }
  };

  const reset = () => {
    setUrl('');
    setMetadata(null);
    setStatus(AppStatus.IDLE);
    setError(null);
    setIsPlayingPreview(false);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 mb-24 relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="glass p-6 md:p-10 rounded-[32px] shadow-2xl relative overflow-hidden border border-slate-800/50">
        <form onSubmit={handleDownload} className="relative z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste Instagram, TikTok, or FB link..."
                className="w-full bg-slate-950/80 border border-slate-800 text-white px-6 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-24 placeholder:text-slate-600 font-medium"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {url ? (
                  <button type="button" onClick={() => setUrl('')} className="p-2 text-slate-500 hover:text-white transition-colors"><i className="fas fa-times-circle"></i></button>
                ) : (
                  <button type="button" onClick={handlePaste} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-black uppercase rounded-lg border border-slate-700 transition-all">Paste</button>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={status === AppStatus.LOADING || !url.trim()}
              className="bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:opacity-50 text-white font-black px-10 py-5 rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3 uppercase tracking-wider text-sm"
            >
              {status === AppStatus.LOADING ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-bolt"></i>}
              <span>{status === AppStatus.LOADING ? 'Fetching...' : 'Fetch Video'}</span>
            </button>
          </div>
          {error && <p className="mt-4 text-red-500 text-xs font-bold text-center uppercase tracking-widest">{error}</p>}
        </form>

        {status === AppStatus.LOADING && (
          <div className="mt-12 text-center py-8 animate-in fade-in duration-500">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 border-[6px] border-blue-500/10 rounded-full"></div>
              <div className="absolute inset-0 border-[6px] border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center"><i className="fas fa-cloud-download-alt text-blue-500 text-3xl"></i></div>
            </div>
            <p className="text-xl font-black text-white mb-2">{loadingMessages[loadingStep]}</p>
            <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em]">Connecting to UK extraction node</p>
          </div>
        )}

        {status === AppStatus.SUCCESS && metadata && (
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-5/12">
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl border border-slate-700 aspect-video bg-black flex items-center justify-center">
                  {!isPlayingPreview ? (
                    <>
                      <img src={metadata.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors"></div>
                      <button 
                        onClick={() => setIsPlayingPreview(true)}
                        className="absolute inset-0 flex items-center justify-center group/play"
                      >
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center group-hover/play:scale-110 group-hover/play:bg-blue-600 group-hover/play:border-blue-400 transition-all shadow-2xl">
                          <i className="fas fa-play text-white ml-1"></i>
                        </div>
                      </button>
                      <div className="absolute bottom-4 left-4 pointer-events-none">
                        <span className="px-2 py-1 bg-blue-600 text-[9px] font-black uppercase rounded text-white shadow-lg">{metadata.platform}</span>
                      </div>
                    </>
                  ) : (
                    <div className="relative w-full h-full bg-black">
                      <video 
                        src={metadata.previewUrl} 
                        className="w-full h-full object-contain" 
                        controls 
                        autoPlay
                      />
                      <button 
                        onClick={() => setIsPlayingPreview(false)}
                        className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/80 rounded-full text-white text-xs flex items-center justify-center transition-colors"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black mb-2 line-clamp-2 leading-tight text-white">{metadata.title}</h3>
                  <div className="flex items-center gap-4 text-slate-400 text-[11px] mb-6 font-bold uppercase tracking-widest">
                    <span>@{metadata.author}</span>
                    <span className="w-1.5 h-1.5 bg-slate-800 rounded-full"></span>
                    <span>{metadata.duration}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {metadata.formats.map((format, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all group">
                      <div>
                        <p className="font-black text-white">{format.quality}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{format.size || 'HD Source'}</p>
                      </div>
                      <button 
                        onClick={() => triggerDownload(idx)}
                        disabled={downloadingId !== null}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-[11px] font-black transition-all uppercase tracking-widest disabled:opacity-50 shadow-lg shadow-blue-500/10"
                      >
                        {downloadingId === idx ? 'Processing...' : 'Download'}
                      </button>
                    </div>
                  ))}
                  <button onClick={reset} className="w-full text-slate-500 hover:text-white text-[10px] font-black py-4 transition-colors uppercase tracking-[0.2em]">Try Another Link</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {status === AppStatus.IDLE && history.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-800/50">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Your Recent Downloads</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-slate-900/30 rounded-xl border border-slate-800/50 hover:bg-slate-900/60 transition-all cursor-pointer group" onClick={() => { setMetadata(item); setStatus(AppStatus.SUCCESS); setIsPlayingPreview(false); }}>
                  <img src={item.thumbnail} className="w-12 h-12 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-300 truncate group-hover:text-white transition-colors">{item.title}</p>
                    <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest group-hover:text-blue-500 transition-colors">{item.platform}</p>
                  </div>
                  <i className="fas fa-arrow-right text-slate-800 group-hover:text-blue-500 transition-colors mr-2 text-xs"></i>
                </div>
              ))}
            </div>
            <button onClick={() => { localStorage.removeItem('smv_history'); setHistory([]); }} className="text-[10px] font-black text-slate-600 hover:text-red-500 transition-colors uppercase tracking-widest pt-6 block mx-auto">Wipe Local History</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Downloader;
