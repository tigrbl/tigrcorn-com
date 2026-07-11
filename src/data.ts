import { 
  StableRelease, 
  ProtocolDefinition, 
  DeploymentProfile, 
  ComponentPackage, 
  ReleaseManifest, 
  Article, 
  ArchitectureLayer 
} from './types';

export const stableRelease: StableRelease = {
  version: '0.3.17',
  releaseDate: '2026-06-18',
  pythonVersionRange: '>=3.10,<3.15',
  license: 'Apache-2.0',
  pypiUrl: 'https://pypi.org/project/tigrcorn/',
  githubUrl: 'https://github.com/tigrbl/tigrcorn',
  docsUrl: 'https://docs.tigrcorn.com',
  discordUrl: 'https://discord.gg/jzvrbEtTtt',
  installCommand: 'python -m pip install tigrcorn',
  uvInstallCommand: 'uv add tigrcorn',
  basicRunCommand: 'tigrcorn module.path:app --host 127.0.0.1 --port 8000'
};

export const protocols: ProtocolDefinition[] = [
  {
    id: 'http1',
    name: 'HTTP/1.1',
    status: 'stable',
    useCase: 'Default backward-compatible APIs & legacy reverse-proxies.',
    posture: 'Strict HTTP parsing, Keep-Alive, chunked transfer encoding, and pipelining protection.',
    configExample: 'tigrcorn app:wsgi_app --profile strict-h1-origin',
    description: 'The foundation of the web. Tigrcorn provides a fast, sandboxed, and robust HTTP/1.1 implementation that shields applications from common request-smuggling vectors and malformed HTTP heads.',
    rfcOrSpec: 'RFC 9112'
  },
  {
    id: 'http2',
    name: 'HTTP/2',
    status: 'stable',
    useCase: 'High-throughput APIs & multiplexed microservices with secure transport.',
    posture: 'Encrypted only (h2), TLS 1.3 mandated, ALPN selection, and HPACK header compression.',
    configExample: 'tigrcorn app:app --certfile cert.pem --keyfile key.pem',
    description: 'Brings multiplexing and head-of-line blocking mitigation to standard TCP sockets. Requires TLS 1.3. Integrates native HPACK codecs directly into the transport adapter to process parallel requests efficiently.',
    rfcOrSpec: 'RFC 9113'
  },
  {
    id: 'http3',
    name: 'HTTP/3',
    status: 'stable',
    useCase: 'Modern mobile clients, high-latency edge networks, and webapps requiring instant reconnects.',
    posture: 'UDP based, QUIC multiplexing, QPACK, 0-RTT options, and Alt-Svc header injection.',
    configExample: 'tigrcorn app:app --profile strict-h3-edge --certfile cert.pem --keyfile key.pem',
    description: 'Runs multiplexed transport streams over QUIC and UDP. Tigrcorn has a specialized high-performance UDP listener structure that distributes datagrams natively to worker threads without routing bottlenecks.',
    rfcOrSpec: 'RFC 9114'
  },
  {
    id: 'quic',
    name: 'QUIC',
    status: 'stable',
    useCase: 'Low-latency custom binary streaming, custom IoT telemetry, and secure peer-to-peer transports.',
    posture: 'Native connection migration, TLS-integrated handshake, and stream-level flow control.',
    configExample: 'tigrcorn app:app --quic-only --bind-udp 0.0.0.0:443',
    description: 'The base transport protocol of HTTP/3. Tigrcorn exposes a direct QUIC stream API allowing ASGI applications to listen directly to raw streams, handle connection migration, and bypass the overhead of HTTP headers.',
    rfcOrSpec: 'RFC 9000'
  },
  {
    id: 'websocket',
    name: 'WebSocket',
    status: 'stable',
    useCase: 'Real-time collaborative applications, live charts, push notifications, and chat APIs.',
    posture: 'Auto upgrade from HTTP/1.1 and HTTP/2, client masking validation, and ping-pong keepalives.',
    configExample: 'tigrcorn app:app --ws-ping-interval 15 --ws-ping-timeout 10',
    description: 'Full-duplex real-time communication. Seamlessly upgrades connections from both HTTP/1.1 and HTTP/2. Fully compliant with RFC 6455 and ASGI WebSockets.',
    rfcOrSpec: 'RFC 6455'
  },
  {
    id: 'tls',
    name: 'TLS / mTLS',
    status: 'stable',
    useCase: 'Zero-trust enterprise networking, server verification, and secure API gateways.',
    posture: 'Mandatory TLS 1.3, X.509 chain validation, mTLS client trust stores, OCSP stapling, and CRL checking.',
    configExample: 'tigrcorn app:app --client-ca-file ca.pem --verify-client mandatory',
    description: 'Enterprise grade cryptographic posture. Tigrcorn does not rely on arbitrary defaults; trust anchors, accepted cipher suites, and validation depths are configured strictly via declarative profiles.',
    rfcOrSpec: 'RFC 8446'
  },
  {
    id: 'static',
    name: 'Static Delivery',
    status: 'stable',
    useCase: 'High-performance serving of single-page apps (SPAs), media assets, and CSS/JS sidecars.',
    posture: 'Zero-copy sendfile, ETags, Cache-Control headers, byte-ranges, and precompressed asset mapping.',
    configExample: 'tigrcorn app:app --static-mount /assets:./dist --precompressed gzip,br',
    description: 'Built-in high-performance static server. Bypass the Python interpreter for static asset delivery. Reads precompressed `.gz` and `.br` files directly, matching the client Accept-Encoding headers automatically.',
    rfcOrSpec: 'RFC 9110'
  },
  {
    id: 'webtransport',
    name: 'WebTransport Probe',
    status: 'experimental',
    useCase: 'Ultra-low latency web-client stream interactions (WebTransport over HTTP/3).',
    posture: 'Requires components from @tigrcorn/wt-peer-probes in browser, subject to API revision.',
    configExample: 'tigrcorn app:app --enable-experimental-webtransport',
    description: 'Bidirectional low-latency data transport between client and server. Supported experimentally via external browser probing tools.',
    rfcOrSpec: 'W3C Draft'
  }
];

