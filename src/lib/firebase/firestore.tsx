import { collection } from "firebase/firestore";

import { addDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { User } from "firebase/auth";
import { Editor } from "@tiptap/react";

export const addArticle = async (
  title: string,
  editor: Editor,
  user: User | null
) => {
  if (!user) return;

  const html = editor.getHTML();
  const json = editor.getJSON();

  try {
    const docRef = await addDoc(collection(db, "articles"), {
      title: title,
      content: html,
      json: json,
      authorId: user.uid,
      authorName: user.displayName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error saving article:", error);
  }
};
