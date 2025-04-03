"use client";

import Container from "@/components/layout/container";
import Editor from "@/components/editor";

export default function EditorPage() {
  return (
    <section className="py-10 h-[calc(100vh-160px)]">
      <Container className="h-full flex flex-col">
        <h1 className="text-2xl font-bold mb-2">Editor</h1>
        <Editor />
      </Container>
    </section>
  );
}
