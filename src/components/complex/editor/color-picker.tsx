"use client";

import { Editor } from "@tiptap/core";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Paintbrush, Type } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  editor: Editor;
}

const colors = [
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#ef4444" },
  { name: "Green", value: "#22c55e" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Yellow", value: "#eab308" },
  { name: "Purple", value: "#a855f7" },
  { name: "Orange", value: "#f97316" },
];

const fontSizes = [
  { name: "Small", value: "12px" },
  { name: "Normal", value: "16px" },
  { name: "Large", value: "20px" },
  { name: "Extra Large", value: "24px" },
];

export default function ColorPicker({ editor }: ColorPickerProps) {
  if (!editor) return null;

  const currentColor = editor.getAttributes("textStyle").color || "#000000";
  const currentFontSize = editor.getAttributes("textStyle").fontSize || "16px";

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Paintbrush className="h-4 w-4" />
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: currentColor }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2 mt-3">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.value}
                className={cn(
                  "h-6 w-6 rounded-full",
                  currentColor === color.value && "ring-2 ring-offset-2"
                )}
                style={{ backgroundColor: color.value }}
                onClick={() => {
                  editor.chain().focus().setColor(color.value).run();
                }}
                title={color.name}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Type className="h-4 w-4" />
            <span className="text-sm">{currentFontSize}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2 mt-3">
          <div className="flex flex-col gap-2">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                className={cn(
                  "px-2 py-1 text-left rounded text-sm",
                  currentFontSize === size.value && "bg-accent"
                )}
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .setMark("textStyle", { fontSize: size.value })
                    .run();
                }}
              >
                {size.name}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
