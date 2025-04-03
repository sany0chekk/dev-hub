"use client";

import { Editor } from "@tiptap/core";
import {
  Bold,
  Italic,
  Strikethrough,
  Code2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
} from "lucide-react";
import FormatButton from "./format-button";
import LanguageSelect from "./language-select";
import ColorPicker from "./color-picker";

interface MenuBarProps {
  editor: Editor;
}

export default function MenuBar({ editor }: MenuBarProps) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
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
          <FormatButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            icon={AlignLeft}
            title="Align Left"
          />
          <FormatButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            icon={AlignCenter}
            title="Align Center"
          />
          <FormatButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            icon={AlignRight}
            title="Align Right"
          />
          <FormatButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            isActive={editor.isActive({ textAlign: "justify" })}
            icon={AlignJustify}
            title="Justify"
          />
          <FormatButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            icon={List}
            title="Bullet List"
          />
          <FormatButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            icon={ListOrdered}
            title="Ordered List"
          />
          <ColorPicker editor={editor} />
        </>
      )}
      <FormatButton
        onClick={() => {
          editor.chain().focus().toggleCodeBlock().run();
        }}
        isActive={editor.isActive("codeBlock")}
        icon={Code2}
        title="Code Block"
      />
      {editor.isActive("codeBlock") && <LanguageSelect editor={editor} />}
    </div>
  );
}
