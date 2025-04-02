import { LucideIcon } from "lucide-react";

interface FormatButtonProps {
  onClick: () => void;
  isActive: boolean;
  icon: LucideIcon;
  title: string;
}

export default function FormatButton({
  onClick,
  isActive,
  icon: Icon,
  title,
}: FormatButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
        isActive ? "bg-gray-100 dark:bg-gray-800" : ""
      }`}
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