export const deploymentProfiles: DeploymentProfile[] = [
  {
    id: 'default',
    name: 'default',
    label: 'Safe Zero-Config Baseline',
    purpose: 'Local development, initial prototyping, and internal non-exposed microservices.',
    posture: 'Out-of-the-box standard HTTP/1.1 with low operational surface. Advanced features and multi-protocols are disabled to keep startup footprint minimal.',
    cliExample: 'tigrcorn main:app',
    configSnippet: `# default.ini configuration
[server]
protocols = http/1.1
workers = 1
timeouts_handshake = 5.0
proxy_headers_trust = false`,
    details: [
      'Binds exclusively to IPv4 loopback (`127.0.0.1:8000`) unless overridden.',
      'Supports standard HTTP/1.1 and WebSockets over plain TCP.',
      'Workers automatically scale to 1 to simplify debugging and local breakpoints.',
      'Zero external SSL requirements; ideal for running behind local developer reverse-proxies.'
    ]
  },
  {
    id: 'strict-h1-origin',
    name: 'strict-h1-origin',
    label: 'Conservative HTTP/1.1 Origin',
    purpose: 'Traditional production microservices behind tightly managed load balancers (AWS ALB, Nginx).',
    posture: 'Strict host-header verification, explicit proxy trust boundary mapping, and low timeout limits.',
    cliExample: 'tigrcorn main:app --profile strict-h1-origin --allowed-hosts api.example.com --trusted-proxies 10.0.0.0/8',
    configSnippet: `# strict-h1-origin.ini configuration
[server]
protocols = http/1.1
enforce_host_matching = true
trusted_proxies = 10.0.0.0/8
keepalive_timeout = 65.0`,
    details: [
      'Rejects requests with unexpected `Host` headers to mitigate DNS rebinding.',
      'Explicitly ignores `X-Forwarded-*` headers unless they originate from defined IP ranges.',
      'Optimized keep-alive recycle windows to keep reverse-proxy connections fresh without leaking sockets.'
    ]
  },
  {
    id: 'strict-h2-origin',
    name: 'strict-h2-origin',
    label: 'TLS-backed HTTP/2 Origin',
    purpose: 'Secure, modern service-to-service communication and gRPC/multiplexed private networks.',
    posture: 'Enforced TLS 1.3, ALPN negotiation (h2, http/1.1), HPACK limits, and concurrent stream thresholds.',
    cliExample: 'tigrcorn main:app --profile strict-h2-origin --certfile cert.pem --keyfile key.pem',
    configSnippet: `# strict-h2-origin.ini configuration
[server]
protocols = http/1.1, h2
tls_min_version = 1.3
h2_max_concurrent_streams = 100
hpack_table_size = 4096`,
    details: [
      'Requires a valid X.509 private key and certificate pair to initialize.',
      'ALPN manages seamless runtime fallback from HTTP/2 to HTTP/1.1.',
      'Protects server memory limits by strictly capping maximum concurrent streams per TCP socket.'
    ]
  },
  {
    id: 'strict-h3-edge',
    name: 'strict-h3-edge',
    label: 'HTTP/2 + HTTP/3 Dual Edge',
    purpose: 'Direct-to-client edge gateways, high-speed mobile APIs, and globally distributed networks.',
    posture: 'TCP + UDP dual listeners, QUIC connection controls, automatic Alt-Svc header insertion, 0-RTT rejected by default to prevent replay attacks.',
    cliExample: 'tigrcorn main:app --profile strict-h3-edge --certfile cert.pem --keyfile key.pem --bind 0.0.0.0:443',
    configSnippet: `# strict-h3-edge.ini configuration
[server]
protocols = http/1.1, h2, h3
bind_tcp = 0.0.0.0:443
bind_udp = 0.0.0.0:443
quic_allow_0rtt = false
alt_svc_max_age = 86400`,
    details: [
      'Opens both a TCP socket (for HTTP/1 & HTTP/2) and a UDP socket (for QUIC & HTTP/3) on the same port.',
      'Injects the `Alt-Svc` header into TCP responses to instruct capable browsers to transition to HTTP/3.',
      'Protects endpoints by keeping QUIC zero-round-trip-time (0-RTT) off, neutralizing replay attacks.'
    ]
  },
  {
    id: 'strict-mtls-origin',
    name: 'strict-mtls-origin',
    label: 'Authenticated HTTP/2 Origin (mTLS)',
    purpose: 'Zero-trust architecture, secure internal mesh communication, and enterprise B2B tunnels.',
    posture: 'Mandatory client certificates, strict trusted-CA directory checks, and handshake certificate pinning.',
    cliExample: 'tigrcorn main:app --profile strict-mtls-origin --certfile cert.pem --keyfile key.pem --client-ca-file mesh-trust.pem --verify-client mandatory',
    configSnippet: `# strict-mtls-origin.ini configuration
[server]
protocols = h2
tls_min_version = 1.3
client_auth = mandatory
trusted_client_cas = /etc/tigrcorn/mesh-trust.pem
crl_path = /etc/tigrcorn/crl/`,
    details: [
      'Handshake fails instantly if the client fails to provide an X.509 certificate.',
      'Validates client certificates against a private trust store, bypassing public CAs.',
      'Optionally mounts certificate revocation lists (CRL) to block compromised credentials instantly.'
    ]
  },
  {
    id: 'static-origin',
    name: 'static-origin',
    label: 'Static Asset Origin',
    purpose: 'Extremely high performance delivery of build artifacts, frontends, and media files.',
    posture: 'ASGI bypassed, native worker zero-copy mounts, precompressed mapping (brotli, gzip).',
    cliExample: 'tigrcorn main:app --profile static-origin --static-mount /:./dist --precompressed brotli,gzip',
    configSnippet: `# static-origin.ini configuration
[server]
protocols = http/1.1, h2
static_mounts = /:./dist
precompressed = br, gzip
enable_byte_ranges = true
cache_control_default = max-age=31536000, immutable`,
    details: [
      'Reroutes traffic matching `/` directly in the listener layer, preserving Python cycles.',
      'Supports HTTP range requests (`Range: bytes=0-1023`) for seeking media content smoothly.',
      'Returns Brotli (`.br`) or Gzip (`.gz`) versions of static files if client indicates support.'
    ]
  }
];

