import React, { useState, useEffect } from 'react';
import { fetchAuditTrail } from '../services/api';
import { ShieldCheck, Download, FileText } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function AuditTrail() {
  const { showToast } = useToast();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function loadLogs() {
      const res = await fetchAuditTrail("GEM/2024/B/19102");
      setLogs(res);
    }
    loadLogs();
  }, []);

  const handleExportCSV = () => {
    const headers = "ID,Timestamp,User,Action,CaseID,Details\n";
    const rows = logs.map(l => `"${l.id}","${l.timestamp}","${l.user}","${l.action}","${l.caseId}","${l.details}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Audit_Trail_${Date.now()}.csv`;
    a.click();
    showToast('Exported forensic audit logs to CSV successfully!', 'success');
  };

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-slate-900 uppercase tracking-wide">Procurement Forensic Audit Log</h1>
          <p className="text-xs text-slate-500">Immutable chronological record of officer decisions and AI analysis events</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCSV}
            className="py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold flex items-center space-x-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit Trail (CSV)</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start space-x-3 text-xs p-3 rounded-md bg-slate-50 border border-slate-200/80">
              <div className="p-2 bg-slate-900 text-white rounded-md shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">{log.action}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">{log.timestamp}</span>
                </div>
                <p className="text-slate-600 mt-1 font-medium">{log.details}</p>
                <div className="mt-2 text-[10px] text-slate-500 font-bold flex items-center space-x-2">
                  <span>User: <strong className="text-slate-800">{log.user}</strong></span>
                  <span>•</span>
                  <span>Case ID: <strong className="text-slate-800">{log.caseId}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
