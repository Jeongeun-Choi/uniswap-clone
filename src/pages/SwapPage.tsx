import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { CommonButton } from "../common/Button";
import { tokenList } from "../common/data";
import { SwapSection } from "../components/Section";
import { defaultCurrencyUnit, tokenStandard } from "../constants/constants";
import { SwapToken, SwapTokenType, Token } from "../common/types";
import translateThousandsComma from "../utils/translateThousandsComma";
import { calculateExchangeFloat } from "../utils/calculateCurrencyExchangeFloat";

const baseSwapToken = {
  pay: { ...tokenList[0] },
  receive: null,
};

const baseSwapTokenValue = {
  pay: "",
  receive: "",
};

interface SwapTokenValue {
  pay: string;
  receive: string;
}
function SwapPage() {
  const [swapToken, setSwapToken] = useState<SwapToken>(baseSwapToken);
  const [swapTokenValue, setSwapTokenValue] =
    useState<SwapTokenValue>(baseSwapTokenValue);

  const calculateCurrencyExchangeRate = useCallback(
    ({
      isPayType = true,
      currentCurrencyUnit = swapToken.pay?.currencyUnit,
      otherCurrencyUnit = swapToken.receive?.currencyUnit,
    }) => {
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

  const hasValueSelectedAllSwapToken = useMemo(
    () => !!swapTokenValue.pay && !!swapTokenValue.receive,
    [swapTokenValue.pay, swapTokenValue.receive]
  );
  const baseReceiveTokenValue = useMemo(() => {
    return translateThousandsComma({
      value:
        tokenStandard[swapToken.receive?.currencyUnit || defaultCurrencyUnit],
    });
  }, [swapToken.receive?.currencyUnit]);

  const tradePrice = useMemo(
    () =>
      `1 ${swapToken.receive?.currencyUnit} = ${calculateCurrencyExchangeRate({
        isPayType: false,
      })} ${swapToken.pay?.currencyUnit}`,
    [
      calculateCurrencyExchangeRate,
      swapToken.pay?.currencyUnit,
      swapToken.receive?.currencyUnit,
    ]
  );

  const checkIsFloat = useCallback((value: string) => {
    const floatReg = new RegExp(/^[0-9]+.{0,1}[0-9^\d]*$/);
    if (floatReg.test(value) || value === "") {
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
      const otherTokenType = isPayType ? "receive" : "pay";
      const currentFocusToken = swapToken[type as SwapTokenType];
      const otherToken = swapToken[otherTokenType];
      const currentFocusTokenValue = swapTokenValue[type as SwapTokenType];
      const otherTokenValue = swapTokenValue[otherTokenType];
      const hasFocusValueAndhasNotOtherToken =
        currentFocusToken?.id && !otherToken;
      const hasNotFocusTokenAndhasOtherToken =
        !currentFocusToken && otherToken?.id;

      if (!currentFocusTokenValue && otherTokenValue) {
        const newSwapTokenValue = {
          ...swapTokenValue,
          [type]: value,
          [otherTokenType]: "",
        };
        setSwapTokenValue(newSwapTokenValue);
        return;
      }
      if (
        hasFocusValueAndhasNotOtherToken ||
        hasNotFocusTokenAndhasOtherToken
      ) {
        const newSwapTokenValue = {
          ...swapTokenValue,
          [type]: value,
        };
        setSwapTokenValue(newSwapTokenValue);
        return;
      }

      const currencyExchangeRate = calculateCurrencyExchangeRate({
        isPayType,
      });

      const newValue =
        calculateExchangeFloat(currencyExchangeRate, value) || "";
      let newSwapTokenValue = {
        ...swapTokenValue,
        [type]: value,
        [otherTokenType]: newValue.toString(),
      };

      setSwapTokenValue(newSwapTokenValue);
    },
    [checkIsFloat, swapToken, swapTokenValue, calculateCurrencyExchangeRate]
  );

  const handleSwapToken = useCallback(() => {
    setSwapToken((prev) => ({ pay: prev.receive, receive: prev.pay }));
    setSwapTokenValue((prev) => ({ pay: prev.receive, receive: prev.pay }));
  }, []);

  const handleSelectToken = useCallback(
    (token: Token, type: SwapTokenType) => {
      const isPayType = type === "pay";
      const otherTokenType = isPayType ? "receive" : "pay";
      const selectedToken = token;
      const otherToken = swapToken[otherTokenType];
      const selectedTokenValue = swapTokenValue[type];
      const otherTokenValue = swapTokenValue[otherTokenType];
      const hasNotSelectedTokenAndHasOtherTokenValue =
        !selectedTokenValue && otherTokenValue;
      const hasAllSelectedToken = swapToken[type] && otherToken;
      let newSwapToken = {
        ...swapToken,
        [type]: {
          ...selectedToken,
        },
      };

      const selectedTokenCurrencyExchangeRate = calculateCurrencyExchangeRate({
        isPayType,
        currentCurrencyUnit: selectedToken?.currencyUnit,
        otherCurrencyUnit: otherToken?.currencyUnit,
      });
      const otherTokencurrencyExchangeRate = calculateCurrencyExchangeRate({
        isPayType,
        currentCurrencyUnit: otherToken?.currencyUnit,
        otherCurrencyUnit: selectedToken?.currencyUnit,
      });

      switch (type) {
        case "pay": {
          if (swapToken.receive?.id === token.id) {
            setSwapToken({ pay: swapToken.receive, receive: swapToken.pay });
            setSwapTokenValue({
              pay: swapTokenValue.receive,
              receive: swapTokenValue.pay,
            });
            return;
          }
          const hasSelectedPayToken = !!swapToken[type];
          if (!hasSelectedPayToken) {
            if (selectedTokenValue) {
              const newValue = calculateExchangeFloat(
                selectedTokenCurrencyExchangeRate,
                selectedTokenValue
              );
              const newSwapTokenValue = {
                ...swapTokenValue,
                [otherTokenType]: newValue.toString(),
              };
              setSwapTokenValue(newSwapTokenValue);
            }
            if (hasNotSelectedTokenAndHasOtherTokenValue) {
              const newValue = calculateExchangeFloat(
                otherTokencurrencyExchangeRate,
                otherTokenValue
              );
              const newSwapTokenValue = {
                ...swapTokenValue,
                [type]: newValue.toString(),
              };
              setSwapTokenValue(newSwapTokenValue);
            }
            setSwapToken(newSwapToken);
            return;
          }

          if (hasAllSelectedToken) {
            const newValue = calculateExchangeFloat(
              selectedTokenCurrencyExchangeRate,
              swapTokenValue.pay
            );
            let newSwapToken = {
              ...swapToken,
              pay: { ...token },
            };
            let newSwapTokenValue = {
              ...swapTokenValue,
              receive: newValue.toString() || "",
            };
            setSwapToken(newSwapToken);
            setSwapTokenValue(newSwapTokenValue);
          }
          break;
        }
        case "receive": {
          if (swapToken.pay?.id === token.id) {
            setSwapToken({ pay: swapToken.receive, receive: swapToken.pay });
            setSwapTokenValue({
              pay: swapTokenValue.receive,
              receive: swapTokenValue.pay,
            });
            return;
          }
          const hasSelectedReceiveToken = !!swapToken[type] && !isPayType;
          if (!hasSelectedReceiveToken) {
            if (selectedTokenValue) {
              const newValue = calculateExchangeFloat(
                otherTokencurrencyExchangeRate,
                selectedTokenValue
              );
              const newSwapTokenValue = {
                ...swapTokenValue,
                [otherTokenType]: newValue.toString(),
              };
              setSwapTokenValue(newSwapTokenValue);
            }

            if (hasNotSelectedTokenAndHasOtherTokenValue) {
              const newValue = calculateExchangeFloat(
                selectedTokenCurrencyExchangeRate,
                otherTokenValue
              );
              const newSwapTokenValue = {
                ...swapTokenValue,
                [type]: newValue.toString(),
              };
              setSwapTokenValue(newSwapTokenValue);
            }

            setSwapToken(newSwapToken);
            return;
          }

          if (hasAllSelectedToken) {
            const newValue = calculateExchangeFloat(
              otherTokencurrencyExchangeRate,
              swapTokenValue.pay
            );
            let newSwapToken = {
              ...swapToken,
              receive: { ...token },
            };
            let newSwapTokenValue = {
              ...swapTokenValue,
              receive: newValue.toString() || "",
            };
            setSwapToken(newSwapToken);
            setSwapTokenValue(newSwapTokenValue);
          }
          break;
        }
        default:
          break;
      }
    },
    [calculateCurrencyExchangeRate, swapToken, swapTokenValue]
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
                  className="text-gray-700 w-5 h-5 hover:text-gray-400 cursor-pointer"
                />
              </div>
            </header>
            <article>
              <SwapSection
                title="You pay"
                inputValue={swapTokenValue.pay}
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
                inputValue={swapTokenValue.receive}
                tokenInfo={swapToken.receive}
                type="receive"
                onChangeInput={handleChangeValue}
                onSelectToken={handleSelectToken}
              />
            </article>
            {hasValueSelectedAllSwapToken && (
              <div className=" basic_border border-gray-150 rounded-2xl px-4 py-3 mt-1 text-sm">
                <span className="text-sm">{tradePrice}</span>{" "}
                <span className="text-gray-700">
                  $({baseReceiveTokenValue})
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
