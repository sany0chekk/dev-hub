"use client";

import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { lowlight } from "@/lib/syntax-highlighting";
import { FontSize } from "@/lib/font-size";
import MenuBar from "./menu-bar";
import "./styles.css";
import "@/components/editor/code-styles.css";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useState } from "react";
import { useArticle } from "@/hooks/useArticle";

export default function TipTapEditor() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const { createArticle } = useArticle();

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "javascript",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList,
      OrderedList,
      TextStyle,
      Color,
      FontSize.configure({
        types: ["textStyle"],
      }),
    ],
    content: "Hello World! 🌎️",
  });

  if (!editor) {
    return null;
  }

  const handleSave = async () => {
    if (!editor) return;

    const html = editor.getHTML();

    try {
      const articleId = await createArticle.mutateAsync({
        title,
        content: html,
        user,
      });

      router.push(`/articles/${articleId}`);
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  return (
    <div className="relative flex-grow">
      <Input
        placeholder="Article title"
        className="mb-4 p-6 bg-background"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <FloatingMenu
        className="border rounded-lg p-2 flex items-center gap-2 bg-background shadow-lg"
        editor={editor}
        tippyOptions={{
          duration: 100,
          placement: "top",
          delay: [200, 0],
          hideOnClick: true,
        }}
      >
        <MenuBar editor={editor} />
      </FloatingMenu>

      <BubbleMenu
        className="border rounded-lg p-2 flex items-center gap-2 bg-background shadow-lg"
        editor={editor}
        tippyOptions={{ duration: 100 }}
      >
        <MenuBar editor={editor} />
      </BubbleMenu>

      <div className="h-full flex flex-col">
        <div className="flex-grow border rounded-lg p-4 shadow-lg">
          <EditorContent editor={editor} />
        </div>
        <Button
          className="block mt-4 ml-auto"
          onClick={handleSave}
          disabled={!title || createArticle.isPending}
        >
          {createArticle.isPending ? "Publishing..." : "Publish article"}
        </Button>
      </div>
    </div>
  );
}
