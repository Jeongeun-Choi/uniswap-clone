import { MouseEvent, useCallback } from "react";
import BaseModal from "../../common/Modal/BaseModal";
import SearchInput from "../Input/SearchInput";
import { blockChains } from "../../common/data";
import { SwapTokenType, Token } from "../../common/types";

interface SelectTokenModalProps {
  title?: string;
  hasCloseBtn?: boolean;
  type: SwapTokenType;
  onSelectToken: (token: Token, type: SwapTokenType) => void;
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
      e.stopPropagation();
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
    <BaseModal
      width="w-[420px]"
      height="h-[684px]"
      title={title}
      hasCloseBtn={hasCloseBtn}
      onCloseModal={onCloseModal}
    >
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
