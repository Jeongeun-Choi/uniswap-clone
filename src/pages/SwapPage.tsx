import { CommonButton } from "../common/Button";

function SwapPage() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[480px] px-2 pt-16">
        <main className="rounded-[24px] border-gray-150 border-solid border px-2 pt-3 pb-2 shadow-custom">
          <header className="flex justify-between mb-2.5">
            <nav className="flex justify-between px-3 gap-4">
              <div className="text-[#222222] font-medium">Swap</div>
              <div className="text-gray-700 font-medium">Buy</div>
            </nav>
            <div>설정</div>
          </header>
          <article>
            <section className="flex flex-col rounded-2xl border border-solid border-gray-100 bg-gray-100 text-gray-700 p-4">
              <span>You pay</span>
              <div className="flex justify-between">
                <input className="flex grow bg-gray-100" />
                <CommonButton customClassName="px-2 py-1.5 rounded-2xl">
                  Select token
                </CommonButton>
              </div>
              <span>$0</span>
            </section>
            <div className="flex items-center border-solid border-4 border-white bg-gray-100 w-[40px] h-[40px] rounded-xl relative z-[2] mx-auto my-[-18px]">
              <button>아래</button>
            </div>
            <section className="flex flex-col rounded-2xl border border-solid border-gray-100 bg-gray-100 text-gray-700 p-4">
              <span>You receive</span>
              <div className="flex justify-between">
                <input className="flex grow bg-gray-100" />
                <CommonButton customClassName="select_button px-2 py-1.5 rounded-2xl">
                  Select token
                </CommonButton>
              </div>
              <span>$0</span>
            </section>
          </article>
          <CommonButton customClassName="connect_button text-xl w-full p-4 rounded-2xl mt-1">
            Connect Wallet
          </CommonButton>
        </main>
      </div>
    </div>
  );
}

export default SwapPage;
