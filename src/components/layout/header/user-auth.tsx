"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { LogIn } from "lucide-react";
import Image from "next/image";

export default function UserAuth() {
  const { signInWithGoogle } = useAuth();

  return (
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
            Login to your account to access all features and connect with other
            developers.
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
  );
}
