"use client";

import { useQuery } from "@tanstack/react-query";

import { getArticles } from "@/hooks/useArticle";

import Container from "@/components/layout/container";
import PageHeader from "@/components/complex/home/page-header";

import ArticlesList from "@/components/complex/home/articles-list";
import ArticlesFinder from "@/components/complex/home/articles-finder";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles", "latest"],
    queryFn: () => getArticles(10),
  });

  return (
    <section className="flex flex-col flex-grow py-10">
      <Container className="relative flex-grow flex flex-col w-full h-full">
        <PageHeader />
        <div className="mt-8">
          {isLoading ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="w-[100px] md:w-[200px] h-[30px]" />
                <Skeleton className="w-[50px] md:w-[150px] h-[30px]" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Skeleton className="w-full h-[120px]" />
                <Skeleton className="w-full h-[120px]" />
                <Skeleton className="w-full h-[120px]" />
                <Skeleton className="w-full h-[120px]" />
              </div>
            </div>
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
