export interface Article {
  id: string;
  title: string;
  content: string;
  json: Record<string, unknown>;
  authorId: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
}
