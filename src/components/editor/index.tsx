"use client";

import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Code from "@tiptap/extension-code";
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
import { Button } from "../ui/button";

export default function TipTapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "javascript",
      }),
      Code,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList,
      OrderedList,
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      FontSize.configure({
        types: ["textStyle"],
      }),
    ],
    content: "Hello World! 🌎️",
  });

  if (!editor) {
    return null;
  }

  const handleSave = () => {
    const html = editor.getHTML();
    const json = editor.getJSON();

    console.log("HTML:", html);
    console.log("JSON:", json);

    localStorage.setItem("editor-content", html);
  };

  return (
    <div className="relative flex-grow">
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
        <Button className="block mt-4 ml-auto" onClick={handleSave}>
          Publish article
        </Button>
      </div>
    </div>
  );
}
