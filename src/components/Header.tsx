import type { ReactElement } from 'react';

function Header(): ReactElement<HTMLElement> {
  return (
    <header>
      <h1 className="text-center text-6xl font-bold text-red-500">
        Hello world!
      </h1>
      <h2>World</h2>
    </header>
  );
}

export default Header;
