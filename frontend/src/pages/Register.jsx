import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, UserPlus, Lock, Mail, User, Briefcase, BadgeCheck, Loader2 } from 'lucide-react';

import emblemSvg from '../assets/emblem.svg';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Procurement Officer');
  const [department, setDepartment] = useState('Ministry of Finance');
  const [employeeId, setEmployeeId] = useState('GEM/OFF/' + (1000 + Math.floor(Math.random()*9000)));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, role, department, employeeId })
      });

      if (res.ok) {
        const data = await res.json();
        login(data.user, data.token);
        navigate('/');
      } else {
        const errData = await res.json().catch(() => ({}));
        setError(errData.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      // Fallback local auth for SIH demo resilience
      login({
        fullName: fullName || "Procurement Officer",
        email: email,
        role: role,
        department: department,
        employeeId: employeeId
      }, "gem-token-demo");
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-xl bg-white border border-slate-700 mb-3 shadow-lg">
          <img src={emblemSvg} alt="Government of India Emblem" className="w-16 h-20 object-contain" />
        </div>
        <h2 className="text-xl font-black text-white tracking-tight uppercase">
          Officer Account Registration
        </h2>
        <p className="mt-1 text-xs text-slate-400 font-medium">
          GeM Forensic Verification Platform • Government of India
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-slate-200 sm:px-8">
          <form className="space-y-3.5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 font-medium text-slate-900"
                  placeholder="e.g. Arjun Singh"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Official Government Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 font-medium text-slate-900"
                  placeholder="officer@gov.in"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Designation / Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Employee ID
                </label>
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600 font-semibold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Department / Ministry
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 font-medium text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-xs text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center space-x-2 transition-all mt-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <UserPlus className="w-4 h-4 text-white" />}
                <span>Register Officer Account</span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs">
            <span className="text-slate-500 font-medium">Already registered? </span>
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
