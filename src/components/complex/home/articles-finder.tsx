import { useQuery } from "@tanstack/react-query";
import { getArticlesCount } from "@/hooks/useArticle";
import { Loader } from "lucide-react";

export default function ArticlesFinder() {
  const { data: totalArticles } = useQuery({
    queryKey: ["articles", "count"],
    queryFn: getArticlesCount,
  });

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold">Latest Articles</h2>
      <p className="text-foreground text-sm opacity-50 font-semibold flex items-center">
        {totalArticles || <Loader className="animate-spin" />} articles
      </p>
    </div>
  );
}
