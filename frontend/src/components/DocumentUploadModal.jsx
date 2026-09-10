import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { uploadDocument } from '../services/api';

export default function DocumentUploadModal({ caseId, isOpen, onClose, onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type === 'application/pdf' || selected.name.endsWith('.pdf')) {
        setFile(selected);
        setStatus(null);
      } else {
        alert('Please select a valid PDF document.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setStatus('Uploading and running PaddleOCR extraction pipeline...');

    const res = await uploadDocument(caseId, file);

    setUploading(false);
    setStatus('Complete! Extracted document clauses matched.');

    setTimeout(() => {
      onUploadComplete(res);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs uppercase tracking-wide">
            <Upload className="w-4 h-4 text-blue-600" />
            <span>Upload New Bid Document</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors bg-slate-50">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer space-y-2 block">
              <FileText className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="font-bold text-slate-700">
                {file ? file.name : 'Click to upload PDF bidder submission'}
              </div>
              <p className="text-[10px] text-slate-400">PDF up to 25MB supported for OCR verification</p>
            </label>
          </div>

          {status && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-900 font-semibold flex items-center space-x-2 text-[11px]">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin text-blue-600 shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              <span>{status}</span>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file || uploading}
              className={`py-1.5 px-4 rounded text-xs font-bold text-white transition-all ${
                file && !uploading ? 'bg-blue-600 hover:bg-blue-700 shadow-2xs' : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              Run AI Analysis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
