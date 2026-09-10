import React, { useState } from 'react';
import { Bell, ChevronDown, LogOut, User, Mail, Send, Check, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useVerification } from '../context/VerificationContext';

import emblemSvg from '../assets/emblem.svg';

export default function Header() {
  const { showToast } = useToast();
  const { user, logout } = useAuth();
  const { isProcessing, activeSession, activeCaseId, activeBidderName } = useVerification();
  const [showMenu, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const caseId = activeCaseId || "GEM/2024/B/19102";
  const bidderName = activeBidderName || "ABC Infra Private Limited";

  const getStatusLabel = () => {
    if (isProcessing) return "Verification In Progress";
    if (activeSession) return "Verification Complete";
    return "Ready For Verification";
  };

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
    showToast('Signed out of GeM Procurement Portal session', 'info');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 text-slate-900 px-5 py-2.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs animate-fade-up">
      {/* 1. GOVT HEADER & BRANDING */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-10 flex items-center justify-center shrink-0">
          <img src={emblemSvg} alt="Satyamev Jayate Emblem" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-slate-900 leading-tight">
            Government of India
          </h1>
          <p className="text-xs text-slate-600 font-medium">
            Ministry of Finance
          </p>
        </div>
      </div>

      {/* CASE ID & BIDDER ID BADGES */}
      <div className="flex items-center space-x-3">
        <div className="hidden xl:flex items-center space-x-2.5">
          {/* Case ID Badge */}
          <div
            onClick={() => showToast(`Selected Case ID: ${caseId}`, 'info')}
            className="bg-white border border-slate-300 rounded-lg px-3 py-1 shadow-2xs text-left cursor-pointer hover:border-blue-600 transition-colors"
          >
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block leading-none mb-0.5">CASE ID</span>
            <span className="text-xs font-black tracking-wide text-slate-900">{caseId}</span>
          </div>

          {/* Bidder Badge */}
          <div
            onClick={() => showToast(`Selected Bidder: ${bidderName}`, 'info')}
            className="bg-white border border-slate-300 rounded-lg px-3 py-1 shadow-2xs text-left cursor-pointer hover:border-blue-600 transition-colors flex items-center gap-1.5"
          >
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block leading-none mb-0.5">BIDDER</span>
              <span className="text-xs font-black tracking-wide text-slate-900">{bidderName}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          </div>
        </div>

        {/* Dynamic Status indicator */}
        <div
          onClick={() => showToast(`Verification status: ${getStatusLabel()}`, 'info')}
          className={`hidden lg:flex items-center space-x-1.5 border px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
            isProcessing
              ? 'bg-amber-50 border-amber-300 text-amber-900 animate-pulse'
              : activeSession
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-slate-100 border-slate-300 text-slate-700'
          }`}
        >
          <span className={`w-2 h-2 rounded-full inline-block ${
            isProcessing ? 'bg-orange-500 animate-ping' : activeSession ? 'bg-emerald-500' : 'bg-slate-400'
          }`}></span>
          <span className="text-[11px]">{getStatusLabel()}</span>
        </div>

        {/* User Auth / Action section */}
        <div className="flex items-center space-x-2.5 relative">
          <button
            onClick={() => showToast('Notifications: 3 unread audit alerts', 'info')}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>

          <div
            onClick={() => setShowPopup(!showMenu)}
            className="flex items-center space-x-2 cursor-pointer hover:opacity-90 transition-opacity bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200"
          >
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
              {getInitials(user?.fullName)}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {user?.fullName || "Arjun Singh"}
              </div>
              <div className="text-[10px] text-slate-500">
                {user?.role || "Procurement Officer"}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </div>

          {/* Profile Context Menu */}
          {showMenu && (
            <div className="absolute right-0 top-12 w-60 bg-white text-slate-900 rounded-lg border border-slate-200 shadow-xl py-2 z-50 text-xs animate-fade-up">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="font-bold text-slate-900">{user?.fullName || "Arjun Singh"}</div>
                <div className="text-[10px] text-slate-500">{user?.email || "arjun.singh@gov.in"}</div>
                <div className="text-[9px] text-blue-600 font-bold mt-1">
                  ID: {user?.employeeId || "GEM/OFF/1910"}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 font-bold flex items-center space-x-2 transition-colors mt-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
