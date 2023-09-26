import { MouseEvent, useCallback } from "react";
import BaseModal from "../../common/Modal/BaseModal";
import SearchInput from "../Input/SearchInput";
import { SwapTokenType, Token } from "../../common/types";
import { tokenList } from "../../common/data";
import TokenItem from "../TokenItem";
import TokenBadge from "../Badge";

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
              <TokenBadge
                token={token}
                isSelected={selectedToken?.id === token.id}
                onClickToken={handleClickToken}
              />
            ))}
          </ul>
        </div>
        <hr />
        <ul>
          {tokenList.map((token) => (
            <TokenItem
              token={token}
              isSelected={selectedToken?.id === token.id}
              onClickToken={handleClickToken}
            />
          ))}
        </ul>
      </main>
    </BaseModal>
  );
}

export default SelectTokenModal;
