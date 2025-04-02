"use client";

import { LogIn, LogOut } from "lucide-react";
import Image from "next/image";

import { ThemeToggler } from "@/components/ui/theme-toggler";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function UserHeader() {
  const { user, signInWithGoogle, signOut } = useAuth();

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <Button onClick={signOut}>
            Log Out <LogOut />
          </Button>
        </>
      ) : (
        <>
          <ThemeToggler />
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Login <LogIn />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                  Login to your account to access all features and connect with
                  other developers.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Button onClick={signInWithGoogle}>
                  <Image
                    src="/images/google.png"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  Login with Google
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
