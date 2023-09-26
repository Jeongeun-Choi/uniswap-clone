import { MouseEvent, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import BaseModal from "../../common/Modal/BaseModal";
import SearchInput from "../Input/SearchInput";
import { SwapTokenType, Token } from "../../common/types";
import { tokenList } from "../../common/data";

interface SelectTokenModalProps {
  title?: string;
  hasCloseBtn?: boolean;
  type: SwapTokenType;
  selectedToken: Token | null;
  onSelectToken: (token: Token, type: SwapTokenType) => void;
  onCloseModal: () => void;
}

function SelectTokenModal({
  title,
  hasCloseBtn = true,
  type,
  selectedToken,
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
                className={`${
                  selectedToken?.id === token.id && "bg-gray-200"
                } flex w-fit m-1 py-[5px] pl-1.5 pr-3 rounded-[18px] basic_border border-gray-300 hover:bg-gray-100 cursor-pointer`}
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
              className={`${
                selectedToken?.id === token.id &&
                "opacity-60 pointer-events-none"
              } grid grid-cols-list gap-4 px-5 py-2 hover:bg-gray-100 cursor-pointer`}
              onClick={handleClickToken}
            >
              <div>{token.Icon({ width: 36, height: 36 })}</div>
              <div className="w-max">
                <div>{token.name}</div>
                <div className="text-xs text-gray-500">
                  {token.currencyUnit}
                </div>
              </div>
              <div></div>
              {selectedToken?.id === token.id && (
                <div className="flex justify-end items-center text-pink-900">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </BaseModal>
  );
}

export default SelectTokenModal;
