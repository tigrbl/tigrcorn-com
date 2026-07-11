import React from 'react';
import { ArrowLeft, Home, HelpCircle } from 'lucide-react';

interface NotFoundProps {
  onNavigate: (path: string) => void;
}

export default function NotFound({ onNavigate }: NotFoundProps) {
  return (
    <div className="py-20 text-center max-w-md mx-auto space-y-6">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono font-black text-2xl select-none">
        404
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The requested coordinate does not exist. It may have moved or been consolidated inside our standard specification matrices.
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => onNavigate('/')}
          type="button"
          className="inline-flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition shadow-lg shadow-orange-500/10"
        >
          <Home className="h-3.5 w-3.5" />
          Back to Home
        </button>
        <button
          onClick={() => onNavigate('/protocols/')}
          type="button"
          className="inline-flex items-center justify-center gap-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition"
        >
          <HelpCircle className="h-3.5 w-3.5" />
          Review Protocols
        </button>
      </div>
    </div>
  );
}
