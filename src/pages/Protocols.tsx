import React from 'react';
import { Layers, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle, Info } from 'lucide-react';
import ProtocolMatrix from '../components/ProtocolMatrix';

export default function Protocols() {
  return (
    <div className="space-y-12 py-8">
      
      {/* Header Block */}
      <section className="space-y-3" aria-labelledby="protocols-header-title">
        <div className="flex items-center gap-2 text-orange-500 font-mono text-xs font-semibold uppercase tracking-wide">
          <ShieldCheck className="h-4.5 w-4.5" />
          <span>Protocol Conformance</span>
        </div>
        <h1 id="protocols-header-title" className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Supported Protocols Matrix
        </h1>
        <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
          Tigrcorn matches modern transports with explicit operational constraints. Review the status, RFC standards, and CLI configurations for each protocol class.
        </p>
      </section>

      {/* Protocol Status Legend Block */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Status Class Definitions">
        <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-lg flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-bold text-white block">Stable Core</span>
            <span className="text-[11px] text-slate-400 leading-normal block">Fully supported, production-ready, and covered by automated compliance/verification matrices.</span>
          </div>
        </div>

        <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-lg flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-bold text-white block">Optional Component</span>
            <span className="text-[11px] text-slate-400 leading-normal block">Available via auxiliary subpackages or requiring extra dependencies (e.g. specialized brotli / SSL binaries).</span>
          </div>
        </div>

        <div className="bg-slate-950/40 border border-slate-900 p-4 rounded-lg flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-bold text-white block">Experimental Probe</span>
            <span className="text-[11px] text-slate-400 leading-normal block">Functional but subject to upstream spec adjustments. APIs or layouts may change between minor updates.</span>
          </div>
        </div>
      </section>

      {/* Reusable Protocol Matrix */}
      <section aria-label="Detailed support specification">
        <ProtocolMatrix />
      </section>

      {/* Out-of-Scope boundaries explanation */}
      <section className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4" aria-labelledby="conformance-rules-title">
        <h2 id="conformance-rules-title" className="text-lg font-bold text-white tracking-tight">
          Strict Architectural Non-Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-200">No Legacy WSGI Adapters</h3>
            <p>
              Tigrcorn is an ASGI3 native web server. It does not carry legacy WSGI adapter layers or thread pools for synchronous frameworks like Django (unless running through starlette/WSGI bridges). This guarantees a lightweight, zero-overhead stream router core.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-200">No Monolithic UDP/TCP Merging</h3>
            <p>
              HTTP/3 requires dual listeners operating on parallel protocols (TCP and UDP). Tigrcorn maintains two distinct isolated listeners, ensuring standard failover transitions are handled cleanly via browser Alt-Svc mechanisms rather than complex, buggy network packet hijacking.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
