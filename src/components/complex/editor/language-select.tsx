"use client";

import { Editor } from "@tiptap/core";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Language, languages } from "@/constants/languages";

interface LanguageSelectProps {
  editor: Editor;
}

export default function LanguageSelect({ editor }: LanguageSelectProps) {
  const [open, setOpen] = useState(false);

  const currentLanguage = editor.isActive("codeBlock")
    ? editor.getAttributes("codeBlock").language || "javascript"
    : "javascript";

  const setLanguage = (language: string) => {
    editor.chain().focus().updateAttributes("codeBlock", { language }).run();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between"
        >
          {
            languages.find((lang: Language) => lang.value === currentLanguage)
              ?.label
          }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0 mt-3">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language: Language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={() => setLanguage(language.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentLanguage === language.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
