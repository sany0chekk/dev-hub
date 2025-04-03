import NavItem from "./nav-item";

export default function Nav() {
  return (
    <nav className="hidden md:flex">
      <ul className="flex items-center gap-6">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/blog">Blog</NavItem>
      </ul>
    </nav>
  );
}
