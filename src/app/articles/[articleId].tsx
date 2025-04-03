import { useParams } from "next/navigation";

export default function ArticlePage() {
  const { articleId } = useParams();
  return <div>{articleId}</div>;
}
