import React from 'react';
import { protocols } from '../data';
import { ShieldCheck, Info, CheckCircle2, AlertTriangle, HelpCircle, ArrowUpRight } from 'lucide-react';
import { SupportStatus } from '../types';
import SyntaxCode from './SyntaxCode';

export default function ProtocolMatrix() {
  const getStatusIcon = (status: SupportStatus) => {
    switch (status) {
      case 'stable':
        return <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />;
      case 'experimental':
        return <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0" />;
      case 'optional':
        return <HelpCircle className="h-4.5 w-4.5 text-blue-400 shrink-0" />;
      default:
        return <Info className="h-4.5 w-4.5 text-slate-500 shrink-0" />;
    }
  };

  const getStatusLabel = (status: SupportStatus) => {
    switch (status) {
      case 'stable':
        return 'Stable Core';
      case 'optional':
        return 'Optional Component';
      case 'experimental':
        return 'Experimental Probe';
      case 'out-of-scope':
        return 'Out of Boundary';
      default:
        return 'Undefined';
    }
  };

  const getStatusStyle = (status: SupportStatus) => {
    switch (status) {
      case 'stable':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'optional':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'experimental':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'out-of-scope':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Table for Desktop & Stacked Grid for Mobile */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60 backdrop-blur-sm">
        
        {/* Mobile View: Stacked cards (hidden on desktop) */}
        <div className="block md:hidden divide-y divide-slate-800">
          {protocols.map((proto) => (
            <div key={proto.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">{proto.name}</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyle(proto.status)}`}>
                  {getStatusIcon(proto.status)}
                  {getStatusLabel(proto.status)}
                </span>
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-slate-500 block mb-0.5">Use Case & Posture</span>
                <p className="text-sm text-slate-300 font-medium">{proto.useCase}</p>
                <p className="text-xs text-slate-400 mt-1">{proto.posture}</p>
              </div>
              <div className="pt-2">
                <span className="text-xs font-mono uppercase text-slate-500 block mb-1">CLI Config Example</span>
                <SyntaxCode code={proto.configExample} language="bash" className="text-xs block bg-slate-900 border border-slate-800 p-2 rounded whitespace-pre-wrap font-mono break-all" />
              </div>
              {proto.rfcOrSpec && (
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-orange-400" />
                  <span>Specification: <strong>{proto.rfcOrSpec}</strong></span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop View: Clean Grid Table */}
        <table className="hidden md:table w-full min-w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-mono text-xs uppercase tracking-wider">
              <th scope="col" className="px-6 py-4">Protocol</th>
              <th scope="col" className="px-6 py-4">Status Class</th>
              <th scope="col" className="px-6 py-4">Use Case & Architectural Posture</th>
              <th scope="col" className="px-6 py-4">CLI Direct Config</th>
              <th scope="col" className="px-6 py-4">Specification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {protocols.map((proto) => (
              <tr key={proto.id} className="hover:bg-slate-900/40 transition">
                {/* Protocol Name */}
                <td className="px-6 py-5 font-bold text-white whitespace-nowrap text-base">
                  {proto.name}
                </td>
                {/* Status Badge */}
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(proto.status)}`}>
                    {getStatusIcon(proto.status)}
                    {getStatusLabel(proto.status)}
                  </span>
                </td>
                {/* Use Case & Posture */}
                <td className="px-6 py-5 max-w-sm">
                  <div className="text-slate-200 font-medium leading-normal mb-1">{proto.useCase}</div>
                  <div className="text-xs text-slate-400 font-normal leading-relaxed">{proto.posture}</div>
                </td>
                {/* Config Example */}
                <td className="px-6 py-5">
                  <SyntaxCode code={proto.configExample} language="bash" className="block bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded font-mono text-xs whitespace-pre select-all" />
                </td>
                {/* Conformance Bound RFC */}
                <td className="px-6 py-5 whitespace-nowrap text-xs text-slate-400">
                  {proto.rfcOrSpec ? (
                    <span className="inline-flex items-center gap-1 bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-300">
                      <ShieldCheck className="h-3.5 w-3.5 text-orange-500" />
                      {proto.rfcOrSpec}
                    </span>
                  ) : (
                    <span className="text-slate-600">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Out of bounds note */}
      <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 flex items-start gap-3">
        <Info className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400 leading-relaxed">
          <strong className="text-white block mb-1 font-semibold">Tigrcorn Conformance Boundary Rules:</strong>
          Tigrcorn strictly maintains HTTP and security compliance matrices. Out-of-boundary protocols (like WSGI adapters, ASGI2 legacy protocols, or raw RSGI setups) are explicitly out of scope and are not supported by the runtime to ensure baseline stability.
        </div>
      </div>
    </div>
  );
}
