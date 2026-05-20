import siteContent from "../packages/site-content-pack/src/index";

const links = [
  { label: "Runtime", href: "/platform/" },
  { label: "Proof", href: "/proof/" },
  { label: "Docs", href: "https://docs.tigrcorn.com" }
];

const recentNotes = [
  {
    title: "Protocol-aware ASGI runtime",
    href: "/platform/",
    body: "A runtime surface for HTTP, WebSocket, SSE, and modern Python service delivery."
  },
  {
    title: "Operator-owned publication",
    href: "/proof/",
    body: "Build, Docker, DNS, and proxy state live with the website that publishes the product surface."
  },
  {
    title: "Runtime documentation",
    href: "https://docs.tigrcorn.com",
    body: "Use the docs site for configuration, backend support, and deployment details."
  }
];

function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="site-brand" href="/" aria-label="Tigrcorn home">
          <img src="/assets/brand/tigrcorn/tigrcorn-brand-lockup.svg" alt="Tigrcorn" />
        </a>
        <nav aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>{siteContent.footer?.note}</p>
        <div>
          <a href="/">Home</a>
          <a href="/platform/">Runtime</a>
          <a href="/proof/">Proof</a>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <SiteChrome>
      <section className="home-hero" aria-labelledby="hero-title">
        <p className="eyebrow">Tigrcorn</p>
        <h1 id="hero-title">ASGI runtime infrastructure for protocol-aware services.</h1>
        <p>
          Tigrcorn gives Python services a governed runtime layer for transport behavior, server integration,
          and protocol delivery without hiding operational boundaries.
        </p>
      </section>
      <section className="article-list" aria-labelledby="articles-title">
        <div className="section-heading">
          <p className="eyebrow">Start here</p>
          <h2 id="articles-title">Runtime surfaces</h2>
        </div>
        <div className="articles">
          {recentNotes.map((item) => (
            <a className="article-link" href={item.href} key={item.href}>
              <span>Tigrcorn</span>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </a>
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}

function DetailPage({ kind }: { kind: "platform" | "proof" }) {
  const isPlatform = kind === "platform";
  return (
    <SiteChrome>
      <article className="article-page">
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Tigrcorn</a>
          <span>/</span>
          <span>{isPlatform ? "Runtime" : "Proof"}</span>
        </nav>
        <header className="article-hero">
          <p className="article-kicker">{isPlatform ? "Runtime" : "Proof"}</p>
          <h1>{isPlatform ? "Protocol delivery with visible boundaries." : "Publication evidence for the runtime site."}</h1>
          <p className="article-excerpt">
            {isPlatform
              ? "Tigrcorn focuses the product surface around ASGI hosting, transport behavior, and protocol-aware service delivery."
              : "The site repository owns the static build, Docker service, DNS plan, proxy plan, and deploy workflow for tigrcorn.com."}
          </p>
        </header>
      </article>
    </SiteChrome>
  );
}

export function App() {
  const path = typeof window === "undefined" ? "/" : window.location.pathname;
  if (path.startsWith("/platform")) return <DetailPage kind="platform" />;
  if (path.startsWith("/proof")) return <DetailPage kind="proof" />;
  return <HomePage />;
}
