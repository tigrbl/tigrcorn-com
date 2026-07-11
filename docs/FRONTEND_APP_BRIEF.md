# Tigrcorn frontend application brief

**Status:** implementation brief  
**Audience:** frontend engineering, UI/UX design, technical marketing, and copywriting  
**Product source:** `tigrbl/tigrcorn`  
**Website source:** `tigrbl/tigrcorn-com`  
**Release baseline:** latest stable PyPI release `0.3.17` (June 18, 2026); the repository also contains prerelease `0.3.18.dev2` work  
**Primary outcome:** replace the current repository-focused lander with a credible product and documentation gateway that helps Python developers and platform engineers understand, evaluate, install, and operate Tigrcorn.

**Current maturity signal:** PyPI classifies the package as Development Status 3 - Alpha. The website must present Tigrcorn as usable and actively published while preserving this maturity signal; it must not imply general availability, an enterprise support SLA, or production readiness without a separately approved and sourced statement.

## 1. Executive brief

Tigrcorn is an ASGI3 Python web server for APIs, edge services, internal platforms, and protocol-heavy applications. Its differentiator is not merely “protocol awareness.” It brings modern transports, operational controls, static delivery, embedding APIs, and release certification into one inspectable, modular project.

The frontend must answer four questions quickly:

1. What is Tigrcorn? An ASGI3 server with first-class HTTP/1.1, HTTP/2, HTTP/3, QUIC, WebSocket, TLS, and static-delivery surfaces.
2. Why should I care? Teams can adopt a safe baseline, opt into explicit advanced-protocol profiles, retain operational visibility, and verify the claimed release boundary.
3. Can I use it now? Yes: install the stable package from PyPI and run an ASGI app from the CLI or Python.
4. Can I trust it? Show concrete protocol scope, safe deployment profiles, public APIs, release status, documentation, source, and certification evidence without inflating claims.

The site should feel like a serious developer tool: technically precise, fast, readable, and easy to verify. The tiger-unicorn identity can supply energy and memorability, but it must not make the runtime feel like a novelty project.

## 2. Source-backed product truth

### Stable product baseline

- Distribution: `tigrcorn` on PyPI.
- Latest stable release reviewed: `0.3.17`, published June 18, 2026.
- Python support: Python 3.10 through 3.14 (`>=3.10,<3.15`).
- License: Apache-2.0.
- Basic install: `python -m pip install tigrcorn`.
- Basic run: `tigrcorn module.path:app --host 127.0.0.1 --port 8000`.
- Python entrypoints include `run`, `serve`, `serve_import_string`, and `EmbeddedServer`.
- Supported runtime modes are `auto`, `asyncio`, and optional `uvloop` on supported platforms.
- Trio is declared as a reserved dependency path but is not a supported runtime. Do not market it as supported.

### Product capability pillars

1. **Modern protocol stack:** HTTP/1.1, HTTP/2, HTTP/3, QUIC, WebSocket, TLS 1.3, and ALPN.
2. **Security controls:** X.509 validation, mTLS profiles, OCSP and CRL handling, explicit certificate and trust-store configuration.
3. **Operational control:** listeners, workers, reload, timeouts, structured logging, metrics, proxy normalization, content-coding policy, CONNECT policy, Early Hints, and Alt-Svc.
4. **Delivery semantics:** static mounts, precompressed sidecars, ETags and conditional requests, byte ranges, and response helpers.
5. **Application embedding:** synchronous, asynchronous, import-string, and explicit lifecycle-controlled server APIs.
6. **Governed releases:** package-owned certification and promotion evaluators, documented conformance boundaries, machine-readable profiles, and preserved release evidence.
7. **Modular architecture:** listener, transport session, logical stream, protocol adapter, and ASGI connection are separate layers; published packages reflect these boundaries.

### Blessed deployment profiles to visualize

| Profile | Best described as | Important posture |
|---|---|---|
| `default` | safe zero-config baseline | HTTP/1.1, TCP, advanced surfaces off |
| `strict-h1-origin` | conservative HTTP/1.1 origin | explicit host checks; no proxy trust by default |
| `strict-h2-origin` | TLS-backed HTTP/2 origin | explicit TLS and ALPN |
| `strict-h3-edge` | HTTP/2 + HTTP/3 edge | TCP + UDP, QUIC, Alt-Svc, Retry, 0-RTT denied by default |
| `strict-mtls-origin` | authenticated HTTP/2 origin | mandatory client certificates and trust store |
| `static-origin` | static asset origin | validators, ranges, and explicit static mount |

