import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useVerification } from '../context/VerificationContext';

export default function WorkflowStepper() {
  const { showToast } = useToast();
  const { currentStage, liveScore, revealedFindings, revealedChecks } = useVerification();

  const steps = [
    { number: 1, title: 'Documents', subtitle: 'Collected' },
    { number: 2, title: 'Analysis', subtitle: 'AI Extraction & Checks' },
    { number: 3, title: 'Evidence', subtitle: 'Review & Validate' },
    { number: 4, title: 'Decision', subtitle: 'Officer Action' },
  ];

  const passedCount = revealedFindings.filter(f => f.type === 'PASSED').length;
  const issuesCount = revealedFindings.filter(f => f.type === 'RED_FLAG').length;
  const reviewCount = revealedFindings.filter(f => f.type === 'WARNING').length;

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Stepper Steps */}
      <div className="flex items-center space-x-2 lg:space-x-4 overflow-x-auto">
        {steps.map((step, idx) => {
          const isCompleted = step.number < currentStage;
          const isCurrent = step.number === currentStage;

          return (
            <React.Fragment key={step.number}>
              <div
                onClick={() => showToast(`Stage ${step.number}: ${step.title} (${step.subtitle})`, 'info')}
                className="flex items-center space-x-2.5 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300'
                      : isCurrent
                      ? 'bg-slate-900 text-white shadow-xs ring-2 ring-slate-900 ring-offset-1'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.number}
                </div>

                <div>
                  <div className={`text-xs font-bold leading-tight ${isCurrent ? 'text-slate-900' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                    {step.title}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {step.subtitle}
                  </div>
                  {isCurrent && (
                    <div className="text-[9px] font-bold text-blue-600 uppercase tracking-wider">
                      You are here
                    </div>
                  )}
                </div>
              </div>

              {idx < steps.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0 mx-1" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Dynamic Compliance Summary Quick Stats */}
      <div
        onClick={() => showToast(`Overall Compliance: ${liveScore}% (Passed: ${passedCount}, Issues: ${issuesCount}, Review: ${reviewCount})`, 'info')}
        className="flex items-center space-x-4 bg-slate-50 border border-slate-200 rounded-lg px-4 py-1.5 shrink-0 cursor-pointer hover:border-slate-400 transition-colors"
      >
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Overall Compliance</div>
          <div className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span>{liveScore}%</span>
            <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${liveScore}%` }}></div>
            </div>
          </div>
        </div>

        <div className="h-7 w-px bg-slate-200"></div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="text-center">
            <span className="text-emerald-700 font-extrabold block text-sm">{passedCount}</span>
            <span className="text-[10px] text-slate-500 font-medium">Passed</span>
          </div>
          <div className="text-center">
            <span className="text-rose-600 font-extrabold block text-sm">{issuesCount}</span>
            <span className="text-[10px] text-slate-500 font-medium">Issues</span>
          </div>
          <div className="text-center">
            <span className="text-amber-600 font-extrabold block text-sm">{reviewCount}</span>
            <span className="text-[10px] text-slate-500 font-medium">Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}
