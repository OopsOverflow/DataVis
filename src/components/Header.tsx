import type { ReactElement } from "react";

function Header(): ReactElement<HTMLElement> {
  return (
    <header>
      <h1>Hello</h1>
      <h2>World</h2>
    </header>
  );
}

export default Header;