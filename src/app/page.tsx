"use client";

import { CodeXml, Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import Container from "@/components/layout/container";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getArticles } from "@/hooks/useArticle";

export default function Home() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles", "latest"],
    queryFn: () => getArticles(10),
  });

  return (
    <section className="flex flex-col flex-grow">
      <Container className="relative flex-grow flex flex-col w-full h-full">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 uppercase mx-auto">
              <CodeXml className="text-green-300" />
              Welcome to <span className="text-green-300">DevHub</span>
            </CardTitle>
          </CardHeader>
        </Card>
        <div className="mt-8">
          {isLoading ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 items-center justify-center text-semibold text-lg">
              <Loader className="animate-spin" />
              Loading articles...
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles?.map((article) => (
                  <article
                    key={article.id}
                    className="p-4 border rounded-lg hover:border-primary transition-colors"
                  >
                    <Link href={`/articles/${article.id}`}>
                      <h3 className="text-lg font-semibold mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        By {article.authorName} •{" "}
                        {article.createdAt.toLocaleDateString()}
                      </p>
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