### Release interpretation

- `0.3.15` consolidated publication of the Python package family and the browser-side WebTransport probe package.
- `0.3.16` and `0.3.17` published coordinated versions across the aggregate package, 14 component distributions, and `@tigrcorn/wt-peer-probes`.
- `0.3.18.dev2` is prerelease repository work, not the default version to recommend to users.
- The stable CTA, install command, structured data, and release badge must resolve from one version datum. Never derive “latest” from a hard-coded marketing sentence.
- Release notes for `0.3.16` and `0.3.17` are primarily packaging manifests, not user-oriented narratives. The website should not invent feature deltas that the release notes do not state.

## 3. Audiences and jobs to be done

### Primary: Python backend developer

Needs to determine framework compatibility, install quickly, run an ASGI app, see common configuration, and reach complete CLI/API docs.

### Primary: platform or infrastructure engineer

Needs to evaluate protocol and TLS support, safe defaults, deployment profiles, observability, resource controls, proxy behavior, lifecycle, and evidence behind release claims.

### Secondary: technical lead or evaluator

Needs a concise comparison frame, maintenance and release signals, supported-versus-out-of-scope boundaries, license, Python compatibility, and links to source and proof.

### Secondary: contributor or maintainer

Needs package architecture, governance, certification, conformance, release notes, and contribution routes. Keep this path available but subordinate to adoption.

## 4. Cross-functional requirements

The website is a shared product surface. Each team needs a distinct path and artifact, but all teams must draw mutable facts and claims from the same versioned content model.

### Technical marketing

**Job to be done:** establish a defensible category and differentiated story, then convert technical credibility into evaluation.

**Required site support:**

- Outcome-led homepage narrative followed by progressively deeper protocol, operations, architecture, and proof detail.
- Source-linked claims library covering protocols, Python versions, package maturity, license, public APIs, profiles, and release status.
- Use-case paths for API services, edge/protocol-heavy services, internal platforms, static delivery, and embedded runtimes.
- Comparison-ready facts without unsourced superiority language. Any competitor comparison requires a dated methodology, like-for-like versions, and review by product engineering.
- Search and social metadata, article templates, campaign-safe landing anchors, and privacy-respecting conversion analytics.

**Acceptance criteria:** a campaign owner can reuse an approved message and link to its evidence; the homepage has one primary narrative; analytics distinguish install, docs, source, profile, and proof intent.

### Developer relations

**Job to be done:** take a developer from discovery to a successful first run, then expose credible paths into advanced examples and community participation.

**Required site support:**

- Copyable install and hello-server commands verified against the stable release.
- A choose-your-path entry point for CLI users, Python embedding, static delivery, WebSocket, HTTP/2, and HTTP/3/QUIC.
- Example gallery sourced from the repository, with prerequisites, maturity, expected result, copy/run steps, and links to code.
- Interactive-tooling treatment for `advanced_delivery_uix`, `websocket_uix_demo`, `static_uix_demo`, WebTransport mTLS, and protocol labs. Label demos versus labs clearly; never imply a lab is a production template.
- Troubleshooting links for TLS certificates, UDP/QUIC reachability, optional extras, runtime selection, config precedence, and platform limitations.
- Visible docs, GitHub, issue, contribution, release, and community paths.

**Acceptance criteria:** a developer can reach a verified first success in five minutes on the baseline path; advanced examples declare prerequisites; every snippet has a stable-version test owner.

### Sales and account management

**Job to be done:** qualify technical fit, answer recurring evaluator questions, and hand prospects to engineering with accurate context.

**Required site support:**

- An evaluator summary covering supported Python versions, protocols, license, maturity, deployment modes, optional dependencies, and current non-goals.
- Use-case and deployment-profile pages that can be shared directly without requiring a prospect to interpret repository governance language.
- A plain-language trust section for TLS/mTLS controls, observability, release cadence, evidence scope, maintenance signals, and known limitations.
- FAQ answers for framework compatibility, migration/adoption shape, operating requirements, support/community channel, and release policy.
- A contact or qualification CTA only if an owned response process exists. Do not imply paid support, procurement readiness, roadmap commitments, or an SLA unless those offers are real and approved.
- Downloadable or print-friendly evaluator brief may follow the web release, generated from the same content source.

