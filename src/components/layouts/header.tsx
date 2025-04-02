import Link from "next/link";
import Container from "./container";
import { ThemeToggler } from "../ui/theme-toggler";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="py-4">
      <Container classNames="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          DevHub
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/"
                className="text-sm font-semibold transition-opacity hover:opacity-70"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-sm font-semibold transition-opacity hover:opacity-70"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-sm font-semibold transition-opacity hover:opacity-70"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggler />
          <Button>Login</Button>
        </div>
      </Container>
    </header>
  );
}
