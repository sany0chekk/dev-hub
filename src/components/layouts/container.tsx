import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  classNames?: string;
}

export default function Container({ children, classNames = "" }: Props) {
  return (
    <div
      className={cn(
        "px-4 mx-auto max-w-sm md:max-w-md lg:max-w-7xl",
        classNames
      )}
    >
      {children}
    </div>
  );
}
