import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Token } from "../../common/types";
import { MouseEvent } from "react";

interface TokenItemProps {
  token: Token;
  isSelected: boolean;
  onClickToken: (e: MouseEvent<HTMLLIElement>) => void;
}

function TokenItem({ token, isSelected, onClickToken }: TokenItemProps) {
  return (
    <li
      key={token.id}
      id={token.id.toString()}
      className={`${
        isSelected && "opacity-60 pointer-events-none"
      } grid grid-cols-list gap-4 px-5 py-2 hover:bg-gray-100 cursor-pointer`}
      onClick={onClickToken}
    >
      <div>{token.Icon?.({ width: 36, height: 36 })}</div>
      <div className="w-max">
        <div>{token.name}</div>
        <div className="text-xs text-gray-500">{token.currencyUnit}</div>
      </div>
      <div></div>
      {isSelected && (
        <div className="flex justify-end items-center text-pink-900">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}
    </li>
  );
}

export default TokenItem;
