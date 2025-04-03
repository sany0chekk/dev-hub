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
import { languages } from "@/constants/languages";

export const lowlight = createLowlight();

languages.forEach(({ value }) => {
  switch (value) {
    case "javascript":
      lowlight.register("js", js);
      break;
    case "typescript":
      lowlight.register("ts", ts);
      break;
    case "python":
      lowlight.register("python", python);
      break;
    case "html":
      lowlight.register("html", html);
      break;
    case "css":
      lowlight.register("css", css);
      break;
    case "php":
      lowlight.register("php", php);
      break;
    case "ruby":
      lowlight.register("ruby", ruby);
      break;
    case "go":
      lowlight.register("go", go);
      break;
    case "rust":
      lowlight.register("rust", rust);
      break;
  }
});