**Acceptance criteria:** an account owner can answer fit/no-fit questions from one canonical page and can distinguish documented capability, alpha maturity, roadmap, and unsupported requests.

### GTM strategy

**Job to be done:** define target segments, connect messages to funnel stages, and learn which product strengths create qualified adoption.

**Required site support:**

- Audience-to-page mapping: developers to quick start/examples; platform engineers to profiles/operations; evaluators to architecture/proof/releases.
- Funnel events for landing, protocol/profile exploration, command copy, docs referral, GitHub referral, example engagement, and contact intent.
- Campaign parameters that persist only as needed for attribution and do not contaminate canonical URLs.
- Content slots for use cases and adoption stories, but no empty customer-logo strip, invented testimonials, or fabricated adoption numbers.
- A release/content freshness mechanism so campaigns never lead with a stale version or prerelease by accident.

**Acceptance criteria:** each launch campaign names a segment, message, evidence, primary conversion, secondary conversion, and success measure; the site can report those measures without collecting unnecessary personal data.

### Copywriting

**Job to be done:** turn deep technical truth into a coherent, accessible narrative without overstating maturity or support.

**Required site support:**

- A page-by-page copy deck with audience, intent, headline, deck, proof points, CTA, caveats, metadata, and source references.
- A terminology sheet for ASGI3, HTTP/3, QUIC, WebSocket, WebTransport, profiles, conformance, certification, release gates, and maturity labels.
- Separate copy modes for adoption, evaluation, operations, and proof. Governance terminology should appear only after a plain-language explanation.
- Empty, loading, copied, error, unavailable, stable, prerelease, optional, experimental/lab, and unsupported microcopy.
- Editorial QA for source accuracy, code validity, UTF-8, link intent, accessibility, and consistent product/package casing.

**Acceptance criteria:** every mutable factual sentence has an owner or source; every CTA states its destination or outcome; no claim exceeds the release boundary or hides the Alpha classifier.

### Shared governance

| Artifact | Directly responsible | Required reviewers |
|---|---|---|
| Versioned product facts and claim registry | Product engineering | Technical marketing, copywriter |
| Positioning and message hierarchy | Technical marketing | GTM strategist, DevRel, product engineering |
| Quick starts, examples, and code snippets | Developer relations | Product engineering, frontend engineer |
| Evaluator FAQ and qualification content | Sales/account management | Product engineering, technical marketing |
| Funnel and measurement plan | GTM strategist | Technical marketing, frontend engineer, privacy owner |
| Page copy and microcopy | Copywriter | Page owner, DevRel for code, product engineering for claims |
| Interaction and visual system | UI/UX designer | Frontend engineer, accessibility reviewer |
| Implemented app and generated metadata | Frontend engineer | UI/UX designer, content owners |

No team may create a second source of truth for the current stable version, Python support, protocol status, maturity, or release date. Content changes that affect a product claim require product-engineering review before publication.

## 5. Information architecture

### Required global navigation

- Product
- Protocols
- Operations
- Docs (external canonical documentation)
- Releases
- GitHub
- Primary CTA: **Install Tigrcorn** or **Get started**

### Required pages

#### Home `/`

- Clear category, outcome-led headline, short qualifier, stable version, Python support, install command, and two CTAs.
- Protocol strip: HTTP/1.1, HTTP/2, HTTP/3, QUIC, WebSocket, TLS.
- “Why Tigrcorn” pillars: modern transports, explicit operations, embeddable API, inspectable proof.
- Quick-start code path with copy controls.
- Deployment-profile selector or comparison.
- Architecture explanation from listener to ASGI connection.
- Trust section: stable release, Apache-2.0, source, docs, certification boundary.
- Final install/docs CTA.

#### Product `/platform/`

- Explain runtime, protocols, security, delivery, operations, embedding, config precedence, and modular packages.
- Show what is available from the aggregate package versus advanced optional extras.
- Do not describe the website repository, DNS, Docker deployment, or MdWrk lander as product capabilities.

#### Protocols `/protocols/`

- Scannable support matrix with status, use case, configuration example, and deep link to canonical docs.
- Explicitly separate stable supported, optional, experimental/prerelease, and out-of-boundary surfaces.
- Include HTTP/1.1, HTTP/2, HTTP/3, QUIC, WebSocket, TLS/mTLS, static delivery, and relevant delivery semantics.

