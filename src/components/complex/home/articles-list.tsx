import Link from "next/link";
import { Article } from "@/app/types/article";

export default function ArticlesList({
  articles,
}: {
  articles: Article[] | undefined;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {articles?.map((article) => (
        <article
          key={article.id}
          className="p-4 border rounded-lg hover:border-primary transition-colors bg-background-secondary"
        >
          <Link href={`/articles/${article.id}`}>
            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
            <p className="text-sm text-muted-foreground">
              By {article.authorName} • {article.createdAt.toLocaleDateString()}
            </p>
          </Link>
        </article>
      ))}
    </div>
  );
}
