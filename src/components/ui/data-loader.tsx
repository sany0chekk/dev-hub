import { Loader } from "lucide-react";
import { ReactNode } from "react";

export default function DataLoader({ children }: { children: ReactNode }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 items-center justify-center text-semibold text-lg">
      <Loader className="animate-spin" />
      {children}
    </div>
  );
}
