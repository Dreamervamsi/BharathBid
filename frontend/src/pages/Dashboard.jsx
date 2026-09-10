import React, { useState } from 'react';
import { Upload, ShieldAlert, ArrowRight, FileCheck, Clock, AlertTriangle, Shield, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeftControlPanel from '../components/LeftControlPanel';
import MiddleWorkflowPanel from '../components/MiddleWorkflowPanel';
import RightAuditPanel from '../components/RightAuditPanel';

export default function Dashboard({ onOpenUpload }) {
  // State for Metadata
  const [metadata, setMetadata] = useState({
    tenderId: 'GEM/2024/B/19102',
    estimatedValue: 650000,
    buyerOrg: 'Ministry of Defence / Ordnance Board',
    biddingType: 'Online Bidding / Reverse Auction (RA) (> ₹5L)',
    cfaStatus: 'APPROVED',
    cracStatus: 'PENDING_VERIFICATION'
  });

  const [activeFile, setActiveFile] = useState(null);
  const [isMainDragging, setIsMainDragging] = useState(false);

  const handleMetadataChange = (key, value) => {
    setMetadata(prev => ({ ...prev, [key]: value }));
  };

  const handleMainDrop = (e) => {
    e.preventDefault();
    setIsMainDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setActiveFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setActiveFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* 3. DUAL-LOCATION UPLOAD & ONBOARDING MAIN WORKSPACE BLOCK (When no active file is uploaded) */}
      {!activeFile ? (
        <div className="bg-white rounded-xl border-2 border-slate-300 shadow-sm p-6 text-center space-y-4 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>GeM Procurement Ingestion Portal Active</span>
            </div>
            <h1 className="text-xl font-black text-[#0B2545] uppercase tracking-tight">
              Integrated Government e-Marketplace (GeM) Bidding Analysis Workspace
            </h1>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Upload tender documents, bidder tax invoices, financial sheets, or ZIP bid packages to execute the 11-step GeM forensic compliance audit.
            </p>
          </div>

          {/* Primary High-Visibility Drag-and-Drop block */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsMainDragging(true); }}
            onDragLeave={() => setIsMainDragging(false)}
            onDrop={handleMainDrop}
            className={`max-w-xl mx-auto border-3 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer relative ${
              isMainDragging 
                ? 'border-blue-600 bg-blue-50/90 scale-[1.01]' 
                : 'border-slate-400 bg-slate-50 hover:bg-slate-100/80 hover:border-blue-500'
            }`}
          >
            <input
              type="file"
              accept=".pdf,.zip,.json,.xml"
              onChange={handleFileSelect}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-4 bg-[#0B2545] text-amber-400 rounded-full shadow-lg">
                <Upload className="w-8 h-8 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  Drag & Drop Bid File or Tax Invoice Here
                </h3>
                <p className="text-xs text-slate-500 font-bold mt-1">
                  Supports PDF, ZIP, JSON, Tax Invoices (Max 50MB)
                </p>
              </div>
              <button className="py-2 px-5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg shadow-sm transition-all pointer-events-none">
                Browse System Files
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center gap-6 text-[11px] font-bold text-slate-500 pt-2 border-t border-slate-200">
            <span>✓ GFR Rule 149 Compliant</span>
            <span>✓ Auto L1 Matrix Extraction</span>
            <span>✓ CRAC & CFA Verification</span>
          </div>
        </div>
      ) : (
        /* Active File Header Notification Banner */
        <div className="bg-[#0B2545] text-white p-3 px-4 rounded-lg shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-400 text-slate-950 rounded font-black">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xs text-amber-300">ACTIVE AUDIT FILE:</span>
                <span className="font-mono text-xs font-bold text-white">{activeFile.name}</span>
              </div>
              <p className="text-[10px] text-slate-300 font-medium">
                Size: {(activeFile.size / 1024).toFixed(1)} KB • Ingested via GeM Portal Workspace Engine
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveFile(null)}
            className="py-1 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold text-xs border border-slate-600 transition-colors"
          >
            Switch File
          </button>
        </div>
      )}

      {/* 2. THREE-COLUMN ENTERPRISE UI/UX LAYOUT (Strict 8px grid spacing compliance) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-[640px] items-stretch">
        {/* A. Left Panel: Control Sidebar & File Ingestion (3 Columns) */}
        <div className="lg:col-span-3 h-[640px]">
          <LeftControlPanel
            metadata={metadata}
            onMetadataChange={handleMetadataChange}
            onFileUpload={(file) => setActiveFile(file)}
          />
        </div>

        {/* B. Middle Panel: Document Preview & Workflow Engine (6 Columns) */}
        <div className="lg:col-span-6 h-[640px]">
          <MiddleWorkflowPanel
            metadata={metadata}
            onTriggerSmtp={(email) => {
              console.log("SMTP Report dispatched to:", email);
            }}
          />
        </div>

        {/* C. Right Panel: Dynamic Audit, Warnings & Red Flag Stream (3 Columns) */}
        <div className="lg:col-span-3 h-[640px]">
          <RightAuditPanel
            metadata={metadata}
          />
        </div>
      </div>
    </div>
  );
}
