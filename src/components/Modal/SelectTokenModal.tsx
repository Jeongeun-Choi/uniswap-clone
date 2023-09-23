import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import BaseModal from "../../common/Modal/BaseModal";
import SearchInput from "../Input/SearchInput";
import { blockChains } from "../../common/data";
import { MouseEvent, useCallback } from "react";
import { Token } from "../Section/SwapSection";
import { SwapTokenType } from "../../pages/SwapPage";

interface SelectTokenModalProps {
  title?: string;
  hasCloseBtn?: boolean;
  type: SwapTokenType;
  onSelectToken: (token: Token, type: string) => void;
  onCloseModal: () => void;
}

function SelectTokenModal({
  title,
  hasCloseBtn = true,
  type,
  onSelectToken,
  onCloseModal,
}: SelectTokenModalProps) {
  const handleClickToken = useCallback(
    (e: MouseEvent<HTMLLIElement>) => {
      const { id } = e.currentTarget;

      if (!id) {
        return;
      }

      const token = blockChains.find((value) => value.id === parseInt(id, 10));
      if (!token) {
        return;
      }
      onSelectToken(token, type);
      onCloseModal();
    },
    [onCloseModal, onSelectToken, type]
  );

  return (
    <BaseModal width="w-[420px]" height="h-[684px]">
      <header className="flex_between p-5">
        <div>{title}</div>
        {hasCloseBtn && <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />}
      </header>
      <main>
        <div className="pl-5 pb-5 pr-5">
          <SearchInput
            bgColor="bg-gray-100"
            customInputClassName="basic-search-token-input"
            hasLeftIcon
            placeholder="Search name or paste address"
          />
          <ul className="grid grid-cols-3 gap-2 mt-3">
            {blockChains.map((blockChain) => (
              <li
                key={blockChain.id}
                id={blockChain.id.toString()}
                className="py-[5px] pl-1.5 pr-3 rounded-[18px] basic_border border-gray-300 hover:bg-gray-100 cursor-pointer"
                onClick={handleClickToken}
              >
                {blockChain.currencyUnit}
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <ul>
          {blockChains.map((blockChain) => (
            <li
              key={blockChain.id}
              id={blockChain.id.toString()}
              className="px-5 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={handleClickToken}
            >
              <div>{blockChain.name}</div>
              <div className="text-xs text-gray-500">
                {blockChain.currencyUnit}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </BaseModal>
  );
}

export default SelectTokenModal;
