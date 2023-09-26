import { PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { CommonButton, LinkButton } from "../../common/Button";
import SearchInput from "../Input/SearchInput";

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
                <LinkButton className="px-3 py-2">{nav.title}</LinkButton>
              </li>
            ))}
            <li>
              <LinkButton className="px-3 py-2">
                <FontAwesomeIcon icon={faEllipsis} />
              </LinkButton>
            </li>
          </ul>
          <SearchInput
            hasLeftIcon
            placeholder="Search tokens and NFT collections"
            bgColor="bg-white"
            borderColor="border-gray-200"
            width="w-[480px]"
            className="px-3 py-2 basic_border rounded-2xl"
          />
          <div className="flex">
            <div className="flex items-center mr-3 hover:bg-gray-100 rounded-2xl px-1.5 py-[1px] cursor-pointer rounded-[20px]">
              <div>사진</div>
              <CommonButton
                rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
              />
            </div>
            <CommonButton className="connect_button px-3 py-2.5 rounded-full text-medium">
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
