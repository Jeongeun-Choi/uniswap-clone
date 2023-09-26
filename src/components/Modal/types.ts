import { BaseModalProps } from "../../common/Modal/types";
import { SwapTokenType, Token } from "../../common/types";

export interface SelectTokenModalProps extends BaseModalProps {
  type: SwapTokenType;
  selectedToken: Token | null;
  onSelectToken: (token: Token, type: SwapTokenType) => void;
}
