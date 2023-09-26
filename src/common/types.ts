import { MouseEvent } from "react";
import { BaseIconProps } from "./Icons/types";

export type CurrencyUnit = "ETH" | "WBTC" | "USDC";

export interface Token {
  id: number;
  name: string;
  currencyUnit: CurrencyUnit;
  Icon?: ({ width, height }: BaseIconProps) => JSX.Element;
  value?: string;
}

export interface SwapToken {
  pay: Token | null;
  receive: Token | null;
}

const swapTokenType = {
  pay: "pay",
  receive: "receive",
} as const;

export type SwapTokenType = (typeof swapTokenType)[keyof typeof swapTokenType];

/**
 * TokenBadge, TokenItem Props에서 사용하는 공통 타입.
 */
export interface SelectTokenProps {
  token: Token;
  isSelected: boolean;
  onClickToken: (e: MouseEvent<HTMLLIElement>) => void;
}
