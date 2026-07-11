import React from 'react';
import { Github, BookOpen, Layers, Terminal, Shield, FileText } from 'lucide-react';
import { stableRelease } from '../data';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 font-black text-white text-xs">
                TC
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Tigrcorn</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              The high-performance, developer-first ASGI3 Python web server with modern transport multiplexing and explicit security profiles.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-orange-400" />
                Apache-2.0 License
              </span>
              <span>•</span>
              <span>Python {stableRelease.pythonVersionRange}</span>
            </div>
          </div>

          {/* Links Col 1: Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/platform/" onClick={(e) => handleLinkClick(e, '/platform/')} className="hover:text-white transition">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="/protocols/" onClick={(e) => handleLinkClick(e, '/protocols/')} className="hover:text-white transition">
                  Protocol Matrix
                </a>
              </li>
              <li>
                <a href="/operations/" onClick={(e) => handleLinkClick(e, '/operations/')} className="hover:text-white transition">
                  Deployment Profiles
                </a>
              </li>
            </ul>
          </div>

          {/* Links Col 2: Project Info */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Project</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/proof/" onClick={(e) => handleLinkClick(e, '/proof/')} className="hover:text-white transition">
                  Certification Proof
                </a>
              </li>
              <li>
                <a href="/releases/" onClick={(e) => handleLinkClick(e, '/releases/')} className="hover:text-white transition">
                  Releases & Changelogs
                </a>
              </li>
              <li>
                <a href={stableRelease.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white transition">
                  <Github className="h-3.5 w-3.5" />
                  GitHub Source
                </a>
              </li>
              <li>
                <a href={stableRelease.docsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white transition">
                  <BookOpen className="h-3.5 w-3.5" />
                  Canonical Docs
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Tigrcorn Project. Built with professional precision and extreme protocol integrity.</p>
          <div className="flex gap-4">
            <a href="/articles/adopting-asgi3-migrating-to-tigrcorn" onClick={(e) => handleLinkClick(e, '/articles/adopting-asgi3-migrating-to-tigrcorn')} className="hover:text-slate-300 transition">
              Migration Guide
            </a>
            <span>•</span>
            <a href="/articles/designing-mtls-and-trust-store-policies" onClick={(e) => handleLinkClick(e, '/articles/designing-mtls-and-trust-store-policies')} className="hover:text-slate-300 transition">
              mTLS Guide
            </a>
            <span>•</span>
            <a href="/articles/optimizing-edge-static-assets" onClick={(e) => handleLinkClick(e, '/articles/optimizing-edge-static-assets')} className="hover:text-slate-300 transition">
              Edge Static Assets
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
