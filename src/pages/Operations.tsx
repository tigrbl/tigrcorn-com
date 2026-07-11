import React from 'react';
import { Settings, Shield, Terminal, BookOpen, AlertTriangle, Play, Sliders } from 'lucide-react';
import { stableRelease } from '../data';
import CopyableCode from '../components/CopyableCode';
import SyntaxCode from '../components/SyntaxCode';

export default function Operations() {
  const precedenceData = [
    { level: 1, source: 'CLI Flags', description: 'Explicit options passed directly to the launch command take absolute precedence over all other inputs.', example: 'tigrcorn app:app --port 9000' },
    { level: 2, source: 'Environment Variables', description: 'Environment variables prefixed with TIGRCORN_ override config files and default values.', example: 'export TIGRCORN_PORT=9000' },
    { level: 3, source: 'Configuration Files', description: 'Standard INI/TOML configurations loaded via the --config parameter define structured profiles.', example: 'tigrcorn app:app --config prod.ini' },
    { level: 4, source: 'Built-in Defaults', description: 'Conservative, single-worker fallback parameters are applied if no options are specified.', example: 'v0.3.17 build fallbacks' }
  ];

  const recipeH3 = `# 1. Launch with dual UDP and TCP binders
tigrcorn app:app \\
  --profile strict-h3-edge \\
  --certfile /etc/certs/fullchain.pem \\
  --keyfile /etc/certs/privkey.pem \\
  --bind 0.0.0.0:443

# Alt-Svc headers are automatically injected into standard TCP/2 headers:
# Alt-Svc: h3=":443"; ma=86400`;

  const recipeHostChecking = `# Enforce strict Host and Proxy matching
tigrcorn app:app \\
  --profile strict-h1-origin \\
  --allowed-hosts api.example.com,status.example.com \\
  --trusted-proxies 10.0.0.0/8,172.16.0.0/12`;

  const recipeStaticMount = `# Serve static files directly via kernel zero-copy sendfile
tigrcorn app:app \\
  --profile static-origin \\
  --static-mount /assets:./dist/assets \\
  --precompressed brotli,gzip \\
  --cache-control "public, max-age=31536000, immutable"`;

  return (
    <div className="space-y-12 py-8">
      
      {/* Header Block */}
      <section className="space-y-3" aria-labelledby="ops-title">
        <div className="flex items-center gap-2 text-orange-500 font-mono text-xs font-semibold uppercase tracking-wide">
          <Settings className="h-4.5 w-4.5" />
          <span>Operations Manual</span>
        </div>
        <h1 id="ops-title" className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Server Operations & Tuning
        </h1>
        <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
          Learn how to run Tigrcorn safely in production environments. Configure worker scaling, establish secure headers, and review configuration loading precedence.
        </p>
      </section>

      {/* Configuration Precedence */}
      <section className="space-y-4" aria-labelledby="precedence-title">
        <h2 id="precedence-title" className="text-xl font-bold text-white tracking-tight">
          Configuration Resolution Precedence
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
          Tigrcorn resolves variables in a strict cascading model. Direct CLI commands always overwrite environment states and stored files.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {precedenceData.map((item) => (
            <div key={item.level} className="bg-slate-950/40 border border-slate-900 p-4.5 rounded-xl space-y-2.5 relative overflow-hidden group hover:border-slate-800 transition">
              <div className="absolute top-2 right-2 text-[10px] font-mono font-bold text-slate-700 select-none">
                LVL {item.level}
              </div>
              <div className="text-sm font-bold text-white group-hover:text-orange-400 transition">{item.source}</div>
              <p className="text-xs text-slate-400 leading-normal">{item.description}</p>
              <SyntaxCode code={item.example} language="bash" className="text-[10px] font-mono block bg-slate-900 p-2 rounded select-all border border-slate-900 overflow-x-auto" />
            </div>
          ))}
        </div>
      </section>

      {/* Short Recipes section */}
      <section className="space-y-6" aria-labelledby="recipes-title">
        <div className="space-y-2">
          <h2 id="recipes-title" className="text-xl font-bold text-white tracking-tight">
            Common Production Recipes
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
            Copy validated configurations tailored for common edge and origin scenarios.
          </p>
        </div>

        <div className="space-y-6">
          {/* Recipe 1 */}
          <div className="bg-slate-950/20 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                  Enabling HTTP/2 & HTTP/3 Edge (Dual Bind)
                </h3>
                <p className="text-xs text-slate-400 max-w-xl">
                  Binds to TCP and UDP ports on 443. Alt-Svc headers are injected natively into the TCP response headers to guide browsers.
                </p>
              </div>
            </div>
            <CopyableCode code={recipeH3} language="bash" title="HTTP/3 Dual Bind Launch" />
          </div>

          {/* Recipe 2 */}
          <div className="bg-slate-950/20 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                  Restricting Host and Proxy Trust Headers
                </h3>
                <p className="text-xs text-slate-400 max-w-xl">
                  Enforces strict request filtering to prevent Host header poisoning. Maps the specific IP CIDRs of your upstream reverse proxies.
                </p>
              </div>
            </div>
            <CopyableCode code={recipeHostChecking} language="bash" title="Host Checking Config" />
          </div>

          {/* Recipe 3 */}
          <div className="bg-slate-950/20 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                  Serving Precompressed Static Asset Mounts
                </h3>
                <p className="text-xs text-slate-400 max-w-xl">
                  Mounts a static folder directly inside Tigrcorn. Direct kernel zero-copy sendfile avoids Python worker overhead.
                </p>
              </div>
            </div>
            <CopyableCode code={recipeStaticMount} language="bash" title="Static Precompressed Delivery" />
          </div>
        </div>
      </section>

      {/* Defer to Canonical Docs Link */}
      <section className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-white block">Need the complete parameters reference?</span>
          <span className="text-xs text-slate-400 block">Review full manuals covering logging limits, workers recycles, keep-alives, and process isolation options.</span>
        </div>
        <a 
          href={stableRelease.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap"
        >
          <BookOpen className="h-3.5 w-3.5" />
          Operator Docs
        </a>
      </section>

    </div>
  );
}
