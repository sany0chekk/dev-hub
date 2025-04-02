"use client";

import { Loader2 } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

import Logo from "@/components/ui/logo";

export default function PageLoader() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="fixed w-full h-full flex flex-col gap-4 justify-center items-center bg-background z-50">
        <Logo />
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }
}
