import type { ReactNode } from "react";

interface HeaderProps {
  title: string;
  text?: string;
  children?: ReactNode;
}

function Header({ title, text, children }: HeaderProps) {
  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p className="baslik-alt">{text}</p>}
      {children}
    </header>
  );
}

export default Header;