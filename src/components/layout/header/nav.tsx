import NavItem from "./nav-item";

export default function Nav() {
  return (
    <nav>
      <ul className="flex items-center gap-6">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/">Blog</NavItem>
        <NavItem href="/">Contact</NavItem>
      </ul>
    </nav>
  );
}
