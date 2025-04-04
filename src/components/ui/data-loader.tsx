import { Loader } from "lucide-react";
import { ReactNode } from "react";

export default function DataLoader({ children }: { children: ReactNode }) {
  return (
    <div className="mt-30 flex gap-2 items-center justify-center text-semibold text-lg">
      <Loader className="animate-spin" />
      {children}
    </div>
  );
}
