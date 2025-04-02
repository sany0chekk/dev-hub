"use client";

import Container from "@/components/layout/container";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";

export default function EditorPage() {
  return (
    <section className="h-[calc(100vh-100px)]">
      <Container className="h-full flex flex-col">
        <h1 className="text-2xl font-bold mb-2">Editor</h1>
        <Editor />
        <Button className="block mt-4 ml-auto">Publish article</Button>
      </Container>
    </section>
  );
}
