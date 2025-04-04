import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase-config";
import { Editor } from "@tiptap/react";
import { User } from "firebase/auth";
import { Article } from "@/app/types/article";

export const getArticles = async (limitCount?: number): Promise<Article[]> => {
  const articlesRef = collection(db, "articles");
  const q = query(
    articlesRef,
    orderBy("createdAt", "desc"),
    ...(limitCount ? [limit(limitCount)] : [])
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      content: data.content,
      json: data.json,
      authorId: data.authorId,
      authorName: data.authorName,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Article;
  });
};

export const getArticlesCount = async (): Promise<number> => {
  const articlesRef = collection(db, "articles");
  const querySnapshot = await getDocs(articlesRef);
  return querySnapshot.size;
};

export const useArticle = (articleId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", articleId],
    queryFn: async () => {
      if (!articleId) return null;
      const docRef = doc(db, "articles", articleId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title,
        content: data.content,
        json: data.json,
        authorId: data.authorId,
        authorName: data.authorName,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Article;
    },
    enabled: !!articleId,
  });

  const createArticle = useMutation({
    mutationFn: async ({
      title,
      content,
      user,
    }: {
      title: string;
      content: string;
      user: User | null;
    }) => {
      if (!user) throw new Error("User not authenticated");

      const docRef = await addDoc(collection(db, "articles"), {
        title,
        content,
        authorId: user.uid,
        authorName: user.displayName,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return docRef.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const updateArticle = useMutation({
    mutationFn: async ({
      articleId,
      title,
      editor,
    }: {
      articleId: string;
      title: string;
      editor: Editor;
    }) => {
      const html = editor.getHTML();
      const json = editor.getJSON();

      const docRef = doc(db, "articles", articleId);
      await updateDoc(docRef, {
        title,
        content: html,
        json,
        updatedAt: new Date(),
      });
    },
    onSuccess: (_, { articleId }) => {
      queryClient.invalidateQueries({ queryKey: ["article", articleId] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  return {
    article,
    isLoading,
    error,
    createArticle,
    updateArticle,
  };
};
