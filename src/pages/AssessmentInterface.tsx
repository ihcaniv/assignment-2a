import { useState, useEffect } from 'react';
import type { Page } from '../types';

interface Props { setPage: (p: Page) => void; }

const questions = [
  {
    id: 1,
    question: 'A scientist observes that plants in a controlled environment grow taller when exposed to blue light compared to red light. Which of the following best describes an analytical approach to investigating this finding?',
    skill: 'Analytical Thinking',
    options: [
      'Accept the finding and apply it to all plant species immediately',
      'Design a controlled experiment varying light wavelengths while holding other variables constant',
      'Conclude that blue light is universally superior for all photosynthetic organisms',
      'Record the observation in a journal without further investigation',
    ],
    correct: 1,
    explanation: 'Analytical thinking requires systematic investigation through controlled experimentation.',
  },
  {
    id: 2,
    question: 'When evaluating sources for a research paper on climate change, which combination of criteria is MOST important for ensuring information reliability?',
    skill: 'Research',
    options: [
      'The source has many views and shares on social media',
      'The source is recent, peer-reviewed, and authored by domain experts with cited methodology',
      'The source agrees with your existing hypothesis',
      'The source is published by a well-known media outlet',
    ],
    correct: 1,
    explanation: 'Quality research requires evaluating recency, peer review, expertise, and methodology.',
  },
  {
    id: 3,
    question: 'A government proposes building a highway through a protected forest to reduce commute times. A critical thinker would FIRST:',
    skill: 'Critical Thinking',
    options: [
      'Support the proposal because reducing commutes benefits workers',
      'Oppose the proposal because environmental protection is always the priority',
      'Identify and evaluate the assumptions, evidence, and competing stakeholder interests',
      'Wait to see what the majority of citizens decide before forming an opinion',
    ],
    correct: 2,
    explanation: 'Critical thinking involves examining assumptions and multiple perspectives before forming judgments.',
  },
  {
    id: 4,
    question: 'A design team is tasked with creating a product for elderly users with limited mobility. Which approach best demonstrates creative problem-solving?',
    skill: 'Creativity',
    options: [
      'Copy an existing product and reduce the price',
      'Focus group only with designers and engineers',
      'Conduct ethnographic research with elderly users, then prototype unconventional interaction models',
      'Build the most technologically advanced version possible',
    ],
    correct: 2,
    explanation: 'Creative problem-solving combines empathy research with novel ideation.',
  },
  {
    id: 5,
    question: 'You have 24 hours to submit a project but discover a critical error in your data. You have three options: (A) Submit as-is and hope no one notices, (B) Request an extension explaining the situation, (C) Work through the night to fix and verify the data. Which approach demonstrates the best decision-making process?',
    skill: 'Decision-Making',
    options: [
      'Option A — meeting deadlines is always the top priority',
      'Option B — transparency and risk communication is the responsible choice',
      'Option C — effort and dedication always produce the best outcomes',
      'Evaluate the severity of the error, the likelihood of detection, the cost of each option, then choose B or C based on that analysis',
    ],
    correct: 3,
    explanation: 'Good decisions require evaluating the full context, consequences, and trade-offs systematically.',
  },
];

