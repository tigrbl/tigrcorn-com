import React from 'react';
import { architectureFlow } from '../data';
import { Layers, ArrowRight, ArrowDown, Activity, Settings, Cpu } from 'lucide-react';

export default function ArchitectureFlow() {
  return (
    <div className="space-y-8">
      {/* Visual Flow diagram container */}
      <div className="relative">
        {/* Connection flow line (hidden on mobile/vertical) */}
        <div className="hidden lg:block absolute top-[44px] left-8 right-8 h-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-slate-800 z-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
          {architectureFlow.map((layer, index) => {
            const isLast = index === architectureFlow.length - 1;
            return (
              <div key={layer.step} className="flex flex-col items-center group">
                {/* Visual Step bubble */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border-2 border-orange-500/80 group-hover:border-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-500/10 group-hover:shadow-orange-500/25 transition-all duration-300">
                  {layer.step}
                </div>

                {/* Layer Card */}
                <div className="mt-4 w-full bg-slate-950 border border-slate-800 group-hover:border-slate-700 p-4 rounded-xl text-center space-y-2 transition-all duration-300 shadow-lg">
                  <h4 className="text-sm font-bold text-white tracking-tight leading-tight">
                    {layer.name}
                  </h4>
                  <p className="text-[11px] font-mono text-orange-400 font-medium">
                    {layer.description}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1.5 border-t border-slate-900">
                    {layer.details}
                  </p>
                </div>

                {/* Transition Arrow for Mobile (vertical block) & tablet (horizontal block) */}
                {!isLast && (
                  <div className="lg:hidden my-3 text-orange-500/60 flex flex-col items-center justify-center">
                    <ArrowDown className="h-5 w-5 animate-bounce" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture footnote */}
      <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4 flex-col sm:flex-row">
        <div className="flex items-center gap-3">
          <Cpu className="h-5 w-5 text-orange-400 shrink-0" />
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            <strong>Package Decoupling Guarantee:</strong> Unlike monolithic servers, each architectural step is packaged as an independent Python library module (e.g. <code className="text-orange-400 font-mono text-[11px]">tigrcorn-h3</code>, <code className="text-orange-400 font-mono text-[11px]">tigrcorn-tls</code>). You can import, audit, and run specific layers standalone without the overhead of the central CLI runtime.
          </p>
        </div>
      </div>
    </div>
  );
}
