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
