import { ChangeEvent } from "react";
import { SwapTokenType, Token } from "../../common/types";

export interface SwapSectionProps {
  title: string;
  inputValue: string;
  tokenInfo: Token | null;
  type: SwapTokenType;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectToken: (token: Token, type: SwapTokenType) => void;
}
