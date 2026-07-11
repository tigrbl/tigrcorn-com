import React from 'react';
import { ShieldCheck, ArrowRight, Github, BookOpen, AlertTriangle, CheckCircle2, ChevronRight, Download } from 'lucide-react';
import { stableRelease, releases } from '../data';
import CopyableCode from '../components/CopyableCode';

export default function Releases() {
  const stableReleasesList = releases.filter(r => r.stability === 'stable');
  const prereleasesList = releases.filter(r => r.stability !== 'stable');

  return (
    <div className="space-y-12 py-8">
      
      {/* Header Block */}
      <section className="space-y-3" aria-labelledby="releases-title">
        <div className="flex items-center gap-2 text-orange-500 font-mono text-xs font-semibold uppercase tracking-wide">
          <Download className="h-4.5 w-4.5" />
          <span>Release Center</span>
        </div>
        <h1 id="releases-title" className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Coordinated Releases & Archives
        </h1>
        <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
          Tigrcorn publishes synchronized updates across the entire Python subpackage family. Stable builds are optimized for security, while dev releases show preview work.
        </p>
      </section>

      {/* 1. Quick installation block for latest stable */}
      <section className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/30 p-6 rounded-2xl space-y-4" aria-labelledby="latest-stable-banner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-3 w-3" />
              Latest Stable
            </span>
            <h2 id="latest-stable-banner" className="text-xl font-bold text-white tracking-tight">
              Tigrcorn v{stableRelease.version} <span className="text-xs font-normal text-slate-400">({stableRelease.releaseDate})</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <a 
              href={stableRelease.pypiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 px-3.5 py-2 rounded-lg text-xs font-semibold text-white transition"
            >
              PyPI package
            </a>
            <a 
              href={`${stableRelease.githubUrl}/releases/tag/v${stableRelease.version}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 px-3.5 py-2 rounded-lg text-xs font-bold text-white transition"
            >
              GitHub release
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-900">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 block">Deploy CLI Command</span>
            <CopyableCode code={stableRelease.installCommand} language="bash" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 block">Default Run Command</span>
            <CopyableCode code={stableRelease.basicRunCommand} language="bash" />
          </div>
        </div>
      </section>

      {/* 2. Stable release list */}
      <section className="space-y-8" aria-labelledby="stable-history-title">
        <h2 id="stable-history-title" className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Stable Release Logs
        </h2>

        <div className="space-y-8 divide-y divide-slate-900">
          {stableReleasesList.map((rel, index) => (
            <div key={rel.version} className={`pt-6 ${index === 0 ? 'pt-0' : 'pt-6'} space-y-4`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg font-bold text-white font-mono">v{rel.version}</span>
                  <span className="text-xs text-slate-500 font-mono">Published {rel.date}</span>
                </div>
                <div className="flex gap-3 text-xs">
                  <a href={rel.pypiLink} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">PyPI Dist</a>
                  <span className="text-slate-800">•</span>
                  <a href={rel.githubTagLink} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">GitHub Tag</a>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {rel.summary}
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wide font-bold block">Highlights & Packaging changes</span>
                <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-400 leading-normal">
                  {rel.highlights.map((hl, i) => (
                    <li key={i}>{hl}</li>
                  ))}
                </ul>
              </div>

              {/* Component Coordinates */}
              <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4.5 space-y-2">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wide font-bold block">Bundled Component Coordinates</span>
                <div className="flex flex-wrap gap-2">
                  {rel.manifestComponents.map((comp) => (
                    <div key={comp.name} className="bg-slate-900/60 border border-slate-900 px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1">
                      <span className="text-slate-400 font-medium">{comp.name}:</span>
                      <strong className="text-orange-400">v{comp.version}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Prerelease / Development Snapshots (Visually Separated and Opt-In) */}
      <section className="border-t border-slate-900 pt-10 space-y-6" aria-labelledby="prereleases-title">
        <div className="bg-amber-950/10 border border-amber-900/30 rounded-2xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5.5 w-5.5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 id="prereleases-title" className="text-base font-bold text-white tracking-tight">
                Experimental & Prerelease Snapshots
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                These coordinates are intended solely for development validation, browser capability testing, or platform-level evaluations. Do not deploy these packages to critical production environments.
              </p>
            </div>
          </div>

          <div className="space-y-6 pt-4 border-t border-slate-900/60">
            {prereleasesList.map((rel) => (
              <div key={rel.version} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-bold text-amber-500 font-mono">v{rel.version}</span>
                    <span className="text-xs text-slate-500 font-mono">Published {rel.date}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-400 uppercase font-bold">
                      Pre-release
                    </span>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <a href={rel.pypiLink} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">PyPI Coordinate</a>
                    <span className="text-slate-800">•</span>
                    <a href={rel.githubTagLink} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">GitHub Tag</a>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {rel.summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-1.5">
                  {rel.manifestComponents.map((comp) => (
                    <div key={comp.name} className="bg-slate-900/30 border border-slate-900/60 px-2.5 py-0.5 rounded text-[10px] font-mono flex items-center gap-1">
                      <span className="text-slate-500">{comp.name}:</span>
                      <strong className="text-amber-500">v{comp.version}</strong>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
