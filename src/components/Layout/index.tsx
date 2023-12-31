import { PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { CommonButton, LinkButton } from "../../common/Button";
import { SearchInput } from "../Input";
import { IconEthLogo, IconUniswapLogo } from "../../common/Icons";
import { navItems } from "../../constants/constants";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <header>
        <nav className="grid grid-cols-layout px-3 py-5">
          <div className="flex items-center">
            <IconUniswapLogo width={48} height={48} />
            <ul className="flex">
              {navItems.map((nav) => (
                <li key={nav.title}>
                  <LinkButton
                    className={`px-3 py-2 font-medium ${
                      (nav.link === window.location.pathname &&
                        "text-gray-900") ||
                      ""
                    }`}
                  >
                    {nav.title}
                  </LinkButton>
                </li>
              ))}
              <li>
                <LinkButton className="px-3 py-2">
                  <FontAwesomeIcon icon={faEllipsis} />
                </LinkButton>
              </li>
            </ul>
          </div>
          <SearchInput
            hasLeftIcon
            placeholder="Search tokens and NFT collections"
            bgColor="bg-white"
            borderColor="border-gray-200"
            width="w-[480px]"
            className="px-4 py-3 basic_border rounded-2xl"
          />
          <div className="justify-self-end flex">
            <div className="flex items-center gap-2 mr-3 hover:bg-gray-100 rounded-2xl px-1.5 py-px cursor-pointer rounded-[20px]">
              <IconEthLogo />
              <CommonButton
                rightIcon={
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className="text-gray-700"
                  />
                }
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
