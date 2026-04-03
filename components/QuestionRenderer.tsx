"use client";

import React from "react";
import { InlineMath, BlockMath } from "react-katex";

interface QuestionRendererProps {
  content: string;
  image?: string | null;
  isCompact?: boolean;
}

export default function QuestionRenderer({
  content,
  image,
  isCompact = false,
}: QuestionRendererProps) {
  // Parse both block math ($$...$$) and inline math ($...$)
  const renderContent = (text: string) => {
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    // Regex to match both $$...$$ and $...$
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        elements.push(
          <span key={`text-${lastIndex}`}>
            {text.substring(lastIndex, match.index)}
          </span>
        );
      }

      // Add math
      const mathContent = match[1];
      if (mathContent.startsWith("$$") && mathContent.endsWith("$$")) {
        // Block math
        const latex = mathContent.slice(2, -2).trim();
        elements.push(
          <div key={`block-${match.index}`} className="my-3 flex justify-center">
            <BlockMath math={latex} />
          </div>
        );
      } else {
        // Inline math
        const latex = mathContent.slice(1, -1);
        elements.push(
          <InlineMath key={`inline-${match.index}`} math={latex} />
        );
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(
        <span key={`text-${lastIndex}`}>{text.substring(lastIndex)}</span>
      );
    }

    return elements.length > 0 ? elements : <span>{text}</span>;
  };

  return (
    <div className={isCompact ? "" : "space-y-4"}>
      <div className={isCompact ? "inline" : "text-lg leading-relaxed"}>
        {renderContent(content)}
      </div>

      {image && !isCompact && (
        <div className="flex justify-center my-4">
          <img
            src={image}
            alt="Question image"
            className="max-w-full max-h-96 rounded"
          />
        </div>
      )}
    </div>
  );
}
