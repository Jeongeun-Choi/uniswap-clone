import { PropsWithChildren } from "react";

interface ConnectButtonProps {
  paddingX?: string;
  paddingY?: string;
  borderRadius?: string;
}

function ConnectButton({
  paddingX = "3",
  paddingY = "3",
  borderRadius = "none",
  children,
}: PropsWithChildren<ConnectButtonProps>) {
  return (
    <button
      className={`text-pink-900 bg-pink-100 px-${paddingX} py-${paddingY} rounded-${borderRadius} text-center text-base font-bold`}
    >
      {children}
    </button>
  );
}

export default ConnectButton;
