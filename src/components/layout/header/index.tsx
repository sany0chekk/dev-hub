import Container from "../container";
import UserHeader from "./user-header";
import Logo from "@/components/ui/logo";

export default function Header() {
  return (
    <header className="py-4">
      <Container className="flex justify-between items-center">
        <Logo />
        <UserHeader />
      </Container>
    </header>
  );
}
