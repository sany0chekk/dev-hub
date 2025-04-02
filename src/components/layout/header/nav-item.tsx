import Link from "next/link";

export default function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm font-semibold transition-opacity hover:opacity-70"
      >
        {children}
      </Link>
    </li>
  );
}
