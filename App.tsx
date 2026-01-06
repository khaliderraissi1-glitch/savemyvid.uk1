
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Downloader from './components/Downloader';
import Features from './components/Features';
import Stats from './components/Stats';
import RecentActivity from './components/RecentActivity';
import HowTo from './components/HowTo';
import SupportedPlatforms from './components/SupportedPlatforms';
import ScrollToTop from './components/ScrollToTop';
import ReportFloatingButton from './components/ReportFloatingButton';
import Footer from './components/Footer';
import LegalView from './components/LegalView';
import AboutView from './components/AboutView';

export type ViewType = 'home' | 'terms' | 'privacy' | 'cookies' | 'about';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  // Dynamic SEO management
  useEffect(() => {
    const titles: Record<ViewType, string> = {
      home: 'SaveMyVid | #1 UK Video Downloader for TikTok, Instagram & Facebook',
      about: 'About Us | SaveMyVid UK - Our Mission and Technology',
      terms: 'Terms of Service | SaveMyVid UK Legal Information',
      privacy: 'Privacy Policy | UK GDPR Compliance - SaveMyVid UK',
      cookies: 'Cookie Policy | User Consent and Data Tracking UK'
    };

    const descriptions: Record<ViewType, string> = {
      home: 'Download TikTok videos without watermark, save Instagram Reels in HD, and download Facebook videos for free in the UK.',
      about: 'Learn about the technology and mission behind SaveMyVid UK, the premier video downloader built for the UK creative community.',
      terms: 'Review the terms and conditions for using SaveMyVid UK video downloader services.',
      privacy: 'Understand how SaveMyVid UK protects your privacy and remains UK GDPR compliant.',
      cookies: 'Detailed information on how SaveMyVid UK uses cookies to provide a better user experience.'
    };

    document.title = titles[currentView];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', descriptions[currentView]);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-600/40">
      <Navbar setView={setCurrentView} currentView={currentView} />
      
      <main className="relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 right-0 h-[1000px] pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] left-[5%] w-[50%] h-[70%] bg-blue-600/10 rounded-full blur-[140px]"></div>
          <div className="absolute top-[15%] right-[5%] w-[50%] h-[70%] bg-purple-600/10 rounded-full blur-[140px]"></div>
        </div>
        
        <div className="relative z-10">
          {currentView === 'home' && (
            <>
              <Hero />
              <Downloader />
              <RecentActivity />
              <Stats />
              <SupportedPlatforms />
              <Features />
              <HowTo />
            </>
          )}
          {currentView === 'about' && (
            <AboutView setView={setCurrentView} />
          )}
          {(currentView === 'terms' || currentView === 'privacy' || currentView === 'cookies') && (
            <LegalView type={currentView} setView={setCurrentView} />
          )}
        </div>
      </main>

      <ScrollToTop />
      <ReportFloatingButton />
      <Footer setView={setCurrentView} />
    </div>
  );
};

export default App;
