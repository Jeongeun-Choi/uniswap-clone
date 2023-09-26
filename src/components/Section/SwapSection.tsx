import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { CommonButton } from "../../common/Button";
import BaseInput from "../../common/Input/BaseInput";
import { SelectTokenModal } from "../Modal";
import { defaultCurrencyUnit, tokenStandard } from "../../constants/constants";
import { useToggle } from "../../hooks";
import { SwapSectionProps } from "./types";

const selectedButtonStyle =
  "flex items-center ml-3 py-1 pl-1 pr-2 rounded-[18px] text-black text-xl basic_border border-gray-200 bg-white hover:bg-gray-100 cursor-pointer shadow-[0px_0px_10px_0px_rgba(34,34,34,0.04)]";
const unSelectedButtonStlye =
  "select_button flex items-center pl-2 pr-1.5 py-1.5 rounded-2xl ml-3 text-xl";

function SwapSection({
  title,
  inputValue,
  tokenInfo,
  type,
  onChangeInput,
  onSelectToken,
}: SwapSectionProps) {
  const { toggle, changeToggle } = useToggle(false);

  const commonButtonStyle = useMemo(
    () =>
      tokenInfo?.currencyUnit ? selectedButtonStyle : unSelectedButtonStlye,
    [tokenInfo?.currencyUnit]
  );

  const ArrowDownIcon = useMemo(
    () => (
      <FontAwesomeIcon
        icon={faChevronDown}
        className="ml-1 w-[16px] h-[14px]"
      />
    ),
    []
  );
  const selectedToken = useMemo(() => {
    return tokenInfo?.currencyUnit ? (
      <div className="flex items-center gap-1">
        <div>{tokenInfo?.Icon?.({ width: 24, height: 24 })}</div>
        <div>{tokenInfo?.currencyUnit}</div>
      </div>
    ) : (
      <div>Select token</div>
    );
  }, [tokenInfo?.Icon, tokenInfo?.currencyUnit]);

  const dollar = useMemo(
    () =>
      tokenStandard[tokenInfo?.currencyUnit || defaultCurrencyUnit] *
      parseFloat(tokenInfo?.value || "0"),
    [tokenInfo?.currencyUnit, tokenInfo?.value]
  );

  return (
    <>
      <section className="flex_direction_col rounded-2xl basic_border border-gray-100 bg-gray-100 text-gray-700 p-4 h-[120px]">
        <span className="text-sm">{title}</span>
        <div className="flex_between">
          <BaseInput
            data-type={type}
            className="flex grow w-0 bg-gray-100 text-4xl text-gray-900 outline-0"
            placeholder="0"
            value={inputValue}
            onChange={onChangeInput}
          />
          <CommonButton
            className={commonButtonStyle}
            leftIcon={ArrowDownIcon}
            onClick={changeToggle}
          >
            {selectedToken}
          </CommonButton>
        </div>
        {parseFloat(tokenInfo?.value || "") > 0 && <span>${dollar}</span>}
      </section>
      {toggle && (
        <SelectTokenModal
          title="Select a Token"
          type={type}
          selectedToken={tokenInfo}
          onSelectToken={onSelectToken}
          onCloseModal={changeToggle}
        />
      )}
    </>
  );
}

export default SwapSection;
