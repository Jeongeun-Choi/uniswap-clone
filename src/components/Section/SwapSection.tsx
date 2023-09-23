import { ChangeEvent, useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { CommonButton } from "../../common/Button";
import BaseInput from "../../common/Input/BaseInput";
import SelectTokenModal from "../Modal/SelectTokenModal";
import { SwapTokenType } from "../../pages/SwapPage";

export interface Token {
  id: number;
  name: string;
  currencyUnit: string;
}

interface SwapSectionProps {
  title: string;
  inputValue: string;
  tokenInfo?: Token;
  type: SwapTokenType;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function SwapSection({
  title,
  inputValue,
  tokenInfo,
  type,
  onChangeInput,
}: SwapSectionProps) {
  const [toggle, setToggle] = useState<boolean>(false);

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
            customClassName="select_button px-2 py-1.5 rounded-2xl"
            leftIcon={<FontAwesomeIcon icon={faChevronDown} className="ml-1" />}
            onClick={handleToggle}
          >
            {tokenInfo?.currencyUnit || "Select token"}
          </CommonButton>
        </div>
        <span>$0</span>
      </section>
      {toggle && <SelectTokenModal title="Select a Token" />}
    </>
  );
}

export default SwapSection;
