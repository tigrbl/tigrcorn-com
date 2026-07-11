import React from 'react';
import { deploymentProfiles } from '../data';
import { Shield, Terminal, Settings, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import CopyableCode from './CopyableCode';

export default function ProfileSelector() {
  const [activeId, setActiveId] = React.useState('default');
  const activeProfile = deploymentProfiles.find(p => p.id === activeId) || deploymentProfiles[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar Navigation - Tabs (3 cols on lg, full on small) */}
      <div className="lg:col-span-4 space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block px-2 mb-2">
          Select Preset Profile
        </span>
        
        {/* Navigation list */}
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none snap-x">
          {deploymentProfiles.map((profile) => {
            const isSelected = profile.id === activeId;
            return (
              <button
                key={profile.id}
                onClick={() => setActiveId(profile.id)}
                type="button"
                className={`snap-start shrink-0 text-left px-4 py-3 rounded-xl border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/5 border-orange-500/30 text-white shadow-md'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold text-sm font-mono block">
                    {profile.name}
                  </div>
                  {isSelected && <ChevronRight className="hidden lg:block h-4 w-4 text-orange-500" />}
                </div>
                <div className={`text-xs mt-0.5 truncate max-w-[200px] lg:max-w-none ${isSelected ? 'text-orange-400' : 'text-slate-500'}`}>
                  {profile.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Showcase (8 cols on lg) */}
      <div className="lg:col-span-8 bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6 lg:p-8 space-y-6">
        
        {/* Header Block */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-orange-500 font-mono text-xs font-semibold uppercase tracking-wide">
            <Shield className="h-4 w-4" />
            <span>Profile Posture Spec</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            {activeProfile.label}
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
              --profile {activeProfile.name}
            </span>
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {activeProfile.purpose}
          </p>
        </div>

        {/* Bullet details */}
        <div className="border-t border-slate-900 pt-6 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Operational Parameters & Hardening
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeProfile.details.map((detail, index) => (
              <div key={index} className="flex gap-2.5 items-start bg-slate-900/30 p-3 rounded-lg border border-slate-900">
                <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 leading-normal">{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive CLI and Config snippet display */}
        <div className="space-y-4 pt-4 border-t border-slate-900">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Run CLI Command
            </span>
            <CopyableCode 
              code={activeProfile.cliExample} 
              language="bash" 
              title={`CLI launch using --profile ${activeProfile.name}`}
            />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Equivalent Config File (ini)
            </span>
            <CopyableCode 
              code={activeProfile.configSnippet} 
              language="ini" 
              title={`${activeProfile.name}.ini profile override`}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
