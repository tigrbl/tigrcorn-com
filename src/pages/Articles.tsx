import React from 'react';
import { BookOpen, Calendar, User, Clock, ArrowLeft, ChevronRight, FileText, Share2, Clipboard } from 'lucide-react';
import { articles } from '../data';
import CopyableCode from '../components/CopyableCode';

interface ArticlesProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Articles({ currentPath, onNavigate }: ArticlesProps) {
  // Extract slug if we are on a detail path like /articles/adopting-asgi3-migrating-to-tigrcorn
  const slug = currentPath.startsWith('/articles/') ? currentPath.replace('/articles/', '') : '';
  const activeArticle = articles.find(a => a.slug === slug);

  // Parse custom markdown-like segments in article content to render properly formatted code/text blocks
  const renderArticleContent = (text: string) => {
    const lines = text.split('\n');
    let isInsideCodeBlock = false;
    let codeBlockLines: string[] = [];
    let codeBlockLang = '';
    const renderedElements: React.ReactNode[] = [];

    lines.forEach((line, index) => {
      // Toggle Code Blocks
      if (line.trim().startsWith('```')) {
        if (!isInsideCodeBlock) {
          isInsideCodeBlock = true;
          codeBlockLang = line.replace('```', '').trim() || 'bash';
          codeBlockLines = [];
        } else {
          isInsideCodeBlock = false;
          renderedElements.push(
            <div key={`code-${index}`} className="my-5">
              <CopyableCode code={codeBlockLines.join('\n')} language={codeBlockLang} />
            </div>
          );
        }
        return;
      }

      if (isInsideCodeBlock) {
        codeBlockLines.push(line);
        return;
      }

      // Render Headings
      if (line.trim().startsWith('###')) {
        const title = line.replace('###', '').trim();
        const elementId = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
        renderedElements.push(
          <h3 key={`h3-${index}`} id={elementId} className="text-lg font-bold text-white tracking-tight mt-6 mb-2.5 scroll-mt-20">
            {title}
          </h3>
        );
        return;
      }

      if (line.trim().startsWith('##')) {
        const title = line.replace('##', '').trim();
        const elementId = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
        renderedElements.push(
          <h2 key={`h2-${index}`} id={elementId} className="text-xl font-black text-white tracking-tight mt-8 mb-3 border-b border-slate-900 pb-1 scroll-mt-20">
            {title}
          </h2>
        );
        return;
      }

      // Lists
      if (line.trim().startsWith('-')) {
        const listText = line.replace('-', '').trim();
        // Simple inline bold parser
        const boldParts = listText.split('**');
        let parsedNode: React.ReactNode = listText;
        if (boldParts.length === 3) {
          parsedNode = (
            <>
              {boldParts[0]}<strong>{boldParts[1]}</strong>{boldParts[2]}
            </>
          );
        }
        renderedElements.push(
          <ul key={`ul-${index}`} className="list-disc pl-5 my-2 space-y-1">
            <li className="text-xs text-slate-300 leading-normal">{parsedNode}</li>
          </ul>
        );
        return;
      }

      // Empty Lines
      if (line.trim() === '') {
        renderedElements.push(<div key={`space-${index}`} className="h-2"></div>);
        return;
      }

      // Standard paragraphs with inline code ticks mapping
      const parts = line.split('`');
      if (parts.length > 1) {
        const parsedParagraph: React.ReactNode[] = [];
        parts.forEach((part, partIdx) => {
          if (partIdx % 2 === 1) {
            parsedParagraph.push(
              <code key={partIdx} className="bg-slate-900 border border-slate-800 text-orange-400 px-1 py-0.5 rounded text-[11px] font-mono font-semibold">
                {part}
              </code>
            );
          } else {
            parsedParagraph.push(<span key={partIdx}>{part}</span>);
          }
        });
        renderedElements.push(
          <p key={`p-${index}`} className="text-xs text-slate-300 leading-relaxed mb-3">
            {parsedParagraph}
          </p>
        );
      } else {
        renderedElements.push(
          <p key={`p-${index}`} className="text-xs text-slate-300 leading-relaxed mb-3">
            {line}
          </p>
        );
      }
    });

    return renderedElements;
  };

