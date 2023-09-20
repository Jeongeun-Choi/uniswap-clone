function Input() {
  return (
    <div className="px-4 py-3 border-solid border rounded-[12px] border-gray-200 bg-gray-100">
      <div className="flex">
        <input
          placeholder="Search tokens and NFT collections"
          className="w-[480px] text-gray-700 text-base font-medium bg-gray-100 outline-0"
        />
      </div>
    </div>
  );
}

export default Input;
