export interface StableRelease {
  version: string;
  releaseDate: string;
  pythonVersionRange: string;
  license: string;
  pypiUrl: string;
  githubUrl: string;
  docsUrl: string;
  installCommand: string;
  basicRunCommand: string;
}

export type SupportStatus = 'stable' | 'optional' | 'experimental' | 'out-of-scope';

export interface ProtocolDefinition {
  id: string;
  name: string;
  status: SupportStatus;
  useCase: string;
  posture: string;
  configExample: string;
  description: string;
  rfcOrSpec?: string;
}

export interface DeploymentProfile {
  id: string;
  name: string;
  label: string;
  purpose: string;
  posture: string;
  cliExample: string;
  configSnippet: string;
  details: string[];
}

export interface ComponentPackage {
  name: string;
  role: string;
  scope: string;
}

export interface ReleaseManifest {
  version: string;
  date: string;
  stability: 'stable' | 'prerelease' | 'development';
  summary: string;
  pypiLink: string;
  githubTagLink: string;
  highlights: string[];
  manifestComponents: { name: string; version: string }[];
}

export interface Article {
  slug: string;
  title: string;
  date: string;
  category: 'adoption' | 'evaluation' | 'operation';
  excerpt: string;
  author: string;
  readTime: string;
  content: string;
}

export interface ArchitectureLayer {
  step: number;
  name: string;
  description: string;
  details: string;
}
