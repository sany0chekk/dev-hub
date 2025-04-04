"use client";

import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  const codeRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    if (codeRef.current) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={copyCode}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      <pre
        ref={codeRef}
        className={cn(
          "p-4 rounded-lg overflow-x-auto",
          "bg-[#1e1e1e] text-white",
          "font-mono text-sm"
        )}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