export default function AssessmentInterface({ setPage }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => setTimeLeft((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, [submitted]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isLow = timeLeft < 300;
  const progress = ((current + 1) / questions.length) * 100;
  const q = questions[current];
  const answered = Object.keys(selected).length;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setPage('results-interface'), 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-display font-700 text-2xl text-gray-900 mb-2">Assessment Submitted!</h2>
          <p className="text-gray-500 font-body">Calculating your results…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col">
      {/* Assessment top bar */}
      <div className="bg-white border-b border-[#E8EAF0] px-6 py-3 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-xs font-mono font-600 text-purple-600 uppercase tracking-widest">Live Assessment</span>
        </div>
        <div className="font-body font-600 text-gray-700 text-sm flex-1 truncate">
          Critical Thinking in Data Interpretation
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 font-body">{answered}/{questions.length} answered</span>
          <div className="w-32 bg-gray-100 rounded-full h-1.5">
            <div className="bg-purple-600 h-1.5 rounded-full transition-all" style={{ width: `${(answered / questions.length) * 100}%` }}></div>
          </div>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-600 text-sm ${isLow ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-700'}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="h-1 bg-gray-100">
        <div className="h-1 bg-purple-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Question nav sidebar */}
        <div className="w-64 bg-white border-r border-[#E8EAF0] p-4 overflow-y-auto">
          <div className="text-xs font-mono font-600 text-gray-400 uppercase tracking-widest mb-3">Questions</div>
          <div className="grid grid-cols-5 gap-1.5 mb-4">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-8 h-8 rounded-lg text-xs font-display font-600 transition-all relative ${
                  i === current
                    ? 'bg-purple-600 text-white'
                    : selected[i] !== undefined
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {i + 1}
                {flagged.has(i) && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-1.5 text-xs font-body text-gray-500 mt-4">
            {[
              { color: 'bg-purple-600', label: 'Current' },
              { color: 'bg-purple-100 border border-purple-200', label: 'Answered' },
              { color: 'bg-gray-100', label: 'Unanswered' },
              { color: 'bg-yellow-400', label: 'Flagged', dot: true },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${l.color}`}></div>
                {l.label}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#F0F2F7]">
            <div className="text-xs font-body text-gray-400 mb-1">Skill being assessed</div>
            <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-700 font-body font-medium">
              {q.skill}
            </span>
          </div>
        </div>

        {/* Main question area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto">
            {/* Question header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center font-display font-700 text-sm">
                  {current + 1}
                </span>
                <span className="text-sm text-gray-400 font-body">of {questions.length} questions</span>
              </div>
              <button
                onClick={() => setFlagged(prev => {
                  const next = new Set(prev);
                  next.has(current) ? next.delete(current) : next.add(current);
                  return next;
                })}
                className={`flex items-center gap-1.5 text-xs font-body px-3 py-1.5 rounded-lg border transition-all ${
                  flagged.has(current) ? 'bg-yellow-50 border-yellow-300 text-yellow-700' : 'bg-white border-[#E8EAF0] text-gray-500 hover:border-yellow-300'
                }`}
              >
                🚩 {flagged.has(current) ? 'Flagged' : 'Flag for review'}
              </button>
            </div>

            {/* Question card */}
            <div className="bg-white rounded-2xl border border-[#E8EAF0] shadow-sm p-7 mb-6">
              <div className="text-xs font-mono text-purple-500 mb-3 uppercase tracking-widest">{q.skill}</div>
              <p className="font-body text-gray-800 text-base leading-relaxed">{q.question}</p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3 mb-8">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(prev => ({ ...prev, [current]: i }))}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                    selected[current] === i
                      ? 'bg-purple-50 border-purple-400 shadow-sm'
                      : 'bg-white border-[#E8EAF0] hover:border-purple-200 hover:bg-purple-50/30'
                  }`}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-display font-700 mt-0.5 ${
                    selected[current] === i ? 'border-purple-500 bg-purple-500 text-white' : 'border-gray-300 text-gray-400'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className={`font-body text-sm leading-relaxed ${selected[current] === i ? 'text-purple-900 font-medium' : 'text-gray-700'}`}>
                    {opt}
                  </span>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrent(c => Math.max(0, c - 1))}
                disabled={current === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E8EAF0] text-sm font-medium font-body text-gray-600 hover:border-purple-200 hover:text-purple-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                Previous
              </button>

              <div className="flex items-center gap-2">
                {current < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold font-body transition-all"
                  >
                    Next Question
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold font-body transition-all shadow-sm shadow-emerald-200"
                  >
                    ✅ Submit Assessment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
