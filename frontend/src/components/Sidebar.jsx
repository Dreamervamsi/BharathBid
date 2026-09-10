import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  SearchCheck, 
  Landmark, 
  FileText, 
  Mail, 
  AlertOctagon, 
  Settings, 
  HelpCircle,
  BookOpen
} from 'lucide-react';
import emblemSvg from '../assets/emblem.svg';
import { useToast } from '../context/ToastContext';

export default function Sidebar({ onOpenUpload }) {
  const { showToast } = useToast();
  const navItems = [
    { name: 'Live Verification Workspace', path: '/verification', icon: SearchCheck },
    { name: 'Tenders & Bids Queue', path: '/queue', icon: Landmark, count: 7 },
    { name: 'Cases', path: '/cases', icon: FileText },
    { name: 'Reports', path: '/reports', icon: Mail },
    { name: 'Audit Trail', path: '/audit', icon: AlertOctagon },
    { name: 'Integrations', path: '/integrations', icon: Settings },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help & Support', path: '/help', icon: HelpCircle },
  ];

  return (
    <aside className="w-60 bg-[#071328] text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800/80 select-none font-sans">
      {/* Top Ministry Emblem Block */}
      <div
        onClick={() => showToast('Ministry of Finance - Government of India Portal', 'info')}
        className="p-3.5 border-b border-slate-800/80 flex items-center space-x-3 bg-[#0B1A30] cursor-pointer hover:bg-[#0B1A30]/80 transition-colors"
      >
        <div className="w-8 h-9 rounded bg-white flex items-center justify-center p-0.5 shrink-0 shadow-xs">
          <img src={emblemSvg} alt="Emblem" className="w-full h-full object-contain" />
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-tight text-white leading-tight">Government of India</h2>
          <p className="text-[10px] font-normal text-slate-400">Ministry of Finance</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => showToast(`Navigated to ${item.name}`, 'info')}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#152B46] text-white font-semibold border-l-3 border-blue-500 shadow-2xs'
                    : 'text-slate-300 hover:bg-[#10223A] hover:text-white'
                }`
              }
            >
              <div className="flex items-center space-x-2.5">
                <Icon className="w-4 h-4 text-slate-300 shrink-0 stroke-[1.8]" />
                <span className="truncate text-[11px]">{item.name}</span>
              </div>
              {item.count && (
                <span className="bg-blue-600 text-white font-medium text-[10px] px-1.5 py-0.2 rounded-full">
                  {item.count}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom System Status */}
      <div
        onClick={() => showToast('System Status: Operational • All systems running', 'success')}
        className="p-3 border-t border-slate-800/80 bg-[#0B1A30]/60 cursor-pointer hover:bg-[#0B1A30] transition-colors m-2 rounded-lg border border-slate-800"
      >
        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">System Status</div>
        <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>Operational</span>
        </div>
        <div className="text-[9px] text-slate-400 mt-0.5 font-normal">All systems running</div>
        <div className="text-[9px] text-slate-500 mt-1 font-mono">Last Updated: 14 Mar 2025, 02:45 PM</div>
      </div>
    </aside>
  );
}
