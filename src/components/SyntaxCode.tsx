import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-ini';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';

interface SyntaxCodeProps {
  code: string;
  language?: string;
  className?: string;
}

const languageAliases: Record<string, string> = {
  console: 'bash',
  py: 'python',
  shell: 'bash',
  sh: 'bash',
  terminal: 'bash',
  toml: 'ini',
};

export default function SyntaxCode({ code, language = 'text', className }: SyntaxCodeProps) {
  const normalizedLanguage = languageAliases[language.toLowerCase()] ?? language.toLowerCase();
  const grammar = Prism.languages[normalizedLanguage];

  if (!grammar) {
    return <code className={className}>{code}</code>;
  }

  return (
    <code
      className={`${className ?? ''} language-${normalizedLanguage}`.trim()}
      dangerouslySetInnerHTML={{ __html: Prism.highlight(code, grammar, normalizedLanguage) }}
    />
  );
}
