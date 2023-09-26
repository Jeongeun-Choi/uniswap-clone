import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from "react";
import BaseModal from "../../common/Modal/BaseModal";
import SearchInput from "../Input/SearchInput";
import { SwapTokenType, Token } from "../../common/types";
import { tokenList } from "../../common/data";
import TokenItem from "../TokenItem";
import TokenBadge from "../Badge";
import { useDebounce } from "../../hooks";
import { BaseModalProps } from "../../common/Modal/types";

interface SelectTokenModalProps extends BaseModalProps {
  type: SwapTokenType;
  selectedToken: Token | null;
  onSelectToken: (token: Token, type: SwapTokenType) => void;
}

function SelectTokenModal({
  title,
  hasCloseBtn = true,
  type,
  selectedToken,
  onSelectToken,
  onCloseModal,
}: SelectTokenModalProps) {
  const [searchText, setSearchText] = useState<string>("");
  const debounceSearchText = useDebounce(searchText, 200);

  const searchTokenList = tokenList.filter((token) =>
    token.name.toLowerCase().includes(debounceSearchText.toLowerCase())
  );
  const isEmptyTokenList = useMemo(
    () => (searchTokenList.length === 0 ? true : false),
    [searchTokenList]
  );
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
  const handleSearchToken = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

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
            onChange={handleSearchToken}
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
        <ul className={isEmptyTokenList ? "flex justify-center pt-5" : ""}>
          {isEmptyTokenList ? (
            <div>No results found.</div>
          ) : (
            searchTokenList.map((token) => (
              <TokenItem
                token={token}
                isSelected={selectedToken?.id === token.id}
                onClickToken={handleClickToken}
              />
            ))
          )}
        </ul>
      </main>
    </BaseModal>
  );
}

export default SelectTokenModal;