  // Helper to extract H3 headings as Table of Contents list
  const extractTableOfContents = (text: string) => {
    const lines = text.split('\n');
    const list: { text: string; id: string }[] = [];
    lines.forEach((line) => {
      if (line.trim().startsWith('###')) {
        const name = line.replace('###', '').trim();
        const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        list.push({ text: name, id });
      } else if (line.trim().startsWith('##')) {
        const name = line.replace('##', '').trim();
        const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        list.push({ text: name, id });
      }
    });
    return list;
  };

  // 1. ARTICLE DETAIL VIEW
  if (activeArticle) {
    const toc = extractTableOfContents(activeArticle.content);
    return (
      <div className="py-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500" aria-label="Breadcrumb">
          <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }} className="hover:text-white transition">
            Home
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <a href="/releases/" onClick={(e) => { e.preventDefault(); onNavigate('/releases/'); }} className="hover:text-white transition">
            Guides
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-300 truncate max-w-[200px] sm:max-w-none">{activeArticle.title}</span>
        </nav>

        {/* Article Grid Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Article column (8 cols on lg) */}
          <article className="lg:col-span-8 bg-slate-950/40 border border-slate-850 p-6 sm:p-8 rounded-2xl space-y-6">
            
            {/* Header Area */}
            <div className="space-y-4 border-b border-slate-900 pb-5">
              <span className="inline-flex px-2.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-mono uppercase font-bold tracking-wider select-none">
                {activeArticle.category} GUIDE
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {activeArticle.title}
              </h1>
              
              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 select-none">
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>{activeArticle.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{activeArticle.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>
            </div>

            {/* Custom rendered body */}
            <div className="text-slate-300 leading-relaxed font-sans max-w-none">
              {renderArticleContent(activeArticle.content)}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-900 flex items-center justify-between gap-4">
              <button
                onClick={() => onNavigate('/')}
                type="button"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </button>
            </div>

          </article>

          {/* Table of Contents sidebar (4 cols on lg, hidden on small screens) */}
          <aside className="hidden lg:block lg:col-span-4 bg-slate-950/40 border border-slate-900 rounded-2xl p-5 sticky top-24 space-y-4" aria-labelledby="toc-heading">
            <h2 id="toc-heading" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Table of Contents
            </h2>
            <ul className="space-y-2">
              {toc.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className="text-xs text-slate-400 hover:text-orange-400 transition block py-1 border-l-2 border-slate-900 hover:border-orange-500 pl-3 leading-normal"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

        </div>
      </div>
    );
  }

  // 2. ARTICLES INDEX DIRECTORY
  return (
    <div className="space-y-12 py-8">
      
      {/* Index header */}
      <section className="space-y-3" aria-labelledby="articles-dir-title">
        <div className="flex items-center gap-2 text-orange-500 font-mono text-xs font-semibold uppercase tracking-wide">
          <BookOpen className="h-4.5 w-4.5" />
          <span>Resource Guides</span>
        </div>
        <h1 id="articles-dir-title" className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Implementation & Adoption Guides
        </h1>
        <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
          Read curated, code-backed engineering articles designed to help you migrate, configure, secure, and operate Tigrcorn servers in zero-trust mesh architectures.
        </p>
      </section>

      {/* Directory Cards list */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Available articles">
        {articles.map((article) => (
          <div key={article.slug} className="bg-slate-950/40 border border-slate-850 hover:border-orange-500/30 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition group">
            <div className="space-y-3">
              <span className="inline-flex px-2 py-0.5 rounded bg-slate-900 text-orange-400 border border-slate-800 text-[10px] font-mono font-bold uppercase tracking-wide">
                {article.category}
              </span>
              <h2 className="text-base font-bold text-white group-hover:text-orange-400 transition leading-tight line-clamp-2">
                {article.title}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-900 flex items-center justify-between gap-2 text-slate-500 text-xs">
              <span className="font-medium font-mono">{article.readTime}</span>
              <button
                onClick={() => onNavigate(`/articles/${article.slug}`)}
                type="button"
                className="inline-flex items-center gap-1 font-bold text-orange-400 hover:text-orange-300 transition"
              >
                Read Guide
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
