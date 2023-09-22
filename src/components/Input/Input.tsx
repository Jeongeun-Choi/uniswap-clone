import { ReactElement } from "react";

interface InputProps {
  customClassName?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

function Input({ customClassName, leftIcon, rightIcon }: InputProps) {
  return (
    <div className="w-[480px] px-4 py-3 basic_border rounded-[12px] border-gray-200 bg-gray-100">
      <div className="flex items-center">
        {leftIcon}
        <input
          placeholder="Search tokens and NFT collections"
          className="text-gray-700 text-base font-medium bg-gray-100 outline-0"
        />
        {rightIcon}
      </div>
    </div>
  );
}

export default Input;