#### Operations `/operations/`

- Deployment-profile comparison.
- Config precedence: CLI > environment > config file > defaults.
- Logging, metrics, reload/workers, proxy controls, timeouts/resources, and static delivery.
- Provide short recipes, then defer to canonical operator docs.

#### Proof `/proof/`

- Replace the current website build/DNS proof with product proof.
- Show release status, supported boundary, profile artifacts, certification/evaluation surfaces, and links to preserved evidence.
- Explain proof in plain language before exposing SSOT or conformance terminology.
- Every strong claim needs a direct source link and an “as of version/date” label.

#### Releases `/releases/`

- Stable release first, prereleases visually separated and opt-in.
- Version, date, stability, package/PyPI link, GitHub tag/release link, and source-backed summary.
- Do not fabricate changelogs from commit history. If notes are manifest-only, say “coordinated package publication.”

#### Articles `/articles/.../`

- Retain only articles that help adoption, evaluation, or operation.
- Publication mechanics for `tigrcorn.com` are internal engineering documentation, not a lead marketing article.

## 6. UI/UX requirements

### Visual direction

- Keep the dark, warm orange brand foundation and existing Tigrcorn mark, but improve contrast discipline and reduce decorative orange haze behind long-form text.
- Pair the characterful identity with structured technical surfaces: terminal, protocol matrix, profile cards, architecture diagram, and evidence status.
- Prefer a restrained engineering aesthetic over generic cyberpunk visuals, stock clouds, or invented performance graphs.
- Establish reusable tokens for color, typography, spacing, elevation, radius, status, and code syntax. The current CSS is a single page-specific stylesheet and is not a sufficient design system.

### Interaction model

- Sticky or reliably reachable global navigation with visible current state.
- Copyable install and launch commands with confirmation announced to assistive technology.
- Tabs only where content remains accessible without JavaScript; use anchors for deep links.
- Profile comparison must work on narrow screens without horizontal-page overflow.
- External links must be recognizable and preserve user expectations.
- Respect reduced-motion preferences; no motion may be required to understand protocol flow.

### Responsive and accessible behavior

- Design at 360, 768, 1024, and 1440+ pixel reference widths.
- Meet WCAG 2.2 AA for contrast, focus visibility, keyboard navigation, landmarks, labels, and target size.
- Use semantic tables for genuine matrices and semantic headings for content hierarchy.
- Never encode stable/prerelease/supported/unsupported status by color alone.
- Decorative logo use should have empty alternative text; the linked home brand must have an accessible name.
- Code samples require wrapping or deliberate horizontal scroll within their own container.

## 7. Frontend engineering requirements

### Architecture and content

- Retain React, TypeScript, Vite, static generation, and the typed content-pack pattern unless a documented constraint requires replacement.
- Move product facts into structured typed data: version, release date, Python range, protocol status, profiles, links, install commands, and source references.
- Components should render that shared truth; page copy must not independently repeat mutable values.
- Split the monolithic `App.tsx` and `styles.css` into route/page, content model, component, and token/style boundaries.
- Implement real route-aware metadata: unique title, description, canonical URL, Open Graph/Twitter data, and JSON-LD per page.
- Generate sitemap, robots, `llms.txt`, and structured data from the same content model.
- Preserve static, trailing-slash routes and direct-load behavior behind Nginx.

### Required components

- Global header and footer
- Hero with install command and release metadata
- Copyable code block
- Protocol support matrix
- Capability/feature cards
- Deployment-profile comparison
- Architecture flow
- Evidence/status card
- Release list and stable/prerelease badge
- Article layout, breadcrumb, and table of contents
- Accessible callout for caveats and unsupported surfaces
- Not-found page with recovery links

### Quality and performance gates

- `npm run check` and `npm run build` must pass.
- Add tests for route resolution, navigation targets, content schema, current stable version, protocol statuses, and generated metadata.
- Add automated accessibility checks for representative pages and manual keyboard/screen-reader review to the release checklist.
- Target Lighthouse on production-like output: performance >= 90 and accessibility, best practices, and SEO >= 95 on mobile.
- Reserve image dimensions, keep the logo optimized, self-host or avoid nonessential font dependencies, and minimize client JavaScript.
- No hydration or console errors, broken internal links, mixed content, or layout overflow at the reference widths.
- CI should fail on stale or contradictory release metadata rather than silently publishing it.

