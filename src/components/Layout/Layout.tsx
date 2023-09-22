import { PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { CommonButton, LinkButton } from "../../common/Button";
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
              <LinkButton customClassName="px-3 py-2">
                <FontAwesomeIcon icon={faEllipsis} />
              </LinkButton>
            </li>
          </ul>
          <Input
            leftIcon={
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-gray-700 mr-1.5"
              />
            }
          />
          <div className="flex">
            <div className="text-blue-500 text-xl font-bold">드롭다운</div>
            <CommonButton customClassName="connect_button px-3 py-2.5 rounded-full text-medium">
              Connect
            </CommonButton>
          </div>
        </nav>
      </header>
      {children}
    </>
  );
}

export default Layout;
