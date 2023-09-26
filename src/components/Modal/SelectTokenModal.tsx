import { MouseEvent, useCallback } from "react";
import BaseModal from "../../common/Modal/BaseModal";
import SearchInput from "../Input/SearchInput";
import { SwapTokenType, Token } from "../../common/types";
import { tokenList } from "../../common/data";

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

      const token = tokenList.find((value) => value.id === parseInt(id, 10));
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
        <div className="px-5">
          <SearchInput
            bgColor="bg-gray-100"
            hasLeftIcon
            placeholder="Search name or paste address"
            className="px-4 py-3 basic_border rounded-[12px]"
          />
          <ul className="flex flex-wrap my-3">
            {tokenList.map((token) => (
              <li
                key={token.id}
                id={token.id.toString()}
                className="flex w-fit m-1 py-[5px] pl-1.5 pr-3 rounded-[18px] basic_border border-gray-300 hover:bg-gray-100 cursor-pointer"
                onClick={handleClickToken}
              >
                <div className="mr-2">
                  {token.Icon({ width: 24, height: 24 })}
                </div>
                <div>{token.currencyUnit}</div>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <ul>
          {tokenList.map((token) => (
            <li
              key={token.id}
              id={token.id.toString()}
              className="flex px-5 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={handleClickToken}
            >
              <div className="mr-3">
                {token.Icon({ width: 36, height: 36 })}
              </div>
              <div>
                <div>{token.name}</div>
                <div className="text-xs text-gray-500">
                  {token.currencyUnit}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </BaseModal>
  );
}

export default SelectTokenModal;