## 8. Technical marketing requirements

### Positioning

Recommended positioning statement:

> For Python teams building APIs, edge services, and protocol-heavy applications, Tigrcorn is an ASGI3 server that brings modern transports and explicit operational controls into one inspectable runtime. Unlike a thin server wrapper, Tigrcorn pairs HTTP/1.1 through HTTP/3, QUIC, WebSocket, TLS, static delivery, embedding APIs, and governed release evidence.

Lead with the user outcome: modern protocol delivery without surrendering operational control. “Governed” and “certified” require explanation and evidence; they should support the story rather than become unexplained hero jargon.

### Message hierarchy

1. Run Python ASGI applications across modern protocols.
2. Start safely; opt into explicit production profiles.
3. Operate with visible configuration, security, metrics, and lifecycle controls.
4. Inspect the package boundaries and release evidence behind the claims.

### Conversion design

- Primary conversion: copy install command / open quick start.
- Secondary conversion: inspect docs or GitHub.
- Evaluator conversion: inspect protocol matrix, profiles, and proof.
- Measure CTA clicks, install-command copies, docs/GitHub referrals, protocol/profile engagement, and release-page visits without invasive tracking.

### Claims policy

- Permitted with versioned sources: named protocols, public APIs, profiles, Python support, license, release/version, and documented operational surfaces.
- Conditional: “RFC compliant,” “certified,” or “production-ready” must name the exact boundary/profile and link evidence.
- Prohibited without current comparative evidence: “fastest,” “most secure,” “drop-in replacement,” “zero configuration” as a universal claim, or support for Trio, WSGI, ASGI2, or RSGI.
- Never imply HTTP/3/QUIC needs no TLS or UDP configuration.

## 9. Copywriting requirements

### Voice

- Precise, calm, direct, and technically literate.
- Use plain language first, then the exact term. Example: “predefined safe configurations (blessed deployment profiles).”
- Prefer verbs and user outcomes to abstract nouns.
- Avoid mascot puns, breathless superlatives, “next-generation,” and unsupported enterprise language.
- Capitalize the product as **Tigrcorn**. Use package/command casing exactly as published: `tigrcorn`, `EmbeddedServer`, HTTP/3, WebSocket, WebTransport, and ASGI3.

### Recommended hero copy

**Eyebrow:** ASGI3 server for Python  
**Headline:** Modern protocols. Explicit operational control.  
**Deck:** Run Python services over HTTP/1.1, HTTP/2, HTTP/3, QUIC, and WebSocket—with TLS, static delivery, observability, and inspectable release evidence built into the project.  
**Primary CTA:** Get started  
**Secondary CTA:** View on GitHub  
**Install:** `python -m pip install tigrcorn`

### Copy QA checklist

- Is every mutable fact sourced and versioned?
- Does each page lead with what the visitor can do, not how the website is deployed?
- Are supported, optional, prerelease, and unsupported states unmistakable?
- Is every acronym expanded or clear from context on first use?
- Do links say where they go instead of “learn more”?
- Are code examples syntactically valid and copied from current canonical docs?
- Are apostrophes and punctuation valid UTF-8? The current content contains mojibake (`Tigrcornâ€™s`) that must be removed.

## 10. Current-site gaps to resolve

- The current homepage calls the product a “governed ASGI runtime surface” but does not plainly identify it as an installable ASGI3 server.
- Product pages discuss the lander, content pack, Docker, DNS, and proxy publication instead of the runtime users evaluate.
- The hero names SSE, while the actual product’s strongest and most consistently sourced surfaces are HTTP/1.1–3, QUIC, WebSocket, TLS, static delivery, operations, and embedding. Treat SSE only according to canonical current product docs.
- The “Proof” page proves the marketing site builds; it does not prove product capability.
- The nav CTA exists in content but is not rendered as a distinct primary action.
- Metadata in `index.html` is global and can drift from page content.
- There is no visible stable release, release date, Python compatibility, license, protocol matrix, quick start, or deployment-profile guide.
- Article text contains mojibake apostrophes.
- The current code uses broad `any` types for content sections and lacks a discriminated section model.
- The site has no explicit automated accessibility, link, SEO, or content-freshness gates.

## 11. Delivery instructions and definition of done

### UI/UX designer handoff

