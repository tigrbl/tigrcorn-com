export const siteContent = {
  product: {
    name: "Tigrcorn",
    slug: "tigrcorn-com",
    tagline: "ASGI runtime infrastructure for protocol-aware Python services.",
    description: "Tigrcorn is a governed ASGI runtime surface for HTTP, WebSocket, SSE, and modern protocol delivery.",
    category: "Product website",
    canonicalUrl: "https://tigrcorn.com"
  },
  theme: { id: "default", label: "Default", mode: "light", tokens: { accent: "#F97316" } },
  nav: {
    primary: [
      { label: "Platform", href: "/platform/" },
      { label: "Proof", href: "/proof/" },
      { label: "Docs", href: "https://docs.tigrcorn.com" }
    ],
    cta: { label: "Get started", href: "/platform/" }
  },
  footer: {
    note: "Tigrcorn is maintained by tigrbl.",
    links: [
      { label: "GitHub", href: "https://github.com/tigrbl/tigrcorn-com" },
      { label: "Docs", href: "https://docs.tigrcorn.com" }
    ]
  },
  ai: {
    llmsTxtTitle: "Tigrcorn",
    coreFacts: [
      "Tigrcorn is a governed ASGI runtime surface for HTTP, WebSocket, SSE, and modern protocol delivery.",
      "The canonical website is https://tigrcorn.com.",
      "The site is deployed as a self-hosted Docker static site."
    ]
  },
  pages: [
    {
      slug: "/",
      kind: "home",
      title: "Tigrcorn | ASGI runtime infrastructure for protocol-aware Python services.",
      description: "Tigrcorn is a governed ASGI runtime surface for HTTP, WebSocket, SSE, and modern protocol delivery.",
      h1: "Tigrcorn",
      intro: "Tigrcorn is a governed ASGI runtime surface for HTTP, WebSocket, SSE, and modern protocol delivery. The site packages product positioning, structured metadata, and deployment evidence in a standalone MdWrk lander repository.",
      sections: [
        { id: "hero", kind: "hero", eyebrow: "Tigrcorn", title: "ASGI runtime infrastructure for protocol-aware Python services.", subtitle: "Tigrcorn is a governed ASGI runtime surface for HTTP, WebSocket, SSE, and modern protocol delivery." },
        { id: "platform", kind: "feature_grid", title: "What this site owns", items: [
          { title: "Product narrative", description: "Canonical product messaging, audience positioning, and calls to action for tigrcorn.com." },
          { title: "Structured discovery", description: "Search, assistant, social, and linked-data metadata generated from the content pack." },
          { title: "Independent deploys", description: "CI, Docker deployment, and Namecheap DNS live in this repository." }
        ] },
        { id: "proof", kind: "proof_matrix", title: "Operational proof", items: [
          { claim: "The site is independently buildable.", status: "planned", evidence: "npm run build produces the local static artifact and Docker image build input." },
          { claim: "DNS ownership is explicit.", status: "planned", evidence: "site.manifest.json records the Namecheap zone and records owned by this repository." }
        ] },
        { id: "cta", kind: "cta", title: "Build from source", body: "Use npm ci, npm run check, npm run build, npm run dns:plan, and npm run proxy:plan before publishing." }
      ],
      schema: [
        { kind: "Organization", data: { name: "Tigrcorn", url: "https://tigrcorn.com" } },
        { kind: "WebSite", data: { name: "Tigrcorn", url: "https://tigrcorn.com" } }
      ]
    },
    {
      slug: "/platform/",
      kind: "feature",
      title: "Tigrcorn platform",
      description: "Platform overview for Tigrcorn.",
      h1: "Platform",
      intro: "This page captures the platform surface that the Tigrcorn website introduces to operators, builders, and technical evaluators.",
      sections: [
        { id: "details", kind: "feature_detail", title: "Repository-owned site system", body: "The lander is intentionally thin: the application host renders a typed content pack, while metadata, sitemap, robots, and Docker deployment remain repo-local.", items: [
          { title: "MdWrk lander", description: "Reusable page sections and structured-data support." },
          { title: "Content pack", description: "Product-specific content, navigation, metadata, and discovery outputs." }
        ] },
        { id: "faq", kind: "faq", title: "Platform FAQ", items: [
          { question: "Where is this site deployed?", answer: "It is built as a static site and served by a self-hosted Docker service." },
          { question: "Who owns DNS?", answer: "This repository owns its declared Namecheap records through the DNS workflow." }
        ] }
      ]
    },
    {
      slug: "/proof/",
      kind: "package",
      title: "Tigrcorn proof",
      description: "Build, DNS, and deployment proof for Tigrcorn.",
      h1: "Proof",
      intro: "The proof page gives operators a quick inventory of the commands and artifacts required before publication.",
      sections: [
        { id: "commands", kind: "package_grid", title: "Verification commands", packages: [
          { name: "Install", description: "Install deterministic dependencies.", install: "npm ci", api: ["npm ci"] },
          { name: "Check", description: "Run type and content-pack checks.", install: "npm run check", api: ["npm run check"] },
          { name: "Build", description: "Build the content pack and static site.", install: "npm run build", api: ["npm run build"] },
          { name: "DNS plan", description: "Render the Namecheap record plan.", install: "npm run dns:plan", api: ["npmctl plan desired-state/dns.yaml"] }
        ] }
      ]
    },
    {
      slug: "/articles/protocol-aware-runtime-keeps-transports-visible/",
      kind: "feature",
      title: "Protocol-aware runtime keeps transports visible | Tigrcorn",
      description: "Why Tigrcorn centers its product story on visible transport behavior instead of hidden runtime assumptions.",
      h1: "Protocol-aware runtime keeps transports visible.",
      intro: "Tigrcorn’s public story is strongest when it treats runtime behavior as something that should stay visible to operators and reviewers. HTTP, WebSocket, SSE, and adjacent protocol surfaces are not background implementation details here; they are part of the contract that the runtime is expected to expose clearly.",
      sections: [
        { id: "runtime", kind: "feature_detail", title: "Runtime claims become stronger when transport behavior is explicit", body: "A protocol-aware runtime is valuable because it keeps boundary behavior legible. The repo already frames Tigrcorn around ASGI hosting, server integration, and protocol delivery, which means the product is not just promising throughput or convenience. It is promising visibility into how transport concerns are handled.", items: [
          { title: "Transport-aware positioning", description: "The site explicitly names HTTP, WebSocket, SSE, and protocol delivery in the product narrative." },
          { title: "Operator-readable publication", description: "The repo couples runtime messaging with build, Docker, DNS, and proxy proof." },
          { title: "Thin host, explicit content", description: "The site host stays narrow while the content pack carries the product and proof model." }
        ] },
        { id: "proof", kind: "proof_matrix", title: "Repo signals that support the runtime story", items: [
          { claim: "Runtime messaging is paired with operator proof.", status: "observed", evidence: "The same repo carries the product pages, desired-state files, and deploy workflows." },
          { claim: "The publication lane is repeatable.", status: "observed", evidence: "Named scripts exist for check, build, DNS planning, proxy planning, and deploy." },
          { claim: "The site remains independently buildable.", status: "observed", evidence: "Content-pack build and app build are local repo steps rather than external platform magic." }
        ] },
        { id: "faq", kind: "faq", title: "Questions this answers", items: [
          { question: "Why call out protocols so directly?", answer: "Because protocol behavior is part of the runtime contract, not an afterthought hidden behind a server process." },
          { question: "What is the operator takeaway?", answer: "That transport behavior, build state, and publication state should all stay inspectable." },
          { question: "What does this say about Tigrcorn’s scope?", answer: "It positions Tigrcorn as runtime infrastructure for teams who care about visible boundaries in service delivery." }
        ] }
      ]
    },
    {
      slug: "/articles/repo-owned-runtime-publication-for-tigrcorn-com/",
      kind: "feature",
      title: "Repo-owned runtime publication for tigrcorn.com | Tigrcorn",
      description: "How the tigrcorn.com repository keeps its public runtime site, DNS state, proxy state, and deployment workflow connected.",
      h1: "The runtime site owns its own publication proof.",
      intro: "The tigrcorn.com repository does not stop at copy and branding. It carries the build steps, Docker target, DNS desired state, proxy desired state, and deploy workflows that publish the runtime site. That keeps the runtime narrative tied to an inspectable delivery lane.",
      sections: [
        { id: "ownership", kind: "feature_detail", title: "The site repo is part of the runtime story", body: "A runtime project loses clarity when its public site is published through undocumented operator steps. Here the publication model stays close to the repo: named workflows, a named Docker service, and repo-owned desired-state files mean the public runtime surface can be reviewed as code.", items: [
          { title: "Named Docker service", description: "The repo deploys the `tigrcorn-com` container explicitly." },
          { title: "DNS and proxy plans in git", description: "Operators can review intended infrastructure changes before apply." },
          { title: "Dedicated workflow lanes", description: "CI, DNS, and deploy workflows show how the site moves from source to publication." }
        ] },
        { id: "commands", kind: "package_grid", title: "What operators verify", packages: [
          { name: "Check", description: "Runs the content-pack and app validation path.", install: "npm run check", api: ["npm run check"] },
          { name: "Build", description: "Builds the static site and publication input surface.", install: "npm run build", api: ["npm run build"] },
          { name: "DNS plan", description: "Shows DNS mutations before apply.", install: "npm run dns:plan", api: ["npmctl plan desired-state/dns.yaml"] },
          { name: "Proxy plan", description: "Shows proxy changes before apply.", install: "npm run proxy:plan", api: ["npmctl plan desired-state/proxy.yaml"] }
        ] },
        { id: "cta", kind: "cta", title: "Treat publication as part of the runtime boundary", body: "Tigrcorn’s site is more credible when the publication lane is visible. The repo already exposes that lane directly; the article makes that operating model explicit." }
      ]
    }
  ]
};

export default siteContent;
