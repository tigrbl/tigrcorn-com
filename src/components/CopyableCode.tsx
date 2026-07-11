import React from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import SyntaxCode from './SyntaxCode';

interface CopyableCodeProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CopyableCode({ code, language = 'bash', title }: CopyableCodeProps) {
  const [copied, setCopied] = React.useState(false);
  const [srAnnouncement, setSrAnnouncement] = React.useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setSrAnnouncement('Code copied to clipboard successfully');
      setTimeout(() => {
        setCopied(false);
        setSrAnnouncement('');
      }, 2000);
    } catch (err) {
      setSrAnnouncement('Failed to copy code to clipboard');
    }
  };

  return (
    <div className="relative w-full rounded-lg border border-slate-800 bg-slate-900 overflow-hidden font-mono text-sm leading-relaxed shadow-lg">
      
      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {srAnnouncement}
      </div>

      {/* Terminal Title Bar */}
      <div className="flex h-10 items-center justify-between border-b border-slate-800 bg-slate-950 px-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-800"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-slate-800"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-slate-800"></div>
          </div>
          {title ? (
            <span className="text-xs font-semibold text-slate-400 select-none">{title}</span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 select-none">
              <Terminal className="h-3 w-3" />
              {language}
            </span>
          )}
        </div>
        
        <button
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 border border-transparent hover:border-slate-800"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container */}
      <div className="p-4 overflow-x-auto max-w-full text-slate-100 select-text bg-slate-900">
        <pre className="whitespace-pre scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          <SyntaxCode code={code} language={language} />
        </pre>
      </div>
    </div>
  );
}