Deliver a responsive sitemap and page-flow map, low-fidelity content hierarchy, and high-fidelity designs for Home, Platform, Protocols, Operations, Proof, Releases, one Article, and 404. Include mobile and desktop variants plus hover, focus, active, copied, empty, error, stable, prerelease, optional, lab, and unsupported states. Provide component specifications, tokens, content constraints, accessibility annotations, and narrow-screen behavior for matrices and code. Prototype the homepage quick start, profile comparison, protocol filtering, and evidence drill-down. Do not invent benchmark charts, customer proof, or unapproved product states.

### Frontend engineer handoff

Begin with the typed product-facts and claims schema, then build shared components and routes from it. Preserve static generation and direct-load behavior. Implement the approved designs, route metadata, structured discovery outputs, accessible copy controls, deep links, stable/prerelease filtering, and event instrumentation. Add schema, route, metadata, link, accessibility, and content-freshness tests. Treat canonical docs as the deep technical destination; do not duplicate whole manuals in marketing pages. Block publication when required release facts or claim sources are missing.

### Copywriter handoff

Produce the terminology sheet and claim ledger first, then the page copy deck in navigation order. Write baseline quick-start copy before advanced protocol copy. Pair every strong claim with a visible qualifier and source; distinguish supported, optional, lab/prerelease, out-of-boundary, and Alpha maturity. Supply page titles, meta descriptions, social descriptions, headings, body, CTAs, labels, status text, alt-text guidance, errors, and copied confirmations. Validate all commands with DevRel/product engineering and remove the current mojibake before handoff.

### Recommended delivery sequence

1. Product engineering freezes the stable-release facts, claim boundaries, and source links.
2. Technical marketing and GTM approve audience, positioning, journeys, conversions, and measurement.
3. DevRel verifies the baseline quick start and classifies every demo, lab, and interactive tool.
4. Copywriting delivers terminology, claim ledger, and page copy skeleton.
5. UI/UX converts the approved content hierarchy into responsive flows and the component system.
6. Frontend engineering implements the schema and vertical homepage slice, then remaining routes.
7. All owners review claims, code, accessibility, responsive behavior, analytics, and release freshness before launch.

### Launch scope

**P0 launch:** Home, Platform, Protocols, Operations, Proof, Releases, quick start, profile comparison, source-linked claims, route metadata, accessibility, responsive behavior, and measurement.

**P1 follow-up:** curated example gallery, interactive-demo deep links, article migration, evaluator print view, and richer architecture/protocol explanation.

**P2 only with evidence and operating ownership:** competitor comparisons, benchmarks, customer stories, contact-led sales conversion, downloadable sales collateral, or live hosted sandboxes.

### Definition of done

The frontend is ready when a new visitor can, from the homepage, correctly describe Tigrcorn, identify the stable version and supported Python range, copy a working install/run command, distinguish baseline from advanced protocol profiles, reach canonical docs/source/proof, and understand at least one reason to choose the project—all without encountering an unsupported claim.

Delivery must include:

- approved responsive designs and component states;
- implemented required pages and shared components;
- source-linked, versioned product content;
- stable/prerelease separation;
- route-specific discovery metadata;
- passing type, content, build, link, accessibility, and performance gates;
- a final cross-functional claim review against the stable product release.

## 12. References reviewed

### Product repository

- `README.md`
- `pyproject.toml`
- `docs/architecture/overview.md`
- `docs/ops/cli.md`, `docs/ops/profiles.md`, and `docs/ops/observability.md`
- `docs/LIFECYCLE_AND_EMBEDDED_SERVER.md`
- `docs/review/conformance/CERTIFICATION_BOUNDARY.md`
- `docs/review/conformance/BOUNDARY_NON_GOALS.md`
- `docs/review/performance/PERFORMANCE_SLOS.md`
- release notes for `0.3.15`, `0.3.16`, `0.3.17`, and `0.3.18.dev2`
- published package and component-package manifests

### Website repository

- `src/App.tsx`
- `src/styles.css`
- `packages/site-content-pack/src/index.ts`
- `index.html`
- static generation, manifest, CI, Docker, DNS, proxy, and deployment configuration

### Published sources

- PyPI project and release history: <https://pypi.org/project/tigrcorn/>
- GitHub product repository: <https://github.com/tigrbl/tigrcorn>
- Canonical documentation: <https://docs.tigrcorn.com>
