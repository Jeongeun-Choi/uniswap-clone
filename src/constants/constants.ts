import { CurrencyUnit } from "../common/types";

export const tokenStandard: Readonly<{ [key in CurrencyUnit]: number }> = {
  ETH: 1000,
  WBTC: 10000,
  USDC: 1,
};

export const defaultCurrencyUnit = "ETH";
