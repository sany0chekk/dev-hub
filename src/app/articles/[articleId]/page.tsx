"use client";

import { useEffect, use } from "react";
import Link from "next/link";
import hljs from "highlight.js";
import { ChevronLeft, SearchX } from "lucide-react";

import "@/components/complex/editor/code-styles.css";
import "highlight.js/styles/github-dark.css";

import { useArticle } from "@/hooks/useArticle";

import { Button } from "@/components/ui/button";
import Container from "@/components/layout/container";
import { Card, CardContent } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const router = useRouter();
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
      <section className="pt-6 pb-16">
        <Container className="flex flex-col gap-10">
          <Skeleton className="w-[100px] h-[35px]" />
          <Skeleton className="w-full h-[150px]" />
          <Skeleton className="max-w-[800px] w-full mx-auto h-[500px]" />
        </Container>
      </section>
    );
  }

  if (error || !article) {
    return (
      <div className="flex-grow flex flex-col gap-4 justify-center items-center">
        <div className="flex gap-2 items-center font-medium text-lg">
          <SearchX className="size-8" />
          Article not found
        </div>
        <Button variant={"outline"} asChild>
          <Link className="block" href="/">
            Go back
          </Link>
        </Button>
      </div>
    );
  }

  const handleGoBack = () => {
    router.back();
  };

  return (
    <section className="pt-6 pb-16">
      <Container className="flex flex-col gap-10">
        <Button
          className="mr-auto font-semibold"
          variant={"outline"}
          onClick={handleGoBack}
        >
          <ChevronLeft className="size-5" />
          Go back
        </Button>
        <Card>
          <CardContent>
            <h1 className="text-xl md:text-2xl font-bold">{article.title}</h1>
            <div>
              <p className="text-sm text-muted-foreground">
                By {article.authorName} •{" "}
                {article.createdAt.toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <article className="max-w-[800px] w-full mx-auto">
          <div
            className="prose prose-sm max-w-none dark:prose-invert prose-p:my-4 [&>p:empty]:h-4 [&>ul]:pl-4 [&>ol]:pl-4 [&>li]:my-1 [&>ul]:!list-disc [&>ol]:!list-decimal [&>pre]:w-full [&>pre]:max-w-full [&>pre]:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </Container>
    </section>
  );
}