export const components: ComponentPackage[] = [
  { name: 'tigrcorn', role: 'Main aggregate package & orchestration CLI', scope: 'PyPI Core' },
  { name: 'tigrcorn-listener', role: 'Multi-threaded native socket binding & UDP receiver', scope: 'Internal Core' },
  { name: 'tigrcorn-h1', role: 'Fast HTTP/1.1 request parser and flow controller', scope: 'Protocol Component' },
  { name: 'tigrcorn-h2', role: 'HPACK encoder & HTTP/2 stream multiplexer', scope: 'Protocol Component' },
  { name: 'tigrcorn-h3', role: 'QPACK encoder & HTTP/3 stream driver', scope: 'Protocol Component' },
  { name: 'tigrcorn-quic', role: 'QUIC cryptographic handshake and framing engine', scope: 'Protocol Component' },
  { name: 'tigrcorn-tls', role: 'X.509 validation and OpenSSL transport binding', scope: 'Security Component' },
  { name: 'tigrcorn-static', role: 'Zero-copy static file server and range-request adapter', scope: 'Utility Component' },
  { name: '@tigrcorn/wt-peer-probes', role: 'Browser WebTransport capability probing utilities', scope: 'NPM Package' }
];

export const releases: ReleaseManifest[] = [
  {
    version: '0.3.17',
    date: '2026-06-18',
    stability: 'stable',
    summary: 'Coordinated stable package publication. Resolves minor HTTP/2 stream close states and standardizes component manifests.',
    pypiLink: 'https://pypi.org/project/tigrcorn/0.3.17/',
    githubTagLink: 'https://github.com/tigrbl/tigrcorn/releases/tag/v0.3.17',
    highlights: [
      'Synchronized aggregate release across 14 separate Python components.',
      'Resolved clean WebSocket close events when operating inside highly-multiplexed HTTP/2 sessions.',
      'Refined precompressed static sidecar lookups for non-standard file extensions.',
      'Updated Python 3.14 test matrix integration benchmarks.'
    ],
    manifestComponents: [
      { name: 'tigrcorn', version: '0.3.17' },
      { name: 'tigrcorn-listener', version: '0.3.17' },
      { name: 'tigrcorn-h1', version: '0.3.17' },
      { name: 'tigrcorn-h2', version: '0.3.17' },
      { name: 'tigrcorn-h3', version: '0.3.17' },
      { name: 'tigrcorn-quic', version: '0.3.17' },
      { name: '@tigrcorn/wt-peer-probes', version: '0.3.17' }
    ]
  },
  {
    version: '0.3.16',
    date: '2026-05-12',
    stability: 'stable',
    summary: 'Coordinated version rollout establishing production-ready HTTP/3 and QUIC listener configurations.',
    pypiLink: 'https://pypi.org/project/tigrcorn/0.3.16/',
    githubTagLink: 'https://github.com/tigrbl/tigrcorn/releases/tag/v0.3.16',
    highlights: [
      'Integrated unified HTTP/3 worker socket recycling during peak CPU thresholds.',
      'Improved X.509 client certificate chain validation inside mTLS handshakes.',
      'Introduced `@tigrcorn/wt-peer-probes` NPM package for client-side diagnostics.'
    ],
    manifestComponents: [
      { name: 'tigrcorn', version: '0.3.16' },
      { name: 'tigrcorn-listener', version: '0.3.16' },
      { name: 'tigrcorn-h1', version: '0.3.16' },
      { name: 'tigrcorn-h3', version: '0.3.16' },
      { name: '@tigrcorn/wt-peer-probes', version: '0.3.16' }
    ]
  },
  {
    version: '0.3.15',
    date: '2026-04-03',
    stability: 'stable',
    summary: 'Consolidated publication of the Python package family and the browser-side WebTransport probe package.',
    pypiLink: 'https://pypi.org/project/tigrcorn/0.3.15/',
    githubTagLink: 'https://github.com/tigrbl/tigrcorn/releases/tag/v0.3.15',
    highlights: [
      'First unified build consolidating 14 component subpackages into a central monorepo structure.',
      'Initial release of Browser-side WebTransport probe protocols.'
    ],
    manifestComponents: [
      { name: 'tigrcorn', version: '0.3.15' },
      { name: '@tigrcorn/wt-peer-probes', version: '0.3.15' }
    ]
  },
  {
    version: '0.3.18.dev2',
    date: '2026-07-02',
    stability: 'development',
    summary: 'Prerelease developmental snapshot. Evaluates experimental HTTP/3 stream flow-control policies and Python 3.14 native optimizations.',
    pypiLink: 'https://pypi.org/project/tigrcorn/0.3.18.dev2/',
    githubTagLink: 'https://github.com/tigrbl/tigrcorn/releases/tag/v0.3.18.dev2',
    highlights: [
      'Experimental: custom memory-mapped ring buffers for fast UDP socket receiving.',
      'Do not deploy to production; this is an active development snapshot.'
    ],
    manifestComponents: [
      { name: 'tigrcorn', version: '0.3.18.dev2' }
    ]
  }
];

