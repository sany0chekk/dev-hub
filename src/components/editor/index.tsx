"use client";

import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
  Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Code from "@tiptap/extension-code";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import php from "highlight.js/lib/languages/php";
import ruby from "highlight.js/lib/languages/ruby";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import { Bold, Italic, Strikethrough, Code2 } from "lucide-react";
import FormatButton from "./format-button";
import LanguageSelect from "./language-select";
import "./styles.css";

const lowlight = createLowlight();
lowlight.register("js", js);
lowlight.register("ts", ts);
lowlight.register("python", python);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("php", php);
lowlight.register("ruby", ruby);
lowlight.register("go", go);
lowlight.register("rust", rust);

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;

  return (
    <>
      {!editor.isActive("codeBlock") && (
        <>
          <FormatButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            icon={Bold}
            title="Bold"
          />
          <FormatButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            icon={Italic}
            title="Italic"
          />
          <FormatButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            icon={Strikethrough}
            title="Strike"
          />
        </>
      )}
      <FormatButton
        onClick={() => {
          editor.chain().focus().insertContent("\n").toggleCodeBlock().run();
        }}
        isActive={editor.isActive("codeBlock")}
        icon={Code2}
        title="Code Block"
      />
      {editor.isActive("codeBlock") && <LanguageSelect editor={editor} />}
    </>
  );
};

export default function TipTapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "javascript",
      }),
      Code,
    ],
    content: "Hello World! 🌎️",
  });

  if (!editor) {
    return null;
  }

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

      <div className="h-full border-2 rounded-lg p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
