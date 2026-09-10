import React, { useState } from 'react';
import { Settings, Shield, Server, Database, Key, Save } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function SettingsPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('AI');
  const [confidence, setConfidence] = useState(85);
  const [aiUrl, setAiUrl] = useState(import.meta.env.VITE_AI_SERVICE_URL || "http://localhost:8000");
  const [ocrMode, setOcrMode] = useState("PADDLE_HYBRID");

  const handleSave = (e) => {
    e.preventDefault();
    showToast('System & AI Engine configurations saved successfully!', 'success');
  };

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
        <h1 className="text-base font-bold text-slate-900 uppercase tracking-wide">System & AI Engine Settings</h1>
        <p className="text-xs text-slate-500">Configure OCR thresholds, Spring Boot API parameters, and PostgreSQL persistence options</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column: Navigation Tabs */}
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <div
            onClick={() => {
              setActiveTab('AI');
              showToast('Active Tab: AI Service & OCR Engine', 'info');
            }}
            className={`p-2.5 font-bold text-xs rounded-md border flex items-center space-x-2 cursor-pointer transition-colors ${
              activeTab === 'AI' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-slate-600 hover:bg-slate-50 border-transparent'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>AI Service & OCR Engine</span>
          </div>
          <div
            onClick={() => {
              setActiveTab('DB');
              showToast('Active Tab: PostgreSQL Database', 'info');
            }}
            className={`p-2.5 font-semibold text-xs rounded-md border flex items-center space-x-2 cursor-pointer transition-colors ${
              activeTab === 'DB' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-slate-600 hover:bg-slate-50 border-transparent'
            }`}
          >
            <Database className="w-4 h-4 text-slate-400" />
            <span>PostgreSQL Database</span>
          </div>
          <div
            onClick={() => {
              setActiveTab('AUDIT');
              showToast('Active Tab: Audit Trail & Security', 'info');
            }}
            className={`p-2.5 font-semibold text-xs rounded-md border flex items-center space-x-2 cursor-pointer transition-colors ${
              activeTab === 'AUDIT' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-slate-600 hover:bg-slate-50 border-transparent'
            }`}
          >
            <Shield className="w-4 h-4 text-slate-400" />
            <span>Audit Trail & Security</span>
          </div>
        </div>

        {/* Right Column: Settings Form */}
        <form onSubmit={handleSave} className="md:col-span-2 bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            {activeTab === 'AI' && "PaddleOCR & Extraction Thresholds"}
            {activeTab === 'DB' && "PostgreSQL Persistence Configuration"}
            {activeTab === 'AUDIT' && "Audit Log Integrity & Security Protocols"}
          </h2>

          {activeTab === 'AI' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">AI Confidence Score Threshold (%)</label>
                <input
                  type="number"
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-slate-800"
                />
                <p className="text-[10px] text-slate-400 mt-1">Extractions below this confidence trigger mandatory human officer review.</p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">FastAPI Microservice Endpoint URL</label>
                <input
                  type="text"
                  value={aiUrl}
                  onChange={(e) => setAiUrl(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500 font-mono text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">OCR Engine Pipeline Mode</label>
                <select
                  value={ocrMode}
                  onChange={(e) => setOcrMode(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-slate-800"
                >
                  <option value="PADDLE_HYBRID">PaddleOCR + PyPDF Hybrid (Recommended)</option>
                  <option value="PADDLE_ONLY">PaddleOCR Engine Only</option>
                  <option value="PYPDF_ONLY">PyPDF Text Extraction Only</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'DB' && (
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md space-y-2 font-mono">
                <div><span className="text-slate-400">DB Host:</span> localhost:5432</div>
                <div><span className="text-slate-400">Database Name:</span> gem_forensic_db</div>
                <div><span className="text-slate-400">Connection Pool Size:</span> 20 Active Connections</div>
                <div><span className="text-slate-400">Status:</span> <strong className="text-emerald-700">CONNECTED & SYNCHRONIZED</strong></div>
              </div>
            </div>
          )}

          {activeTab === 'AUDIT' && (
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md space-y-2">
                <div className="font-bold text-slate-900">Immutable Hash Logging</div>
                <p className="text-[11px] text-slate-600">SHA-256 cryptographic hashes are calculated on every decision submission to satisfy NIC-GeM audit mandates.</p>
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