export const articles: Article[] = [
  {
    slug: 'adopting-asgi3-migrating-to-tigrcorn',
    title: 'Adopting ASGI3: Migrating Your Services to Tigrcorn',
    date: '2026-06-25',
    category: 'adoption',
    author: 'Tigrcorn Core Engineering',
    readTime: '6 min read',
    excerpt: 'A practical, step-by-step guide for Python backend developers transitiong from traditional server layers to Tigrcorn\'s high-performance native protocol adapters.',
    content: `Migrating production web services from legacy WSGI or ASGI2 runtimes to a modern ASGI3 server can feel daunting. Tigrcorn streamlines this process by separating the physical network listener from the logical application stream, allowing you to secure immediate wins in speed, multiplexing, and memory safety.

### 1. Understanding the ASGI3 Scope
Unlike earlier specifications, ASGI3 models connection lifecycles clearly. Connections aren't merely continuous streams; they are structured around events:
- \`lifespan.startup\`: Initialize database connections, caches, and dependency containers.
- \`http.request\` & \`http.response\`: Standard request-response payloads.
- \`websocket.connect\` & \`websocket.receive\`: Clean bidirectional socket actions.

Tigrcorn implements this specification perfectly.

### 2. Basic Migration Path
To run a FastAPI, Starlette, or custom ASGI3 app, install Tigrcorn and target your module entry point:

\`\`\`bash
# 1. Install Tigrcorn stable with uv
uv add tigrcorn

# Or install into the active environment with pip
python -m pip install tigrcorn

# 2. Run with default parameters
tigrcorn app.main:app --host 127.0.0.1 --port 8000
\`\`\`

If your app was designed for Uvicorn or Hypercorn, your application code remains **completely unchanged**. However, your deployment parameters can be optimized using Tigrcorn's declarative profiles.

### 3. Transitioning to Blessed Profiles
Rather than passing twenty CLI flags, choose a deployment profile that describes your topology:
- **Behind an ALB or Nginx?** Use the \`strict-h1-origin\` profile. It locks down proxy headers and enforces host-matching to eliminate DNS rebinding risks.
- **Facing the public internet?** Opt for \`strict-h3-edge\`. It enables concurrent UDP listening for HTTP/3, automatically sets the \`Alt-Svc\` header on TCP, and sets up high-performance streams.

### 4. Code-Level Verification
You can also launch Tigrcorn directly from your Python control scripts using \`EmbeddedServer\` to manage lifecycles programmatically:

\`\`\`python
import asyncio
from tigrcorn import EmbeddedServer

async def main():
    # Embedded runtime with custom lifecycle hooks
    server = EmbeddedServer(
        app="app.main:app",
        host="127.0.0.1",
        port=8000,
        profile="strict-h1-origin"
    )
    await server.serve()

if __name__ == "__main__":
    asyncio.run(main())
\`\`\`

By deploying with Tigrcorn, teams achieve superior concurrency bounds, automatic precompressed static serving, and native OpenSSL bindings without complex wrapper configurations.`
  },
  {
    slug: 'designing-mtls-and-trust-store-policies',
    title: 'Designing mTLS and Trust-Store Policies for Internal APIs',
    date: '2026-06-10',
    category: 'operation',
    author: 'Platform Architecture Team',
    readTime: '8 min read',
    excerpt: 'Learn how to secure service-to-service communication by enforcing strict mutual TLS policies and private certificate authorities natively inside Tigrcorn.',
    content: `In a modern zero-trust architecture, microservices must never trust requests based solely on network location. Enforcing Mutual TLS (mTLS)—where both client and server verify each other's certificates—is the gold standard for service authentication.

Typically, configuring mTLS requires a complex reverse proxy mesh like Envoy or Linkerd. Tigrcorn changes this equation, enabling high-performance mTLS directly within the Python application layer.

### Why direct mTLS?
When you offload TLS entirely to an external proxy, you risk exposing unencrypted traffic in your internal cluster. By processing TLS directly in Tigrcorn's native C/Rust transport session, you ensure cryptography persists up to the boundary of your Python application state, while retaining absolute visibility over client certificate metadata.

### Step 1: Prepare the CA and Certificates
To use mTLS, you need:
1. A Root Certificate Authority (\`ca.pem\`).
2. A Server Certificate (\`server.pem\`) signed by the Root CA.
3. Client Certificates issued to authorized microservices, signed by the Root CA.

### Step 2: Running Tigrcorn with the strict-mtls-origin Profile
Tigrcorn provides a specific deployment profile called \`strict-mtls-origin\` designed for zero-trust environments.

To start Tigrcorn in mandatory client verification mode:

\`\`\`bash
tigrcorn app.api:app \\
  --profile strict-mtls-origin \\
  --certfile /etc/certs/server.pem \\
  --keyfile /etc/certs/server-key.pem \\
  --client-ca-file /etc/certs/ca.pem \\
  --verify-client mandatory
\`\`\`

### Precedence and Security Posture
The \`strict-mtls-origin\` profile enforces:
- **Mandatory Handshakes**: Handshakes terminate instantly if no client certificate is presented.
- **TLS 1.3 Minimum**: Weak legacy protocols like TLS 1.0, 1.1, and 1.2 are blocked.
- **CRL Revocation Directories**: Point Tigrcorn to a CRL path to instantly block revoked client certificates without restarting your server processes.

### Accessing Client Claims inside ASGI
Once authenticated, Tigrcorn populates the ASGI connection scope with client certificate metadata:

\`\`\`python
async def app(scope, receive, send):
    if scope["type"] == "http":
        # Tigrcorn-specific cert extensions
        client_cert = scope.get("extensions", {}).get("client_certificate", {})
        subject = client_cert.get("subject", "unknown")
        
        # Enforce application-level authorization based on Common Name (CN)
        if "service-b" not in subject:
            await send_error(send, 403, "Forbidden - CN mismatch")
            return
            
        await send_response(send, 200, b"Authenticated and Authorized")
\`\`\`

By configuring direct mTLS inside Tigrcorn, you drastically simplify your service mesh complexity, lower latency overhead, and establish an uncompromisable layer of communication safety.`
  },
  {
    slug: 'optimizing-edge-static-assets',
    title: 'Optimizing Edge Static Assets with Precompressed Sidecars',
    date: '2026-05-28',
    category: 'evaluation',
    author: 'Technical Marketing & Performance',
    readTime: '5 min read',
    excerpt: 'Discover how Tigrcorn\'s zero-copy static mounts bypass Python processing to deliver Brotli and Gzip assets natively at close-to-C speeds.',
    content: `Serving static assets directly from a Python web server is traditionally considered an anti-pattern. Frameworks like Django and Starlette route static file reads through the Python virtual machine, consuming precious single-threaded CPU cycles and ballooning response latency.

To address this, developers typically configure Nginx or Cloudflare CDN layers. However, this duplicates infrastructure, complicates local development, and creates deployment drift.

Tigrcorn's \`static-origin\` profile solves this natively.

### The Zero-Copy Static Mount
Tigrcorn integrates a native static-mount responder directly into its multi-threaded socket listener layer. When a request matches a configured static mount route:
1. **Bypasses ASGI**: The request never reaches the ASGI event queue or the Python interpreter.
2. **Zero-Copy Transfers**: The server uses native kernel system calls (such as \`sendfile\` or modern asynchronous direct I/O) to pipe files from disk straight into the socket.

### Leveraging Precompressed Sidecars
Gzip and Brotli compressions are highly effective but computing them on-the-fly for every client is computationally expensive. 

Tigrcorn supports **Precompressed Sidecars**. When you build your frontend React application, compile your files alongside pre-built compressions:
- \`index.html\` (raw file)
- \`index.html.gz\` (pre-gzipped sidecar)
- \`index.html.br\` (pre-brotli sidecar)

When starting Tigrcorn, instruct it to search for these pre-compressed files:

\`\`\`bash
tigrcorn app:app \\
  --profile static-origin \\
  --static-mount /:./dist \\
  --precompressed brotli,gzip
\`\`\`

### Runtime Selection Logic
When a client requests \`/index.html\`, Tigrcorn checks the incoming \`Accept-Encoding\` header:
- If \`Accept-Encoding: br\` is present, and \`index.html.br\` exists on disk, it streams the Brotli sidecar instantly and sets \`Content-Encoding: br\`.
- If Brotli is unsupported, but \`gzip\` is present, it serves \`index.html.gz\`.
- If neither is supported, it falls back to the raw \`index.html\`.

### Conditional Headers and Range Requests
Tigrcorn handles complex HTTP cache renegotiations natively:
- **ETags and Last-Modified**: Compares incoming \`If-None-Match\` or \`If-Modified-Since\` headers to return \`304 Not Modified\` without disk reads.
- **Byte Ranges**: Supports \`Range: bytes=100-500\` requests, which is essential for HTML5 video seeking and partial asset loads.

By migrating static delivery to Tigrcorn's native edge mounts, you free up your Python workers to focus exclusively on dynamic business APIs, resulting in massive speedups and rock-solid edge performance.`
  }
];

