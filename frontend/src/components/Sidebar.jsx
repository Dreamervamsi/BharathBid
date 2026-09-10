import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  SearchCheck, 
  Landmark, 
  TableProperties, 
  AlertOctagon, 
  Mail, 
  Settings, 
  Upload,
  FileCheck2,
  ShieldCheck
} from 'lucide-react';
import emblemSvg from '../assets/emblem.svg';

export default function Sidebar({ onOpenUpload }) {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'GeM Availability Checker', path: '/verification', icon: SearchCheck },
    { name: 'Financial Approvals', path: '/queue', icon: Landmark },
    { name: 'L1 Comparative Matrix', path: '/templates', icon: TableProperties },
    { name: 'Risk & Red Flag Logs', path: '/audit', icon: AlertOctagon, badge: 'CRITICAL' },
    { name: 'SMTP Mailer', path: '/reports', icon: Mail },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0B2545] text-slate-200 flex flex-col shrink-0 min-h-screen border-r border-slate-800 select-none">
      {/* Top Ministry Emblem Block */}
      <div className="p-4 border-b border-slate-800/80 flex items-center space-x-3 bg-[#002147]/50">
        <div className="w-10 h-11 rounded bg-white flex items-center justify-center border border-slate-400 p-0.5 shrink-0 shadow-sm">
          <img src={emblemSvg} alt="Emblem" className="w-full h-full object-contain" />
        </div>
        <div>
          <h2 className="text-xs font-black uppercase tracking-wider text-white">Ministry of Finance</h2>
          <p className="text-[10px] font-semibold text-amber-400">Government of India</p>
        </div>
      </div>

      {/* Persistent Upload Document Button in Left Sidebar */}
      <div className="p-3 border-b border-slate-800/80 bg-[#1D2A44]/40">
        <button
          onClick={onOpenUpload}
          className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-md font-extrabold text-xs flex items-center justify-center space-x-2 shadow-md transition-all active:scale-95"
        >
          <Upload className="w-4 h-4 stroke-[2.5]" />
          <span>Quick Upload Bid File</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#1D2A44] text-white border-l-4 border-amber-400 shadow-sm'
                    : 'text-slate-300 hover:bg-[#1D2A44]/60 hover:text-white'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-rose-500/20 text-rose-400 border border-rose-500/40 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom System Status */}
      <div className="p-3 border-t border-slate-800 bg-[#002147]/60">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">GeM Integration Engine</div>
        <div className="flex items-center space-x-2 text-xs text-emerald-400 font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Online & Synchronized</span>
        </div>
        <div className="text-[9px] text-slate-400 mt-1 font-mono">NIC-GeM API v4.2 • Active</div>
      </div>
    </aside>
  );
}
