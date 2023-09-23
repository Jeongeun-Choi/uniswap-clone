import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { CommonButton } from "../../common/Button";
import BaseInput from "../../common/Input/BaseInput";
import SelectTokenModal from "../Modal/SelectTokenModal";
import { SwapTokenType, tokenStandard } from "../../pages/SwapPage";

export interface Token {
  id: number;
  name: string;
  currencyUnit: string;
  value?: string;
}

interface SwapSectionProps {
  title: string;
  inputValue: string;
  tokenInfo: Token | null;
  type: SwapTokenType;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectToken: (token: Token, type: SwapTokenType) => void;
}

function SwapSection({
  title,
  inputValue,
  tokenInfo,
  type,
  onChangeInput,
  onSelectToken,
}: SwapSectionProps) {
  const [toggle, setToggle] = useState<boolean>(false);
  const dollar = useMemo(
    () =>
      tokenStandard[tokenInfo?.currencyUnit || -1] *
      parseFloat(tokenInfo?.value || "0"),
    [tokenInfo?.currencyUnit, tokenInfo?.value]
  );

  const handleToggle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  return (
    <>
      <section className="flex_direction_col rounded-2xl basic_border border-gray-100 bg-gray-100 text-gray-700 p-4">
        <span className="text-sm">{title}</span>
        <div className="flex_between">
          <BaseInput
            data-type={type}
            customInputStyle="flex grow w-0 bg-gray-100 text-4xl text-gray-900 outline-0"
            placeholder="0"
            value={inputValue}
            onChange={onChangeInput}
          />
          <CommonButton
            customClassName={
              tokenInfo?.currencyUnit
                ? "py-1 pl-1 pr-2 rounded-[18px] text-black text-xl basic_border border-gray-200 bg-white hover:bg-gray-100 cursor-pointer shadow-[0px_0px_10px_0px_rgba(34,34,34,0.04)]"
                : "select_button px-2 py-1.5 rounded-2xl"
            }
            leftIcon={<FontAwesomeIcon icon={faChevronDown} className="ml-1" />}
            onClick={handleToggle}
          >
            {tokenInfo?.currencyUnit || "Select token"}
          </CommonButton>
        </div>
        {tokenInfo?.value && <span>${dollar}</span>}
      </section>
      {toggle && (
        <SelectTokenModal
          title="Select a Token"
          type={type}
          onSelectToken={onSelectToken}
          onCloseModal={handleToggle}
        />
      )}
    </>
  );
}

export default SwapSection;
