export type CurrencyUnit = "ETH" | "WBTC" | "USDC";

export interface Token {
  id: number;
  name: string;
  currencyUnit: CurrencyUnit;
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
