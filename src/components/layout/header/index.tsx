import Link from "next/link";

import Container from "../container";
import Nav from "./nav";
import UserHeader from "./user-header";

export default function Header() {
  return (
    <header className="py-4">
      <Container className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          DevHub
        </Link>
        <Nav />
        <UserHeader />
      </Container>
    </header>
  );
}
