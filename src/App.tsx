import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Platform from './pages/Platform';
import Protocols from './pages/Protocols';
import Operations from './pages/Operations';
import Proof from './pages/Proof';
import Releases from './pages/Releases';
import Articles from './pages/Articles';
import NotFound from './pages/NotFound';
import { articles, stableRelease } from './data';

export default function App() {
  // Initialize from actual pathname. Handles direct loads and iframe contexts beautifully.
  const [currentPath, setCurrentPath] = React.useState(() => {
    const path = window.location.pathname;
    // Normalize trailing slash if present, but keep root as '/'
    return path;
  });

  // Listen to popstate event (back/forward browser buttons)
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Standard Navigate helper
  const navigate = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route-aware metadata dynamic updater with rich schema.org JSON-LD graphs
  React.useEffect(() => {
    let title = 'Tigrcorn — Modern ASGI3 Python Web Server';
    let description = 'The high-performance developer-first ASGI3 server built for APIs, edge services, and protocol-heavy applications.';

    const baseUrl = 'https://tigrcorn.com';
    const canonicalUrl = `${baseUrl}${currentPath}`;

    // 1. Establish central Organization, SoftwareApplication, and SoftwareSourceCode nodes
    const orgNode = {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      'name': 'Tigrcorn Project',
      'url': baseUrl,
      'logo': {
        '@type': 'ImageObject',
        'url': `${baseUrl}/logo.png`
      },
      'sameAs': [
        'https://github.com/tigrbl/tigrcorn'
      ]
    };

    const softwareNode = {
      '@type': 'SoftwareApplication',
      '@id': `${baseUrl}/#software`,
      'name': 'Tigrcorn',
      'description': 'Run Python services over HTTP/1.1, HTTP/2, HTTP/3, QUIC, and WebSocket—with TLS, static delivery, and inspectable release evidence.',
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Linux, macOS, Windows',
      'softwareVersion': stableRelease.version,
      'license': 'https://www.apache.org/licenses/LICENSE-2.0',
      'downloadUrl': stableRelease.pypiUrl,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'publisher': {
        '@id': `${baseUrl}/#organization`
      }
    };

    const sourceCodeNode = {
      '@type': 'SoftwareSourceCode',
      '@id': `${baseUrl}/#sourcecode`,
      'name': 'Tigrcorn Source Code',
      'programmingLanguage': 'Python',
      'codeRepository': stableRelease.githubUrl,
      'targetProduct': {
        '@id': `${baseUrl}/#software`
      },
      'license': 'https://www.apache.org/licenses/LICENSE-2.0',
      'runtimePlatform': `Python ${stableRelease.pythonVersionRange}`
    };

    const graphNodes: Record<string, any>[] = [orgNode, softwareNode, sourceCodeNode];
    let faqQuestions: { q: string, a: string }[] = [];

    // Route matching & page-specific schema nodes
    if (currentPath === '/' || currentPath === '') {
      title = 'Tigrcorn — Modern ASGI3 Python Web Server';
      description = 'Run Python services over HTTP/1.1, HTTP/2, HTTP/3, QUIC, and WebSocket—with TLS, static delivery, and inspectable release evidence.';

      graphNodes.push({
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': title,
        'description': description,
        'isPartOf': {
          '@type': 'WebSite',
          '@id': `${baseUrl}/#website`,
          'name': 'Tigrcorn',
          'url': baseUrl
        }
      });

      faqQuestions = [
        {
          q: 'What is Tigrcorn?',
          a: 'Tigrcorn is an ASGI3 Python web server built for APIs, edge services, and protocol-heavy applications supporting HTTP/1.1, HTTP/2, HTTP/3, QUIC, and WebSockets.'
        },
        {
          q: 'How do I install Tigrcorn?',
          a: 'You can install Tigrcorn via pip: python -m pip install tigrcorn.'
        },
        {
          q: 'What Python versions are supported by Tigrcorn?',
          a: 'Tigrcorn supports Python versions >=3.10 and <3.15, covering Python 3.10 through 3.14.'
        }
      ];
    } else if (currentPath === '/platform/') {
      title = 'Tigrcorn Web Platform — Core Capabilities';
      description = 'Explore mTLS security, static asset delivery, application embedding APIs, and modular package separation.';

      graphNodes.push({
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': title,
        'description': description
      });

      faqQuestions = [
        {
          q: 'Does Tigrcorn support mTLS (Mutual TLS)?',
          a: 'Yes, Tigrcorn supports authenticated h2 mesh origin configuration with client certificate checks and trust anchor policies natively.'
        },
        {
          q: 'What are Tigrcorn’s core static serving features?',
          a: 'Tigrcorn serves static assets using direct kernel zero-copy sendfile, routing precompressed Brotli and Gzip assets natively to bypass Python interpreter overhead.'
        }
      ];
    } else if (currentPath === '/protocols/') {
      title = 'Protocol Conformance Matrix — Tigrcorn';
      description = 'Detailed support matrix and direct CLI configurations for HTTP/1.1, HTTP/2, HTTP/3, QUIC, and WebSocket.';

      graphNodes.push({
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': title,
        'description': description
      });

      faqQuestions = [
        {
          q: 'Which protocols does Tigrcorn support natively?',
          a: 'HTTP/1.1, HTTP/2, HTTP/3, QUIC, WebSocket, and mTLS 1.3.'
        },
        {
          q: 'What HTTP/3 specifications are verified in Tigrcorn?',
          a: 'Full RFC 9114 compliance verified with ALPN negotiation, TCP fallback, 0-RTT options, and custom flow control configurations.'
        }
      ];
    } else if (currentPath === '/operations/') {
      title = 'Operations Manual & Tuning — Tigrcorn';
      description = 'Scale worker count, set proxy trust parameters, and tune keep-alive cycles using Blessed Profiles.';

      graphNodes.push({
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': title,
        'description': description
      });

      faqQuestions = [
        {
          q: 'What is the configuration resolution precedence in Tigrcorn?',
          a: 'Tigrcorn resolves variables in a strict cascading model: direct CLI flags always override environment variables, which in turn override config files, then falling back to built-in defaults.'
        },
        {
          q: 'How can I run a dual TCP/UDP HTTP/3 edge setup?',
          a: 'Launch Tigrcorn using the strict-h3-edge profile, passing the certfile, keyfile, and binding to port 443: tigrcorn main:app --profile strict-h3-edge --certfile cert.pem --keyfile key.pem --bind 0.0.0.0:443.'
        }
      ];
    } else if (currentPath === '/proof/') {
      title = 'Verifiable Product Proof & Conformance — Tigrcorn';
      description = 'Review PyPI stable coordinates, Python ranges, Apache-2.0 license limits, and certified boundary documents.';

      graphNodes.push({
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': title,
        'description': description
      });

      faqQuestions = [
        {
          q: 'What license is Tigrcorn distributed under?',
          a: 'Tigrcorn is licensed under the Apache-2.0 open-source license, guaranteeing open commercial utilization.'
        },
        {
          q: 'Where are stable releases of Tigrcorn verified and published?',
          a: 'Tigrcorn stable releases are published directly on PyPI under the coordinate "tigrcorn" with accompanying signed release manifests on GitHub.'
        }
      ];
    } else if (currentPath === '/releases/') {
      title = 'Releases Archives & Changelogs — Tigrcorn';
      description = 'Read synchronized release changelogs for coordinated aggregates and components packages.';

      graphNodes.push({
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': title,
        'description': description
      });

      faqQuestions = [
        {
          q: 'What is the latest stable version of Tigrcorn?',
          a: 'The latest stable version is 0.3.17.'
        },
        {
          q: 'Does Tigrcorn release coordinated packages?',
          a: 'Yes, Tigrcorn coordinates stable package publications across its 14 logical subpackages to ensure version consistency.'
        }
      ];
    } else if (currentPath.startsWith('/articles/')) {
      const slug = currentPath.replace('/articles/', '');
      const article = articles.find(a => a.slug === slug);
      if (article) {
        title = `${article.title} — Tigrcorn Guide`;
        description = article.excerpt;

        graphNodes.push({
          '@type': 'TechArticle',
          '@id': `${canonicalUrl}#article`,
          'headline': article.title,
          'datePublished': article.date,
          'description': article.excerpt,
          'inLanguage': 'en',
          'mainEntityOfPage': canonicalUrl,
          'author': {
            '@id': `${baseUrl}/#organization`
          },
          'publisher': {
            '@id': `${baseUrl}/#organization`
          }
        });

        graphNodes.push({
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl}#breadcrumb`,
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': `${baseUrl}/`
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Releases & Guides',
              'item': `${baseUrl}/releases/`
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': article.title,
              'item': canonicalUrl
            }
          ]
        });
      } else {
        title = 'Guide Not Found — Tigrcorn';
      }
    } else {
      title = 'Page Not Found — Tigrcorn';
    }

    // Wrap in FAQPage if we accumulated questions
    if (faqQuestions.length > 0) {
      graphNodes.push({
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        'mainEntity': faqQuestions.map(item => ({
          '@type': 'Question',
          'name': item.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.a
          }
        }))
      });
    }

    // Update standard DOM elements
    document.title = title;

    // Update or insert meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update or insert OpenGraph Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // Update/Insert JSON-LD schema tag
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const finalJsonLd = {
      '@context': 'https://schema.org',
      '@graph': graphNodes
    };

    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(finalJsonLd);
    document.head.appendChild(script);

  }, [currentPath]);

  // Page Routing selection
  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <Home onNavigate={navigate} />;
    }
    if (currentPath === '/platform/') {
      return <Platform onNavigate={navigate} />;
    }
    if (currentPath === '/protocols/') {
      return <Protocols />;
    }
    if (currentPath === '/operations/') {
      return <Operations />;
    }
    if (currentPath === '/proof/') {
      return <Proof onNavigate={navigate} />;
    }
    if (currentPath === '/releases/') {
      return <Releases />;
    }
    if (currentPath.startsWith('/articles/')) {
      return <Articles currentPath={currentPath} onNavigate={navigate} />;
    }
    return <NotFound onNavigate={navigate} />;
  };

  return (
    <div id="tigrcorn-app-root" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500/30 selection:text-orange-200">

      {/* Dynamic Header */}
      <Header currentPath={currentPath} onNavigate={navigate} />

      {/* Main Page Area with Route Transitions */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Dynamic Footer */}
      <Footer onNavigate={navigate} />

    </div>
  );
}
