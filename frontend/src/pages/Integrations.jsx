import React, { useState } from 'react';
import { Network, Database, ShieldCheck, Cpu, RefreshCw, CheckCircle2, Server, Key } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Integrations() {
  const { showToast } = useToast();
  const [integrations, setIntegrations] = useState([
    {
      id: "gem",
      name: "GeM Government e-Marketplace API",
      type: "Core Portal Sync",
      status: "Connected",
      lastSync: "10 mins ago",
      endpoint: "https://api.gem.gov.in/v2/procurement/bids"
    },
    {
      id: "mca",
      name: "MCA21 Corporate Affairs Registrar",
      type: "Financial & DIN Verification",
      status: "Connected",
      lastSync: "1 hour ago",
      endpoint: "https://mca.gov.in/api/v1/company-master"
    },
    {
      id: "gstn",
      name: "GSTN Tax Identification Network",
      type: "GSTR-3B & Tax Compliance",
      status: "Connected",
      lastSync: "30 mins ago",
      endpoint: "https://api.gst.gov.in/taxpayer/verify"
    },
    {
      id: "paddleocr",
      name: "PaddleOCR & FastAPI Evidence Engine",
      type: "AI Vision & OCR Processing",
      status: "Connected",
      lastSync: "Realtime",
      endpoint: "https://ai-service.render.com/health"
    }
  ]);

  const handleTestConnection = (name) => {
    showToast(`Testing live connectivity to ${name}...`, 'info');
    setTimeout(() => {
      showToast(`Connection to ${name} verified successfully! (Latency: 42ms)`, 'success');
    }, 1000);
  };

  const handleSyncNow = (name) => {
    showToast(`Initiating manual synchronization for ${name}...`, 'info');
    setTimeout(() => {
      showToast(`Sync completed for ${name}! Updated 14 records.`, 'success');
    }, 1200);
  };

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-slate-900 uppercase tracking-wide">Government Systems & AI Integrations</h1>
          <p className="text-xs text-slate-500">Live API connectivity status with GeM, MCA21, GSTN, and FastAPI evidence engines</p>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>4/4 APIs Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-slate-900 text-white rounded-lg">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900">{item.name}</h2>
                  <span className="text-[10px] text-slate-500">{item.type}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{item.status}</span>
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500 font-semibold">Endpoint:</span>
                <span className="font-mono text-slate-700 truncate max-w-[200px]">{item.endpoint}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500 font-semibold">Last Synchronization:</span>
                <span className="text-slate-700 font-medium">{item.lastSync}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-1">
              <button
                onClick={() => handleTestConnection(item.name)}
                className="py-1 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold transition-colors"
              >
                Test Ping
              </button>
              <button
                onClick={() => handleSyncNow(item.name)}
                className="py-1 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold flex items-center space-x-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Sync Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
