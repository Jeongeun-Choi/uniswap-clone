import { SelectTokenProps } from "../../common/types";

function TokenBadge({ token, isSelected, onClickToken }: SelectTokenProps) {
  const style = isSelected ? "bg-gray-200 pointer-events-none" : "";

  return (
    <li
      key={token.id}
      id={token.id.toString()}
      className={`${style} flex w-fit m-1 py-[5px] pl-1.5 pr-3 rounded-[18px] basic_border border-gray-300 hover:bg-gray-100 cursor-pointer`}
      onClick={onClickToken}
    >
      <div className="mr-2">{token.Icon?.({ width: 24, height: 24 })}</div>
      <div>{token.currencyUnit}</div>
    </li>
  );
}

export default TokenBadge;
