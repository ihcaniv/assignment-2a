import { useState } from 'react';
import type { Page } from '../types';

interface Props { setPage: (p: Page) => void; }

const walletData = {
  name: 'Jordan Smith',
  id: 'DSW-2024-JS-1147',
  school: 'Northview Secondary School',
  grade: 'Grade 11',
  issued: 'October 16, 2024',
  verified: true,
  skills: [
    { name: 'Analytical Thinking', level: 4, score: 78, badge: '🔍' },
    { name: 'Research', level: 3, score: 65, badge: '📚' },
    { name: 'Critical Thinking', level: 4, score: 82, badge: '🧠' },
    { name: 'Creativity', level: 3, score: 71, badge: '🎨' },
    { name: 'Decision-Making', level: 3, score: 59, badge: '⚖️' },
    { name: 'Collaboration', level: 4, score: 88, badge: '🤝' },
    { name: 'Adaptability', level: 3, score: 74, badge: '🌱' },
  ],
  achievements: [
    { title: 'Research Pioneer', badge: '🔬' },
    { title: 'Critical Mind', badge: '🧠' },
    { title: 'Team Player', badge: '🤝' },
  ],
};

export default function PublicVerification({ setPage }: Props) {
  const [verifyCode, setVerifyCode] = useState('');
  const [verified, setVerified] = useState<null | boolean>(null);
  const [showResult, setShowResult] = useState(false);

  const handleVerify = () => {
    setVerified(verifyCode.length > 3);
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* Public header */}
      <div className="bg-white border-b border-[#E8EAF0] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-sm font-bold text-white">
            W
          </div>
          <div>
            <div className="font-display font-700 text-gray-900 leading-tight">Digital Skills Wallet</div>
            <div className="text-xs text-gray-400 font-body">Public Verification Portal</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-body">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Secure · Verified
          </div>
          <button
            onClick={() => setPage('login')}
            className="text-sm text-gray-500 hover:text-gray-800 font-body px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Sign In →
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Verify section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 text-sm text-emerald-700 font-body mb-4">
            🔒 Blockchain-verified credentials
          </div>
          <h1 className="font-display font-800 text-3xl text-gray-900 mb-3">Verify a Digital Skills Credential</h1>
          <p className="text-gray-500 font-body text-base max-w-lg mx-auto">
            Enter a credential ID or scan a QR code to instantly verify the authenticity and current status of any Digital Skills Wallet.
          </p>
        </div>

        {/* Verify input */}
        <div className="bg-white rounded-2xl border border-[#E8EAF0] shadow-sm p-6 mb-8 max-w-xl mx-auto">
          <div className="flex gap-3">
            <input
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              placeholder="Enter credential ID (e.g. DSW-2024-JS-1147)"
              className="flex-1 px-4 py-3 rounded-xl border border-[#E8EAF0] text-sm font-mono text-gray-800 placeholder-gray-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 bg-gray-50 focus:bg-white transition-all"
            />
            <button
              onClick={handleVerify}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-sm font-semibold font-body transition-all"
            >
              Verify
            </button>
          </div>
          {showResult && (
            <div className={`mt-4 flex items-center gap-3 px-4 py-3 rounded-xl ${
              verified ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
            }`}>
              <span className="text-xl">{verified ? '✅' : '❌'}</span>
              <div>
                <div className={`text-sm font-semibold font-body ${verified ? 'text-emerald-800' : 'text-red-800'}`}>
                  {verified ? 'Credential Verified' : 'Credential Not Found'}
                </div>
                <div className={`text-xs font-body ${verified ? 'text-emerald-600' : 'text-red-600'}`}>
                  {verified ? 'This credential is authentic and current as of October 16, 2024' : 'Please check the ID and try again'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Credential card */}
        <div className="bg-white rounded-2xl border border-[#E8EAF0] shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="bg-gradient-to-r from-[#1A1B2E] to-[#252641] px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                JS
              </div>
              <div>
                <div className="font-display font-700 text-white text-xl">{walletData.name}</div>
                <div className="text-white/60 text-sm font-body">{walletData.school} · {walletData.grade}</div>
                <div className="font-mono text-orange-400 text-xs mt-1">{walletData.id}</div>
              </div>
            </div>
            <div className="text-right">
              {walletData.verified && (
                <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1.5 mb-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-emerald-400 text-xs font-body font-600">Verified</span>
                </div>
              )}
              <div className="text-white/40 text-xs font-body">Issued {walletData.issued}</div>
            </div>
          </div>

          {/* Skills grid */}
          <div className="p-8">
            <h2 className="font-display font-600 text-gray-900 mb-6 flex items-center gap-2">
              Verified Skills
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-body">
                {walletData.skills.length} domains
              </span>
            </h2>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {walletData.skills.map((s) => (
                <div key={s.name} className="bg-gray-50 border border-[#F0F2F7] rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">{s.badge}</div>
                  <div className="text-xs font-body font-600 text-gray-700 mb-1">{s.name}</div>
                  <div className="font-display font-700 text-xl text-gray-900">{s.score}%</div>
                  <div className="flex justify-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-1.5 rounded-full ${i < s.level ? 'bg-orange-500' : 'bg-gray-200'}`}
                      ></div>
                    ))}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mt-1">Level {s.level}/5</div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <h2 className="font-display font-600 text-gray-900 mb-4">Verified Achievements</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {walletData.achievements.map((a) => (
                <div key={a.title} className="flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-full px-3 py-1.5">
                  <span>{a.badge}</span>
                  <span className="text-xs font-body font-600 text-purple-700">{a.title}</span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-blue-500">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              ))}
            </div>

            <div className="border-t border-[#F0F2F7] pt-4 flex items-center justify-between text-xs text-gray-400 font-body">
              <span>Verified by Digital Skills Wallet Platform · Northview Secondary School</span>
              <span className="font-mono">Hash: 0x9f2a...4c71</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
