"use client";

import { BookOpen, LogOut, Plus, User, UserPen } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

export default function UserMenu() {
  const { user, signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center transition-opacity hover:opacity-60 focus:opacity-60 cursor-pointer">
          <User className="text-background" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <p className="font-bold text-sm">{user?.displayName}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="font-medium">
            <UserPen />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/articles" className="font-medium">
            <BookOpen />
            Your articles
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mb-2" />
        <DropdownMenuItem asChild>
          <Button
            variant="outline"
            className="w-full font-500 gap-1 mb-2"
            asChild
          >
            <Link href="/editor">
              Add article
              <Plus className="text-foreground" />
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button onClick={signOut} className="w-full font-500">
            Logout
            <LogOut className="text-background" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
