import { FolderCode } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="text-2xl font-bold flex items-center gap-2">
      <FolderCode className="text-blue-300" />
      DevHub
    </Link>
  );
}