export const architectureFlow: ArchitectureLayer[] = [
  {
    step: 1,
    name: '1. Listener Sockets',
    description: 'Binds to TCP/UDP ports natively',
    details: 'Leverages optimized multi-threaded native bindings to handle raw TCP connections and high-throughput UDP datagrams.'
  },
  {
    step: 2,
    name: '2. Transport Session',
    description: 'Manages TLS 1.3 & QUIC handshakes',
    details: 'Enforces strict cryptographic parameters, executes mTLS verification, handles OCSP/CRL requests, and negotiates ALPN protocols.'
  },
  {
    step: 3,
    name: '3. Logical Stream Router',
    description: 'Multiplexes active connection channels',
    details: 'Manages multiple concurrent streams over a single physical TCP or UDP session, mitigating client head-of-line blocking.'
  },
  {
    step: 4,
    name: '4. Protocol Adapter',
    description: 'Translates packets into ASGI events',
    details: 'Decodes raw HTTP heads, HPACK, QPACK, and WebSockets into standardized ASGI event structures on the fly.'
  },
  {
    step: 5,
    name: '5. ASGI Connection Interface',
    description: 'Executes app lifespan & connection handlers',
    details: 'Dispatches decoded events to ASGI3 application loops, monitoring timeouts and tracking performance metrics.'
  }
];
