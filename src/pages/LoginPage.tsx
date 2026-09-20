import { useState } from 'react';
import type { Page } from '../types';

interface LoginPageProps {
  setPage: (page: Page) => void;
}

export default function LoginPage({ setPage }: LoginPageProps) {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (role === 'student') setPage('student-dashboard');
    else setPage('teacher-class');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[480px] bg-[#1A1B2E] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-lg font-bold text-white shadow-lg">
              W
            </div>
            <div>
              <div className="font-display font-700 text-white text-lg leading-tight">Digital Skills</div>
              <div className="font-display font-700 text-purple-300 text-lg leading-tight">Wallet</div>
            </div>
          </div>

          <div>
            <div className="font-display font-800 text-white text-4xl leading-tight mb-6">
              Assess. Learn.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Grow.</span>
            </div>
            <p className="text-white/60 text-base font-body leading-relaxed mb-10">
              A verified skills platform that connects authentic assessments to real outcomes. Build your digital credential portfolio as you learn.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { color: 'bg-purple-500/20 border-purple-500/30 text-purple-300', icon: '📋', label: 'Authentic Assessment System' },
                { color: 'bg-orange-500/20 border-orange-500/30 text-orange-300', icon: '🎓', label: 'Student Skills Portfolio' },
                { color: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300', icon: '📈', label: 'Teacher Analytics Dashboard' },
              ].map((item) => (
                <div key={item.label} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${item.color}`}>
                  <span className="text-lg">{item.icon}</span>
                  <span className={`text-sm font-medium font-body ${item.color.split(' ').pop()}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/20 text-xs font-body">
            © 2024 Digital Skills Wallet · Version 2.4.1
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAF0] p-8">
            <div className="mb-8">
              <h1 className="font-display font-700 text-2xl text-gray-900 mb-1">Welcome back</h1>
              <p className="text-sm text-gray-500 font-body">Sign in to your Digital Skills Wallet</p>
            </div>

            {/* Role toggle */}
            <div className="flex rounded-xl bg-gray-50 border border-[#E8EAF0] p-1 mb-6">
              <button
                onClick={() => setRole('student')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  role === 'student' ? 'bg-white shadow-sm text-orange-600 border border-orange-100' : 'text-gray-500 hover:text-gray-700'
                } font-body`}
              >
                🎓 Student
              </button>
              <button
                onClick={() => setRole('teacher')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  role === 'teacher' ? 'bg-white shadow-sm text-emerald-600 border border-emerald-100' : 'text-gray-500 hover:text-gray-700'
                } font-body`}
              >
                👩‍🏫 Teacher
              </button>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-body uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'student' ? 'jordan.smith@school.edu' : 'ms.chen@school.edu'}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8EAF0] text-sm font-body text-gray-800 placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-50 transition-all bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-body uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8EAF0] text-sm font-body text-gray-800 placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-50 transition-all bg-gray-50 focus:bg-white"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-500 font-body cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-purple-600" />
                  Remember me
                </label>
                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium font-body">Forgot password?</button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              className={`w-full py-3 rounded-xl font-semibold text-sm font-body text-white transition-all active:scale-95 ${
                role === 'student'
                  ? 'bg-orange-500 hover:bg-orange-600 shadow-sm shadow-orange-200'
                  : 'bg-emerald-500 hover:bg-emerald-600 shadow-sm shadow-emerald-200'
              }`}
            >
              Sign In as {role === 'student' ? 'Student' : 'Teacher'}
            </button>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-400 font-body">
                Demo credentials: any email + password
              </span>
            </div>
          </div>

          {/* Quick access */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => setPage('public-verification')}
              className="bg-white border border-[#E8EAF0] rounded-xl px-4 py-3 text-sm text-gray-600 hover:border-purple-200 hover:text-purple-700 transition-all font-body"
            >
              🔗 Verify a Credential
            </button>
            <button
              onClick={() => setPage('assessment-template')}
              className="bg-white border border-[#E8EAF0] rounded-xl px-4 py-3 text-sm text-gray-600 hover:border-purple-200 hover:text-purple-700 transition-all font-body"
            >
              📋 Browse Assessments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
