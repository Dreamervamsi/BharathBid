import React from 'react';
import { Settings, Shield, Server, Database, Key, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
        <h1 className="text-base font-bold text-slate-900 uppercase tracking-wide">System & AI Engine Settings</h1>
        <p className="text-xs text-slate-500">Configure OCR thresholds, Spring Boot API parameters, and PostgreSQL persistence options</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column: Navigation Tabs */}
        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <div className="p-2.5 bg-blue-50 text-blue-700 font-bold text-xs rounded-md border border-blue-200 flex items-center space-x-2">
            <Server className="w-4 h-4" />
            <span>AI Service & OCR Engine</span>
          </div>
          <div className="p-2.5 text-slate-600 hover:bg-slate-50 font-semibold text-xs rounded-md cursor-pointer flex items-center space-x-2">
            <Database className="w-4 h-4 text-slate-400" />
            <span>PostgreSQL Database</span>
          </div>
          <div className="p-2.5 text-slate-600 hover:bg-slate-50 font-semibold text-xs rounded-md cursor-pointer flex items-center space-x-2">
            <Shield className="w-4 h-4 text-slate-400" />
            <span>Audit Trail & Security</span>
          </div>
        </div>

        {/* Right Column: Settings Form */}
        <div className="md:col-span-2 bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            PaddleOCR & Extraction Thresholds
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">AI Confidence Score Threshold (%)</label>
              <input
                type="number"
                defaultValue={85}
                className="w-full p-2 border border-slate-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">Extractions below this confidence trigger mandatory human officer review.</p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">FastAPI Microservice Endpoint URL</label>
              <input
                type="text"
                defaultValue={import.meta.env.VITE_AI_SERVICE_URL || "http://localhost:8000"}
                className="w-full p-2 border border-slate-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">OCR Engine Pipeline Mode</label>
              <select defaultValue="PADDLE_HYBRID" className="w-full p-2 border border-slate-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500">
                <option value="PADDLE_HYBRID">PaddleOCR + PyPDF Hybrid (Recommended)</option>
                <option value="PADDLE_ONLY">PaddleOCR Engine Only</option>
                <option value="PYPDF_ONLY">PyPDF Text Extraction Only</option>
              </select>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold flex items-center space-x-1.5 shadow-2xs">
                <Save className="w-3.5 h-3.5" />
                <span>Save Configuration</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
