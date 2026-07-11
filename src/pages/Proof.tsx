import React from 'react';
import { ShieldCheck, ArrowUpRight, CheckCircle2, AlertTriangle, FileText, Globe, Key, HelpCircle } from 'lucide-react';
import { stableRelease } from '../data';

interface ProofProps {
  onNavigate: (path: string) => void;
}

export default function Proof({ onNavigate }: ProofProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const conformanceBoundaryDocs = [
    { name: 'CERTIFICATION_BOUNDARY.md', role: 'Specifies the strict limits of standard protocol support, security profiles, and validated platforms.', path: 'docs/review/conformance/CERTIFICATION_BOUNDARY.md' },
    { name: 'BOUNDARY_NON_GOALS.md', role: 'Outlines surfaces explicitly excluded from Tigrcorn (such as legacy WSGI or ASGI2 adapters) to prevent scope drift.', path: 'docs/review/conformance/BOUNDARY_NON_GOALS.md' },
    { name: 'PERFORMANCE_SLOS.md', role: 'Details measurable execution and throughput baselines guaranteed under the stable release.', path: 'docs/review/performance/PERFORMANCE_SLOS.md' }
  ];

  return (
    <div className="space-y-12 py-8">
      
      {/* Header Block */}
      <section className="space-y-3" aria-labelledby="proof-title">
        <div className="flex items-center gap-2 text-orange-500 font-mono text-xs font-semibold uppercase tracking-wide">
          <ShieldCheck className="h-4.5 w-4.5" />
          <span>Product Proof & Certification</span>
        </div>
        <h1 id="proof-title" className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Verifiable Product Proof
        </h1>
        <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
          Tigrcorn takes documentation and conformance boundaries seriously. We present source-backed evidence detailing our release statuses, package hashes, and certification standards.
        </p>
      </section>

      {/* 4 Pillars of Product Verifiability */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Evidence Pillars">
        
        <div className="bg-slate-950/40 border border-slate-900 p-5 rounded-xl space-y-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="h-4.5 w-4.5" />
          </div>
          <span className="text-[10px] font-mono uppercase text-slate-500 block">pypi distribution</span>
          <h3 className="font-bold text-white text-sm">Verified Stable release</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Latest stable coordinate <strong className="text-slate-300">v{stableRelease.version}</strong> has been audited, certified, and published to PyPI on June 18, 2026.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-900 p-5 rounded-xl space-y-3">
          <div className="h-8 w-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Globe className="h-4.5 w-4.5" />
          </div>
          <span className="text-[10px] font-mono uppercase text-slate-500 block">license boundary</span>
          <h3 className="font-bold text-white text-sm">Apache-2.0 Conformance</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Every component file contains standard SPDX-License-Identifier markers, guaranteeing open commercial utilization.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-900 p-5 rounded-xl space-y-3">
          <div className="h-8 w-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Key className="h-4.5 w-4.5" />
          </div>
          <span className="text-[10px] font-mono uppercase text-slate-500 block">python range</span>
          <h3 className="font-bold text-white text-sm">Python {stableRelease.pythonVersionRange}</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Fully tested against Python 3.10, 3.11, 3.12, 3.13, and prerelease 3.14 environments across modern OS.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-slate-900 p-5 rounded-xl space-y-3">
          <div className="h-8 w-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <FileText className="h-4.5 w-4.5" />
          </div>
          <span className="text-[10px] font-mono uppercase text-slate-500 block">component bounds</span>
          <h3 className="font-bold text-white text-sm">14 Coordinated Subpackages</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            The monorepo aggregates separate logical extensions to preserve strict domain boundaries.
          </p>
        </div>

      </section>

      {/* Verification Boundary Documents */}
      <section className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6" aria-labelledby="documents-title">
        <div className="space-y-1.5">
          <h2 id="documents-title" className="text-xl font-bold text-white tracking-tight">
            Repository Certification & Boundaries
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
            Tigrcorn publishes strict governance bounds directly in its repository to prevent scope expansion and maintain extreme execution speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {conformanceBoundaryDocs.map((doc) => (
            <div key={doc.name} className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 p-5 rounded-xl space-y-3 transition flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-orange-400 block">{doc.name}</span>
                <p className="text-xs text-slate-400 leading-relaxed">{doc.role}</p>
              </div>
              <a 
                href={`${stableRelease.githubUrl}/blob/main/${doc.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 pt-3 border-t border-slate-900"
              >
                Inspect document source
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Release Cryptographic hashes info */}
      <section className="bg-slate-950/20 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-3">
        <span className="text-xs font-mono font-bold text-orange-400 block uppercase tracking-wider">Preserved Release Hashes (SHA-256)</span>
        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
          Tigrcorn's release manager signs each package distribution prior to PyPI uploading. Standard SHA-256 artifacts verification balances local packages with canonical sources. You can cross-reference package distributions hashes directly via:
        </p>
        <code className="block bg-slate-950 border border-slate-900 px-3 py-2.5 rounded text-[11px] font-mono text-slate-300 break-all select-all leading-normal">
          curl -s https://pypi.org/pypi/tigrcorn/json | jq '.releases."{stableRelease.version}"[].digests.sha256'
        </code>
      </section>

    </div>
  );
}
