import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { CommonButton } from "../common/Button";
import { blockChains } from "../common/data";
import SwapSection from "../components/Section/SwapSection";
import { defaultCurrencyUnit, tokenStandard } from "../constants/constants";
import { CurrencyUnit, SwapToken, SwapTokenType, Token } from "../common/types";

const baseToken = {
  id: 0,
  name: "",
  currencyUnit: defaultCurrencyUnit as CurrencyUnit,
};

const baseSwapToken = {
  pay: { ...blockChains[0], value: "" },
  receive: null,
};

function SwapPage() {
  const [swapToken, setSwapToken] = useState<SwapToken>(baseSwapToken);
  const hasValueSelectedAllSwapToken = useMemo(
    () => swapToken.pay?.value !== "" && swapToken.receive?.value !== "",
    [swapToken.pay, swapToken.receive]
  );

  const isSelectedAllSwapToken = useMemo(
    () => (swapToken.pay && swapToken.receive ? true : false),
    [swapToken.pay, swapToken.receive]
  );

  const calculateCurrencyExchangeRate = useCallback(
    (
      isPayType = true,
      currentCurrencyUnit = swapToken.pay?.currencyUnit,
      otherCurrencyUnit = swapToken.receive?.currencyUnit
    ) => {
      const payCurrency =
        tokenStandard[currentCurrencyUnit || defaultCurrencyUnit];
      const receiveCurrency =
        tokenStandard[otherCurrencyUnit || defaultCurrencyUnit];

      const baseCurrency = isPayType ? payCurrency : receiveCurrency;
      const counterCurrency = isPayType ? receiveCurrency : payCurrency;

      const currencyExchangeRate = baseCurrency / counterCurrency;

      return currencyExchangeRate;
    },
    [swapToken.pay?.currencyUnit, swapToken.receive?.currencyUnit]
  );

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
      const isPayType = type === "pay";

      let newSwapToken = {
        ...swapToken,
        [type]: { ...swapToken[type as SwapTokenType], value },
      };

      // pay, receive 둘 다 null이 아닐 경우에는 onChange 될 때마다 환전해준다.
      if (isSelectedAllSwapToken) {
        const currencyExchangeRate = calculateCurrencyExchangeRate(isPayType);

        const newValue = currencyExchangeRate * parseFloat(value);
        const otherTokenType = isPayType ? "receive" : "pay";

        newSwapToken = {
          ...newSwapToken,
          [otherTokenType]: { ...swapToken[otherTokenType], value: newValue },
        };
      }

      setSwapToken(newSwapToken);
    },
    [
      swapToken,
      checkIsFloat,
      isSelectedAllSwapToken,
      calculateCurrencyExchangeRate,
    ]
  );

  const handleSwapToken = useCallback(() => {
    setSwapToken((prev) => ({ pay: prev.receive, receive: prev.pay }));
  }, []);

  const handleSelectToken = useCallback(
    (token: Token, type: SwapTokenType) => {
      const isPayType = type === "pay";

      // pay와 receive가 같은 토큰을 선택하면 둘의 위치를 바꿔준다.
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

      const otherTokenType = isPayType ? "receive" : "pay";
      const selectedToken = swapToken[type];
      const otherToken = swapToken[otherTokenType];

      // pay의 value가 있고 receive의 value가 없을 때 => pay * ratio를 해줘야함... ratio부터 달라질듯
      if (!selectedToken?.value) {
        const currencyExchangeRate = calculateCurrencyExchangeRate(
          isPayType,
          token.currencyUnit,
          otherToken?.currencyUnit
        );
        const newValue =
          currencyExchangeRate * parseFloat(otherToken?.value || "");

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
          const currencyExchangeRate = calculateCurrencyExchangeRate(isPayType);
          const newValue =
            currencyExchangeRate * parseFloat(swapToken.pay?.value || "0");
          const newPayToken = { ...swapToken.pay, ...token };
          const newReceiveToken = {
            ...(swapToken.receive || baseToken),
            value: newValue.toString(),
          };
          newSwapToken = {
            pay: newPayToken,
            receive: newReceiveToken,
          };
          break;
        }
        case "receive": {
          const currencyExchangeRate = calculateCurrencyExchangeRate(isPayType);
          const newValue =
            currencyExchangeRate * parseFloat(swapToken.pay?.value || "0");

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
    [calculateCurrencyExchangeRate, swapToken]
  );

  return (
    <>
      <div className="w-full grid grid-cols-layout">
        <div className="w-[480px] px-2 pt-16 col-start-2 col-end-3">
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
            {hasValueSelectedAllSwapToken && (
              <div className=" basic_border border-gray-150 rounded-2xl px-4 py-3 mt-1 text-sm">
                <span className="text-sm">
                  {1} {swapToken.receive?.currencyUnit} ={" "}
                  {calculateCurrencyExchangeRate(false)}{" "}
                  {swapToken.pay?.currencyUnit}
                </span>{" "}
                <span className="text-gray-700">
                  ($
                  {tokenStandard[
                    swapToken.receive?.currencyUnit || defaultCurrencyUnit
                  ].toLocaleString("en-US")}
                  )
                </span>
              </div>
            )}
            <CommonButton className="connect_button text-xl w-full p-4 rounded-2xl mt-1">
              Connect Wallet
            </CommonButton>
          </main>
        </div>
      </div>
    </>
  );
}

export default SwapPage;
