import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: Props) {
  return (
    <div
      className={cn(
        "px-4 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
