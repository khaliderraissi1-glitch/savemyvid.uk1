
import React from 'react';
import { ViewType } from '../App';

interface LegalViewProps {
  type: ViewType;
  setView: (view: ViewType) => void;
}

const LegalView: React.FC<LegalViewProps> = ({ type, setView }) => {
  const content = {
    terms: {
      title: "Terms of Service",
      updated: "Last Updated: January 15, 2025",
      sections: [
        {
          h: "1. Acceptance of Terms",
          p: "By accessing and using SaveMyVid.uk ('the Service'), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use the service. These terms are governed by the laws of England and Wales."
        },
        {
          h: "2. Intellectual Property Rights",
          p: "SaveMyVid is a technical tool that allows users to download content they already have access to. We do not host or store any videos on our servers. You agree not to use this service to download copyrighted material without explicit permission from the copyright owner."
        },
        {
          h: "3. User Responsibilities",
          p: "Users are solely responsible for the content they download. You agree to use the service only for lawful purposes and in a way that does not infringe the rights of others. Commercial use of downloaded content is strictly regulated by the original platform's terms."
        },
        {
          h: "4. Limitation of Liability",
          p: "SaveMyVid provides the service 'as is'. We are not liable for any damages arising from your use of the tool, including but not limited to, platform account bans or legal issues resulting from content redistribution."
        }
      ]
    },
    privacy: {
      title: "Privacy Policy",
      updated: "Last Updated: January 15, 2025",
      sections: [
        {
          h: "1. Data Collection",
          p: "We value your privacy. SaveMyVid does not require registration and does not collect personal identifiers like names or email addresses. We only process the video URLs you provide to facilitate the temporary extraction of media metadata."
        },
        {
          h: "2. UK GDPR Compliance",
          p: "As a UK-based service, we comply with the UK General Data Protection Regulation (UK GDPR). We do not store logs of your download history on our servers. Any 'Recent History' you see on our site is stored exclusively in your local browser's storage (LocalStorage)."
        },
        {
          h: "3. Third-Party Services",
          p: "We use minimal analytics (e.g., Google Analytics) to understand site traffic. These services may collect anonymous data such as IP addresses and device types to help us improve performance for UK users."
        }
      ]
    },
    cookies: {
      title: "Cookie Policy",
      updated: "Last Updated: January 15, 2025",
      sections: [
        {
          h: "1. What are Cookies?",
          p: "Cookies are small text files stored on your device. We use them to ensure the site functions correctly and to remember your preferences (like language settings)."
        },
        {
          h: "2. Essential Cookies",
          p: "We only use essential cookies that are necessary for the technical operation of the video extraction engine and local history features. Without these, the service would not be able to function as intended."
        },
        {
          h: "3. Managing Cookies",
          p: "You can choose to disable cookies in your browser settings, though some parts of SaveMyVid may stop working correctly. By continuing to use our service in the UK, you consent to our use of these essential technical cookies."
        }
      ]
    }
  };

  const active = content[type as keyof typeof content] || content.terms;

  return (
    <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => setView('home')}
          className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all border border-slate-800"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <div>
          <h1 className="text-4xl font-black tracking-tight">{active.title}</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">{active.updated}</p>
        </div>
      </div>

      <div className="glass p-8 md:p-12 rounded-[32px] border border-slate-800/50 space-y-10">
        {active.sections.map((section, i) => (
          <div key={i} className="space-y-4">
            <h2 className="text-xl font-black text-blue-500">{section.h}</h2>
            <p className="text-slate-400 leading-relaxed font-medium">
              {section.p}
            </p>
          </div>
        ))}

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-500">
              <i className="fas fa-gavel"></i>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Official SaveMyVid UK Legal Document</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="text-xs font-black text-slate-400 hover:text-white uppercase tracking-widest flex items-center gap-2"
          >
            <i className="fas fa-print"></i> Print Version
          </button>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-slate-500 text-sm mb-6">Have questions regarding our legal policies?</p>
        <a 
          href="mailto:legal@savemyvid.uk" 
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 border border-slate-800 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all"
        >
          <i className="fas fa-envelope text-blue-500"></i>
          CONTACT LEGAL DEPT
        </a>
      </div>
    </div>
  );
};

export default LegalView;
