import React, { useState } from 'react';
import { Bell, ChevronDown, LogOut, User, Mail, Send, Check, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import emblemSvg from '../assets/emblem.svg';

export default function Header({ 
  caseId = "GEM/2024/B/19102", 
  bidderId = "BID-ABC-99201",
  bidderName = "ABC Infra Private Limited", 
  statusLabel = "Verification in Progress" 
}) {
  const { user, logout, isAuthenticated } = useAuth();
  const [showMenu, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return "AS";
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-[#0B2545] border-b border-slate-800 text-white px-5 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* 1. GOVT HEADER & BRANDING */}
      <div className="flex items-center space-x-3">
        <div className="bg-white p-1 rounded-md shadow-sm border border-slate-300 flex items-center justify-center shrink-0">
          <img src={emblemSvg} alt="Satyamev Jayate Emblem" className="w-9 h-11 object-contain" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold tracking-tight text-white uppercase font-sans">
              Government e-Marketplace (GeM)
            </h1>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
              Govt Portal
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium tracking-wide">
            Integrated Procurement & Forensic Bidding Analysis Portal
          </p>
        </div>
      </div>

      {/* CASE ID & BIDDER ID BADGES (Strict 3mm ~11px Border Rule) */}
      <div className="flex items-center space-x-4">
        <div className="hidden xl:flex items-center space-x-3">
          {/* Case ID Badge with strict 11px dark-blue border (#002147 / #0B2545) */}
          <div className="bg-[#1D2A44] border-[11px] border-[#002147] rounded-lg px-3 py-1 shadow-inner text-center">
            <span className="text-[9px] uppercase tracking-wider text-amber-400 font-black block leading-tight">CASE ID</span>
            <span className="text-xs font-black tracking-wide text-white">{caseId}</span>
          </div>

          {/* Bidder ID Badge with strict 11px dark-blue border */}
          <div className="bg-[#1D2A44] border-[11px] border-[#002147] rounded-lg px-3 py-1 shadow-inner text-center">
            <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-black block leading-tight">BIDDER ID</span>
            <span className="text-xs font-black tracking-wide text-white">{bidderId}</span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="hidden lg:flex items-center space-x-2 bg-[#1D2A44] border border-slate-700/80 px-3 py-1.5 rounded-md text-xs font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-300 font-bold text-[11px]">{statusLabel}</span>
        </div>

        {/* User Auth / Action section */}
        <div className="flex items-center space-x-3 relative">
          {!isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigate('/login')}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-md transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md shadow-xs transition-colors"
              >
                Register
              </button>
            </div>
          ) : (
            <>
              <button className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full ring-2 ring-[#0B2545]"></span>
              </button>

              <div className="h-6 w-px bg-slate-700" />

              <div
                onClick={() => setShowPopup(!showMenu)}
                className="flex items-center space-x-2.5 cursor-pointer hover:opacity-90 transition-opacity bg-[#1D2A44] px-2.5 py-1 rounded-md border border-slate-700/80"
              >
                <div className="w-7 h-7 rounded bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs shadow-xs">
                  {getInitials(user?.fullName)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-white leading-tight">
                    {user?.fullName || "Arjun Singh"}
                  </div>
                  <div className="text-[10px] text-slate-300">
                    {user?.role || "Procurement Officer"}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
              </div>

              {/* Profile Context Menu */}
              {showMenu && (
                <div className="absolute right-0 top-12 w-60 bg-[#1D2A44] text-slate-100 rounded-lg border border-slate-700 shadow-2xl py-2 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-slate-700/80">
                    <div className="font-bold text-white">{user?.fullName || "Arjun Singh"}</div>
                    <div className="text-[10px] text-slate-300">{user?.email || "arjun.singh@gov.in"}</div>
                    <div className="text-[9px] text-amber-400 font-bold mt-1">
                      ID: {user?.employeeId || "GEM/OFF/1910"}
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-rose-400 hover:bg-rose-950/40 font-bold flex items-center space-x-2 transition-colors mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
