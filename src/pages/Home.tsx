import React from 'react';
import { ArrowRight, Github, BookOpen, ShieldCheck, Terminal, Layers, ArrowUpRight, Cpu } from 'lucide-react';
import { stableRelease } from '../data';
import CopyableCode from '../components/CopyableCode';
import ProfileSelector from '../components/ProfileSelector';
import ArchitectureFlow from '../components/ArchitectureFlow';
import QuickStartExamples from '../components/QuickStartExamples';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="space-y-12 py-8">
      
      {/* 1. Top Bento Row (Hero + Release Proof) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Hero Card */}
        <div className="lg:col-span-8 bg-slate-800 border border-white/5 rounded-3xl p-6 sm:p-10 flex flex-col justify-center relative overflow-hidden group transition-all duration-300 hover:border-white/10">
          {/* Subtle background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse"></span>
              ASGI3 Server for Python {stableRelease.pythonVersionRange}
            </span>

            <h1 id="hero-title" className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
              Modern protocols.<br className="hidden sm:inline" /> Explicit operational control.
            </h1>

            <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
              Run Python services over HTTP/1.1, HTTP/2, HTTP/3, QUIC, and WebSocket—with TLS, static delivery, observability, and inspectable release evidence built into the project.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a
                href="/releases/"
                onClick={(e) => handleLinkClick(e, '/releases/')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-500/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={stableRelease.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition border border-white/5 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>

            <div className="pt-4 max-w-md space-y-2">
              <CopyableCode code={`${stableRelease.uvInstallCommand}\n${stableRelease.installCommand}`} language="bash" title="Install with uv or pip" />
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 select-none">
                <span>Stable Release: <strong>{stableRelease.version}</strong></span>
                <span>•</span>
                <span>License: <strong>{stableRelease.license}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Release Proof & Certification Bento Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#1A1108] to-[#151515] border border-orange-500/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 hover:border-orange-500/40">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] uppercase tracking-widest text-[#F27D26] font-bold">
                  Release Proof
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight">Certified Product Boundary</h4>
              </div>
              <ShieldCheck className="h-6 w-6 text-[#F27D26] shadow-[0_0_15px_rgba(242,125,38,0.2)]" />
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Certification boundary artifact generated and signed on <strong>{stableRelease.releaseDate}</strong>. Verified against full RFC compliance benchmarks.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                <span className="text-slate-400 font-medium">Standard Version</span>
                <span className="font-mono text-white font-semibold">v{stableRelease.version}</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                <span className="text-slate-400 font-medium">Python Range</span>
                <span className="font-mono text-white font-semibold">{stableRelease.pythonVersionRange}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">License Posture</span>
                <span className="font-mono text-[#F27D26] font-semibold">{stableRelease.license}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <div className="flex gap-2">
              <span className="px-2.5 py-1 bg-white/5 rounded-lg text-[10px] font-mono border border-white/5 text-slate-300">inspect-proof</span>
              <span className="px-2.5 py-1 bg-white/5 rounded-lg text-[10px] font-mono border border-white/5 text-slate-300">sls-checksum-v1</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981] animate-pulse"></span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Certified Production</span>
              </div>
              <a 
                href="/proof/" 
                onClick={(e) => handleLinkClick(e, '/proof/')}
                className="text-[10px] font-mono text-slate-400 hover:text-white transition flex items-center gap-0.5"
              >
                View evidence <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Protocol Strip */}
      <section className="border-y border-white/5 bg-slate-900/20 py-6" aria-label="Supported Protocols">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {['HTTP/1.1', 'HTTP/2', 'HTTP/3 (QUIC)', 'WebSocket', 'mTLS 1.3', 'Static Delivery'].map((proto, index) => (
              <div key={index} className="px-4 py-3 rounded-xl bg-slate-800 border border-white/5 flex flex-col items-center justify-center gap-1.5 hover:border-white/10 hover:bg-slate-700/50 transition duration-150">
                <span className="text-xs font-bold text-white tracking-tight">{proto}</span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-semibold select-none flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_4px_#10B981]"></span>
                  Stable
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Tigrcorn Pillars */}
      <section className="space-y-6" aria-labelledby="pillars-title">
        <div className="space-y-1.5">
          <h2 id="pillars-title" className="text-xl font-bold text-white tracking-tight">
            Why Tigrcorn?
          </h2>
          <p className="text-xs text-slate-400 max-w-lg">
            Built from scratch to bring predictable, native performance guarantees to the Python ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bento-card space-y-3">
            <div className="h-9 w-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-white text-base">Modern Transports</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              HTTP/1.1 through HTTP/3 and WebSockets natively integrated. No heavy, unbuffered sidecars or complex protocol bridging.
            </p>
          </div>

          <div className="bento-card space-y-3">
            <div className="h-9 w-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-white text-base">Explicit Operations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ditch the guess-and-test config lifecycle. Secure zero-trust deployments instantly using predefined <strong className="text-slate-300">Blessed Profiles</strong>.
            </p>
          </div>

          <div className="bento-card space-y-3">
            <div className="h-9 w-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-white text-base">Embeddable API</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Programmatic, robust lifecycle control. Start, stop, and configure servers natively inside your Python scripts using <code className="text-orange-400 text-[10px] font-mono">EmbeddedServer</code>.
            </p>
          </div>

          <div className="bento-card space-y-3">
            <div className="h-9 w-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-white text-base">Inspectable Proof</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verifiable build history, test suites, and strict conformance boundary documentation published with every single coordinate.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Quick Start Path */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-800 border border-white/5 p-6 sm:p-8 rounded-3xl" aria-labelledby="quickstart-title">
        <div className="lg:col-span-5 space-y-4">
          <span className="inline-block px-2.5 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] uppercase tracking-widest text-[#F27D26] font-bold">
            Development Playbook
          </span>
          <h2 id="quickstart-title" className="text-2xl font-black text-white tracking-tight leading-tight">
            Get Up and Running in 30 Seconds
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Start with Tigrbl for a governed application surface, bring an existing FastAPI app, or run a framework-free ASGI3 callable directly.
          </p>
          <div className="space-y-2 pt-1">
            <div className="flex gap-2 text-xs text-slate-400 font-medium">
              <span className="text-emerald-400 font-bold">✓</span> Compatible with Python 3.10 to 3.14
            </div>
            <div className="flex gap-2 text-xs text-slate-400 font-medium">
              <span className="text-emerald-400 font-bold">✓</span> Multi-threaded UDP/TCP listeners
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-7">
          <QuickStartExamples />
        </div>
      </section>

      {/* 5. Deployment Profiles */}
      <section className="space-y-6 animate-fade-in" aria-labelledby="profiles-compare-title">
        <div className="space-y-1">
          <h2 id="profiles-compare-title" className="text-xl font-bold text-white tracking-tight">
            Blessed Deployment Profiles
          </h2>
          <p className="text-xs text-slate-400 max-w-lg">
            Ditch abstract defaults. Choose from predefined, secure configurations out-of-the-box.
          </p>
        </div>

        <ProfileSelector />
      </section>

      {/* 6. Modular Architecture Explanation */}
      <section className="space-y-6" aria-labelledby="arch-title">
        <div className="space-y-1">
          <h2 id="arch-title" className="text-xl font-bold text-white tracking-tight">
            Modular Connection Architecture
          </h2>
          <p className="text-xs text-slate-400 max-w-lg">
            From raw network sockets to your Python connection handler—completely separated and inspectable.
          </p>
        </div>

        <ArchitectureFlow />
      </section>

      {/* 7. Bottom Gateway CTA */}
      <section className="text-center border-t border-white/5 pt-12 max-w-xl mx-auto space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Ready to deploy Tigrcorn?
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Get started with our complete installation scripts, read canonical operations manuals, or explore the verified release proof coordinates.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
          <a
            href="/protocols/"
            onClick={(e) => handleLinkClick(e, '/protocols/')}
            className="inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-700 text-white px-4.5 py-2.5 rounded-xl text-xs font-bold transition border border-white/5"
          >
            Explore Protocols
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="/operations/"
            onClick={(e) => handleLinkClick(e, '/operations/')}
            className="inline-flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4.5 py-2.5 rounded-xl text-xs font-bold transition shadow-lg shadow-orange-500/10"
          >
            Operations Manual
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

    </div>
  );
}
