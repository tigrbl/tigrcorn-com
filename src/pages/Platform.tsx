import React from 'react';
import { ArrowRight, ShieldCheck, Layers, Terminal, Server, Key, Cpu, Package } from 'lucide-react';
import { components, stableRelease } from '../data';

interface PlatformProps {
  onNavigate: (path: string) => void;
}

export default function Platform({ onNavigate }: PlatformProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="space-y-12 py-8">
      
      {/* Page Header */}
      <section className="space-y-3" aria-labelledby="platform-title">
        <div className="flex items-center gap-2 text-orange-500 font-mono text-xs font-semibold uppercase tracking-wide">
          <Layers className="h-4.5 w-4.5" />
          <span>Product Blueprint</span>
        </div>
        <h1 id="platform-title" className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Tigrcorn Web Platform
        </h1>
        <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
          Explore the runtime, security primitives, embedding APIs, and package modularity behind the Tigrcorn ASGI3 server ecosystem.
        </p>
      </section>

      {/* 6 Capabilities Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Core Capabilities">
        
        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-xl space-y-3">
          <div className="h-9 w-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Server className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-white text-base">High-Performance Runtime</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Multi-threaded listeners built over optimized Python/C layers distribute connections seamlessly. Supports asyncio and uvloop dispatch frameworks out-of-the-box.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-xl space-y-3">
          <div className="h-9 w-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Key className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-white text-base">mTLS Security Controls</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Configure private certificate trust-stores and mandate secure client X.509 verification natively. Includes OCSP status checking and CRL verification.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-xl space-y-3">
          <div className="h-9 w-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Layers className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-white text-base">Static Delivery Semantics</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Bypass Python worker evaluation for static routes. Direct kernel zero-copy sendfile, byte ranges, ETags, cache-controls, and precompressed asset mappings.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-xl space-y-3">
          <div className="h-9 w-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Terminal className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-white text-base">Application Embedding APIs</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Bridges programmatic script controls. Safely instantiate, monitor, and clean up server threads within Python using our structured `EmbeddedServer` endpoints.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-xl space-y-3">
          <div className="h-9 w-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Cpu className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-white text-base">Operational Precedence</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Eliminate runtime configuration guessing. Operational variables are cleanly prioritized across: CLI overrides {'>'} Env overrides {'>'} config files {'>'} default parameters.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-xl space-y-3">
          <div className="h-9 w-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Package className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-white text-base">Modular C Extensions</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tigrcorn isolates its network sockets, TLS handling, static mounts, and HTTP protocol codecs into individual packages that you can install independently.
          </p>
        </div>

      </section>

      {/* Package Separation Details (Aggregate vs Components) */}
      <section className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6" aria-labelledby="packages-title">
        <div className="space-y-2">
          <h2 id="packages-title" className="text-xl font-bold text-white tracking-tight">
            Coordinated Aggregate vs Component Packages
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            Tigrcorn delivers a unified experience under the primary <code className="text-orange-400 font-mono text-xs">tigrcorn</code> installation package, but is internally backed by several highly focused component packages.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-900 bg-slate-950">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/40 text-slate-400 font-mono uppercase tracking-wider">
                <th scope="col" className="px-4 py-3">Package Coordinate</th>
                <th scope="col" className="px-4 py-3">Module Role & Scope</th>
                <th scope="col" className="px-4 py-3">Ecosystem Placement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {components.map((comp) => (
                <tr key={comp.name} className="hover:bg-slate-900/30 transition">
                  <td className="px-4 py-3.5 font-mono font-bold text-orange-400">{comp.name}</td>
                  <td className="px-4 py-3.5 text-slate-200">{comp.role}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[10px] font-mono">
                      {comp.scope}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Caveat Section for Web-Builder Limitations */}
      <section className="bg-slate-900/40 rounded-xl p-5 border border-slate-800/80 space-y-2" aria-label="Development limitations">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-orange-500" />
          Technical Marketing & Authenticity Review
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Tigrcorn provides high-performance, real-world Python server components. This platform documentation site is focused exclusively on the actual web runtime package capabilities published to PyPI under version <strong className="text-slate-300">{stableRelease.version}</strong>. We explicitly omit mock or simulated benchmarks, and we do not market unsupported protocols (like Trio or old ASGI2 profiles) to maintain complete professional credibility.
        </p>
      </section>

    </div>
  );
}
