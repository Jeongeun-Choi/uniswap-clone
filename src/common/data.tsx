import { IconEthLogo, IconUSDCLogo, IconWBTCLogo } from "./Icons";
import { BaseIconProps } from "./Icons/types";

export const tokenList = [
  {
    id: 1,
    name: "Ether",
    currencyUnit: "ETH",
    Icon: ({ width, height }: BaseIconProps) => (
      <IconEthLogo width={width} height={height} />
    ),
  },
  {
    id: 2,
    name: "Wrapped BTC",
    currencyUnit: "WBTC",
    Icon: ({ width, height }: BaseIconProps) => (
      <IconWBTCLogo width={width} height={height} />
    ),
  },
  {
    id: 3,
    name: "USD Coin",
    currencyUnit: "USDC",
    Icon: ({ width, height }: BaseIconProps) => (
      <IconUSDCLogo width={width} height={height} />
    ),
  },
] as const;
