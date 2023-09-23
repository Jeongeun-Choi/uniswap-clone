import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { CommonButton } from "../common/Button";
import SwapSection, { Token } from "../components/Section/SwapSection";
import { ChangeEvent, useCallback, useState } from "react";

export type SwapTokenType = "pay" | "receive";

interface SwapToken {
  pay: (Token & { value: "" }) | null;
  receive: (Token & { value: "" }) | null;
}

function SwapPage() {
  const [swapToken, setSwapToken] = useState<SwapToken>({
    pay: null,
    receive: null,
  });

  const handleChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    const {
      value,
      dataset: { type },
    } = element;

    if (!type) {
      return;
    }

    setSwapToken((prev) => ({
      ...prev,
      [type]: { ...prev[type as SwapTokenType], value },
    }));
  }, []);

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
                type="pay"
                onChangeInput={handleChangeValue}
              />
              <div className="flex justify-center items-center border-solid border-4 border-white bg-gray-100 w-[40px] h-[40px] rounded-xl relative z-[2] mx-auto my-[-18px]">
                <FontAwesomeIcon icon={faArrowDown} />
              </div>
              <SwapSection
                title="You receive"
                inputValue={swapToken.receive?.value || ""}
                type="receive"
                onChangeInput={handleChangeValue}
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
