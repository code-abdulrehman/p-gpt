import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface MarkdownRendererProps {
  content: string;
  themeConfig: any;
  isDarkMode?: boolean;
  className?: string;
}

// Parse inline markdown (bold, italic, code, links) - returns plain text with placeholders
const parseInlineMarkdown = (text: string): string => {
  let result = text;

  // Handle inline code first (to prevent interference with other patterns)
  result = result.replace(/`([^`]+)`/g, '___INLINE_CODE___$1___END_INLINE_CODE___');

  // Handle bold text
  result = result.replace(/\*\*([^*]+)\*\*/g, '___BOLD___$1___END_BOLD___');

  // Handle italic text
  result = result.replace(/\*([^*]+)\*/g, '___ITALIC___$1___END_ITALIC___');

  // Handle links
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '___LINK___$1___URL___$2___END_LINK___');

  return result;
};

// Convert parsed inline text to JSX
const renderInlineText = (text: string, isDarkMode: boolean): React.ReactNode => {
  const parts = text.split(/(___(?:INLINE_CODE|BOLD|ITALIC|LINK)___.*?___END_(?:INLINE_CODE|BOLD|ITALIC|LINK)___)/);
  
  return parts.map((part, index) => {
    if (part.startsWith('___INLINE_CODE___')) {
      const code = part.replace(/___INLINE_CODE___|___END_INLINE_CODE___/g, '');
      return (
        <code 
          key={index}
          className={`px-1.5 py-0.5 rounded text-sm font-mono ${isDarkMode ? 'bg-gray-800 text-red-300 border border-gray-700' : 'bg-red-50 text-red-700 border border-red-200'}`}
        >
          {code}
        </code>
      );
    } else if (part.startsWith('___BOLD___')) {
      const bold = part.replace(/___BOLD___|___END_BOLD___/g, '');
      return (
        <strong key={index} className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {bold}
        </strong>
      );
    } else if (part.startsWith('___ITALIC___')) {
      const italic = part.replace(/___ITALIC___|___END_ITALIC___/g, '');
      return (
        <em key={index} className={`italic ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {italic}
        </em>
      );
    } else if (part.startsWith('___LINK___')) {
      const match = part.match(/___LINK___(.*?)___URL___(.*?)___END_LINK___/);
      if (match) {
        const [, linkText, url] = match;
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}
          >
            {linkText}
          </a>
        );
      }
    }
    return part;
  }).filter(part => part !== '');
};

// Parse markdown content
const parseMarkdown = (content: string, isDarkMode: boolean): React.ReactNode[] => {
  const lines = content.split('\n');
  const result: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      const language = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;

      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }

      const code = codeLines.join('\n');

      result.push(
        <div key={`code-${i}`} className="my-3 rounded-lg overflow-hidden">
          <Highlight
            theme={isDarkMode ? themes.vsDark : themes.github}
            code={code}
            language={language || 'text'}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <div>
                {language && (
                  <div className={`px-3 py-2 text-xs font-medium ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'} border-b`}>
                    {language}
                  </div>
                )}
                <pre className={`${className} p-3 overflow-x-auto text-sm font-mono leading-relaxed`} style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              </div>
            )}
          </Highlight>
        </div>
      );
    }
    // Headings
    else if (line.startsWith('# ')) {
      result.push(
        <h1 key={`h1-${i}`} className={`text-lg font-bold mb-2 mt-3 ${isDarkMode ? 'text-white' : 'text-gray-900'} border-b pb-1 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {renderInlineText(parseInlineMarkdown(line.slice(2)), isDarkMode)}
        </h1>
      );
    }
    else if (line.startsWith('## ')) {
      result.push(
        <h2 key={`h2-${i}`} className={`text-base font-semibold mb-2 mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {renderInlineText(parseInlineMarkdown(line.slice(3)), isDarkMode)}
        </h2>
      );
    }
    else if (line.startsWith('### ')) {
      result.push(
        <h3 key={`h3-${i}`} className={`text-sm font-semibold mb-1 mt-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {renderInlineText(parseInlineMarkdown(line.slice(4)), isDarkMode)}
        </h3>
      );
    }
    else if (line.startsWith('#### ')) {
      result.push(
        <h4 key={`h4-${i}`} className={`text-sm font-medium mb-1 mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {renderInlineText(parseInlineMarkdown(line.slice(5)), isDarkMode)}
        </h4>
      );
    }
    // Lists
    else if (line.match(/^[\s]*[-*+]\s/)) {
      const listItems: string[] = [];
      
      while (i < lines.length && (lines[i].match(/^[\s]*[-*+]\s/) || lines[i].trim() === '')) {
        if (lines[i].trim() !== '') {
          listItems.push(lines[i].replace(/^[\s]*[-*+]\s/, ''));
        }
        i++;
      }
      i--; // Step back one since we'll increment at the end of the loop

      result.push(
        <ul key={`ul-${i}`} className={`list-disc list-inside mb-2 space-y-1 ml-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInlineText(parseInlineMarkdown(item), isDarkMode)}
            </li>
          ))}
        </ul>
      );
    }
    // Numbered lists
    else if (line.match(/^[\s]*\d+\.\s/)) {
      const listItems: string[] = [];
      
      while (i < lines.length && (lines[i].match(/^[\s]*\d+\.\s/) || lines[i].trim() === '')) {
        if (lines[i].trim() !== '') {
          listItems.push(lines[i].replace(/^[\s]*\d+\.\s/, ''));
        }
        i++;
      }
      i--; // Step back one

      result.push(
        <ol key={`ol-${i}`} className={`list-decimal list-inside mb-2 space-y-1 ml-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInlineText(parseInlineMarkdown(item), isDarkMode)}
            </li>
          ))}
        </ol>
      );
    }
    // Blockquotes
    else if (line.startsWith('> ')) {
      result.push(
        <blockquote key={`quote-${i}`} className={`border-l-4 pl-3 my-2 italic ${isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-300' : 'border-gray-300 bg-gray-50 text-gray-700'} py-2 rounded-r`}>
          {renderInlineText(parseInlineMarkdown(line.slice(2)), isDarkMode)}
        </blockquote>
      );
    }
    // Horizontal rule
    else if (line.trim() === '---' || line.trim() === '***') {
      result.push(
        <hr key={`hr-${i}`} className={`my-3 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />
      );
    }
    // Regular paragraphs
    else if (line.trim() !== '') {
      result.push(
        <p key={`p-${i}`} className={`mb-2 leading-relaxed ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {renderInlineText(parseInlineMarkdown(line), isDarkMode)}
        </p>
      );
    }
    // Empty lines - skip but don't add elements

    i++;
  }

  return result;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  themeConfig,
  isDarkMode = false,
  className = '',
}) => {
  const parsedContent = parseMarkdown(content, isDarkMode);

  return (
    <div className={`markdown-content whitespace-normal ${className}`}>
      {parsedContent}
    </div>
  );
};

export default MarkdownRenderer; 