import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { CommonButton } from "../common/Button";
import { blockChains } from "../common/data";
import SwapSection, { Token } from "../components/Section/SwapSection";

export const tokenStandard: { [key: string]: number } = {
  ETH: 1000,
  WBTC: 10000,
  USDC: 1,
};

const baseSwapToken = {
  pay: { ...blockChains[0], value: "" },
  receive: null,
};

export type SwapTokenType = "pay" | "receive";

interface SwapToken {
  pay: Token | null;
  receive: Token | null;
}

function SwapPage() {
  const [swapToken, setSwapToken] = useState<SwapToken>(baseSwapToken);
  const standardValues = useMemo(() => {
    const payStandard = tokenStandard[swapToken.pay?.currencyUnit || -1] || 0;
    const receiveStandard =
      tokenStandard[swapToken.receive?.currencyUnit || -1];

    return [payStandard, receiveStandard];
  }, [swapToken.pay?.currencyUnit, swapToken.receive?.currencyUnit]);

  const checkIsFloat = useCallback((value: string) => {
    const floatReg = new RegExp(/^[0-9]?.{0,1}[0-9]*$/);
    if (floatReg.test(value)) {
      return true;
    }

    return false;
  }, []);

  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const element = e.target;
      const {
        value,
        dataset: { type },
      } = element;

      if (!type || !checkIsFloat(value)) {
        return;
      }
      let newSwapToken = {
        ...swapToken,
        [type]: { ...swapToken[type as SwapTokenType], value },
      };

      // pay, receive 둘 다 null이 아닐 경우에는 onChange 될 때마다 swap해준다.
      if (swapToken.pay && swapToken.receive) {
        const [payStandard, receiveStandard] = standardValues;
        const ratio =
          type === "pay"
            ? payStandard / receiveStandard
            : receiveStandard / payStandard;

        const newValue = ratio * parseFloat(value);
        const otherTokenType = type === "pay" ? "receive" : "pay";

        newSwapToken = {
          ...newSwapToken,
          [otherTokenType]: { ...swapToken[otherTokenType], value: newValue },
        };
      }

      setSwapToken(newSwapToken);
    },
    [standardValues, swapToken, checkIsFloat]
  );

  const handleSwapToken = useCallback(() => {
    setSwapToken((prev) => ({ pay: prev.receive, receive: prev.pay }));
  }, []);

  const handleSelectToken = useCallback(
    (token: Token, type: SwapTokenType) => {
      // pay와 receive가 같은 토큰을 선택하면 둘의 위치를 바꿔준다...
      switch (type) {
        case "pay": {
          if (swapToken.receive?.id === token.id) {
            setSwapToken({ pay: swapToken.receive, receive: swapToken.pay });
            return;
          }
          break;
        }
        case "receive": {
          if (swapToken.pay?.id === token.id) {
            setSwapToken({ pay: swapToken.receive, receive: swapToken.pay });
            return;
          }
          break;
        }
        default:
          break;
      }

      const otherTokenType: SwapTokenType = type === "pay" ? "receive" : "pay";
      const selectedToken = swapToken[type as SwapTokenType];
      const otherToken = swapToken[otherTokenType];

      // pay의 value가 있고 receive의 value가 없을 때 => pay * ratio를 해줘야함... ratio부터 달라질듯
      if (!selectedToken?.value) {
        const selectedTokenStandard = tokenStandard[token.currencyUnit];
        const otherTokenStandard =
          tokenStandard[otherToken?.currencyUnit || -1];
        const ratio = otherTokenStandard / selectedTokenStandard;
        const newValue = ratio * parseFloat(otherToken?.value || "0");

        let newSwapToken = {
          ...swapToken,
          [type]: {
            ...token,
            value: isNaN(newValue) ? "" : newValue.toString(),
          },
        };
        setSwapToken(newSwapToken);
        return;
      }

      let newSwapToken = {
        ...swapToken,
      };

      switch (type) {
        case "pay": {
          const payStandard = tokenStandard[token.currencyUnit];
          const receiveStandard =
            tokenStandard[swapToken.receive?.currencyUnit || -1];

          const ratio = payStandard / receiveStandard;
          const newValue = ratio * parseFloat(swapToken.pay?.value || "0");
          const newPayToken = { ...(swapToken.pay as Token), ...token };
          const newReceiveToken = {
            ...(swapToken.receive as Token),
            value: newValue.toString(),
          };
          newSwapToken = {
            pay: newPayToken,
            receive: newReceiveToken,
          };
          break;
        }
        case "receive": {
          const payStandard = tokenStandard[swapToken.pay?.currencyUnit || -1];
          const receiveStandard = tokenStandard[token.currencyUnit];

          const ratio = payStandard / receiveStandard;
          const newValue = ratio * parseFloat(swapToken.pay?.value || "0");
          const newPayToken = swapToken.pay;
          const newReceiveToken = {
            ...token,
            value: newValue.toString(),
          };
          newSwapToken = {
            pay: newPayToken,
            receive: newReceiveToken,
          };
        }
      }
      setSwapToken(newSwapToken);
    },
    [swapToken]
  );

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[480px] px-2 pt-16">
          <main className="rounded-[24px] border-gray-150 basic_border px-2 pt-3 pb-2 shadow-custom">
            <header className="flex_between mb-2.5 items-center">
              <nav className="flex_between px-3 gap-4">
                <div className="text-[#222222] font-medium">Swap</div>
                <div className="text-gray-700 font-medium">Buy</div>
              </nav>
              <div className="px-3 py-1.5">
                <FontAwesomeIcon
                  icon={faGear}
                  className="text-gray-700 w-5 h-5 hover:text-gray-400"
                />
              </div>
            </header>
            <article>
              <SwapSection
                title="You pay"
                inputValue={swapToken.pay?.value || ""}
                tokenInfo={swapToken.pay}
                type="pay"
                onChangeInput={handleChangeValue}
                onSelectToken={handleSelectToken}
              />
              <div
                className="flex justify-center items-center border-solid border-4 border-white bg-gray-100 w-[40px] h-[40px] rounded-xl relative z-[2] mx-auto my-[-18px] cursor-pointer"
                onClick={handleSwapToken}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </div>
              <SwapSection
                title="You receive"
                inputValue={swapToken.receive?.value || ""}
                tokenInfo={swapToken.receive}
                type="receive"
                onChangeInput={handleChangeValue}
                onSelectToken={handleSelectToken}
              />
            </article>
            <CommonButton customClassName="connect_button text-xl w-full p-4 rounded-2xl mt-1">
              Connect Wallet
            </CommonButton>
          </main>
        </div>
      </div>
    </>
  );
}

export default SwapPage;
