
import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { label: 'Downloads Served', value: '1.2M+', icon: 'fa-cloud-download-alt' },
    { label: 'Active Users', value: '85K+', icon: 'fa-users' },
    { label: 'Server Uptime', value: '99.9%', icon: 'fa-server' },
    { label: 'Avg. Speed', value: '45MB/s', icon: 'fa-tachometer-alt' }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="text-center group">
            <div className="inline-flex w-12 h-12 items-center justify-center bg-blue-600/10 text-blue-500 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <p className="text-3xl font-black text-white mb-1 tracking-tight">{stat.value}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
