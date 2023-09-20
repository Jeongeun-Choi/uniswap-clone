import { PropsWithChildren } from "react";
import { ConnectButton, LinkButton } from "../../common/Button";
import Input from "../Input/Input";

const navItems = [
  { title: "Swap", link: "/" },
  { title: "Tokens", link: "/" },
  { title: "NFTs", link: "/" },
  { title: "Pools", link: "/" },
];

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <header>
        <nav className="flex justify-between px-3 py-5">
          <ul className="flex">
            {navItems.map((nav) => (
              <li key={nav.title}>
                <LinkButton customClassName="px-3 py-2">{nav.title}</LinkButton>
              </li>
            ))}
            <li>
              <LinkButton customClassName="px-3 py-2">More</LinkButton>
            </li>
          </ul>
          <Input />
          <div className="flex">
            <div className="text-blue-500 text-xl font-bold">드롭다운</div>
            <ConnectButton customClassName="px-3 py-2.5 rounded-full">
              Connect
            </ConnectButton>
          </div>
        </nav>
      </header>
      {children}
    </>
  );
}

export default Layout;
