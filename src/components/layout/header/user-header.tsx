"use client";

import { useAuth } from "@/hooks/useAuth";

import { ThemeToggler } from "@/components/ui/theme-toggler";
import UserMenu from "./user-menu";
import UserAuth from "./user-auth";

export default function UserHeader() {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-4">
      {user ? <UserMenu /> : <UserAuth />}

      <ThemeToggler />
    </div>
  );
}
