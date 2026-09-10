import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Verification from './pages/Verification';
import VerificationQueue from './pages/VerificationQueue';
import Reports from './pages/Reports';
import AuditTrail from './pages/AuditTrail';
import Templates from './pages/Templates';
import SettingsPage from './pages/SettingsPage';
import Login from './pages/Login';
import Register from './pages/Register';
import DocumentUploadModal from './components/DocumentUploadModal';
import { AuthProvider, useAuth } from './context/AuthContext';

function MainLayout() {
  const [isQuickUploadOpen, setIsQuickUploadOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans select-none">
      {/* Sidebar with Quick Upload Callback */}
      <Sidebar onOpenUpload={() => setIsQuickUploadOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 sm:p-5">
          <Routes>
            <Route path="/" element={<Dashboard onOpenUpload={() => setIsQuickUploadOpen(true)} />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/queue" element={<VerificationQueue />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/audit" element={<AuditTrail />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Verification />} />
          </Routes>
        </main>
      </div>

      {/* Persistent Quick Upload Modal */}
      <DocumentUploadModal
        isOpen={isQuickUploadOpen}
        onClose={() => setIsQuickUploadOpen(false)}
        onUploadComplete={() => {
          setIsQuickUploadOpen(false);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </AuthProvider>
  );
}
