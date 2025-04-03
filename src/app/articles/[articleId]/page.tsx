"use client";

import { useEffect, use } from "react";
import "@/components/editor/code-styles.css";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useArticle } from "@/hooks/useArticle";
import { Separator } from "@/components/ui/separator";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = use(params);
  const { article, isLoading, error } = useArticle(articleId);

  useEffect(() => {
    if (article) {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [article]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex justify-center items-center h-screen">
        Article not found
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <div>
        <p className="text-sm text-muted-foreground">
          By {article.authorName} • {article.createdAt.toLocaleDateString()}
        </p>
      </div>
      <Separator className="my-10" />
      <div
        className="prose prose-sm max-w-none dark:prose-invert prose-p:my-4 [&>p:empty]:h-4 [&>ul]:pl-4 [&>ol]:pl-4 [&>li]:my-1 [&>ul]:!list-disc [&>ol]:!list-decimal"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
