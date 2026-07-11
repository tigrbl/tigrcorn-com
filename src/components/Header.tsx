import React from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { stableRelease } from '../data';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: 'Product', path: '/platform/' },
    { name: 'Protocols', path: '/protocols/' },
    { name: 'Operations', path: '/operations/' },
    { name: 'Proof', path: '/proof/' },
    { name: 'Releases', path: '/releases/' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center">
            <a 
              href="/" 
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md p-1"
              aria-label="Tigrcorn home"
            >
              {/* Tigrcorn branding mark: orange/amber glowing double-accent */}
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-500/20 text-white font-black overflow-hidden border border-orange-400">
                <span className="text-lg tracking-tighter leading-none select-none">TC</span>
                <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-amber-300 animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white leading-tight">Tigrcorn</span>
                <span className="text-[10px] font-mono text-orange-400 tracking-wider uppercase leading-none font-semibold">ASGI3 Web Server</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Primary site navigation">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    isActive 
                      ? 'bg-slate-900 border-slate-700 text-orange-400 font-semibold' 
                      : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Actions / CTA */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
              v{stableRelease.version}
            </span>
            <a
              href="/releases/"
              onClick={(e) => handleLinkClick(e, '/releases/')}
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2.5">
            <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-800">
              v{stableRelease.version}
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 border border-slate-800"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-1.5" id="mobile-menu">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-all ${
                  isActive 
                    ? 'bg-slate-900 text-orange-400 border-l-4 border-l-orange-500 pl-2' 
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.name}
              </a>
            );
          })}
          <div className="pt-4 border-t border-slate-900 flex flex-col gap-3">
            <a
              href="/releases/"
              onClick={(e) => handleLinkClick(e, '/releases/')}
              className="flex w-full items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg text-base font-semibold transition-all"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
