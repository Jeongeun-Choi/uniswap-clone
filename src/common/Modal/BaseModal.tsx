import { PropsWithChildren } from "react";

interface BaseModalProps {
  width?: string;
  height?: string;
}

function BaseModal({
  width,
  height,
  children,
}: PropsWithChildren<BaseModalProps>) {
  return (
    <div className="flex justify-center items-center absolute z-[9999] bg-gray-500/60 w-full h-full top-0 left-0">
      <div className={`bg-white rounded-[20px] ${width} ${height}`}>
        {children}
      </div>
    </div>
  );
}

export default BaseModal;
