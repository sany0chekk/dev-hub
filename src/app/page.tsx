"use client";

import { useQuery } from "@tanstack/react-query";

import { getArticles } from "@/hooks/useArticle";

import Container from "@/components/layout/container";
import PageHeader from "@/components/complex/home/page-header";
import DataLoader from "@/components/ui/data-loader";
import ArticlesList from "@/components/complex/home/articles-list";
import ArticlesFinder from "@/components/complex/home/articles-finder";

export default function Home() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles", "latest"],
    queryFn: () => getArticles(10),
  });

  return (
    <section className="flex flex-col flex-grow">
      <Container className="relative flex-grow flex flex-col w-full h-full">
        <PageHeader />
        <div className="mt-8">
          {isLoading ? (
            <DataLoader>Loading articles...</DataLoader>
          ) : (
            <>
              <ArticlesFinder />

              <ArticlesList articles={articles} />
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
