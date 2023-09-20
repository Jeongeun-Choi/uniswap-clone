import { PropsWithChildren } from "react";

interface ConnectButtonProps {
  customClassName?: string;
}

const commonClassName =
  "text-pink-900 bg-pink-100 text-center text-base font-bold ";
function ConnectButton({
  customClassName,
  children,
}: PropsWithChildren<ConnectButtonProps>) {
  return (
    <button className={commonClassName + customClassName}>{children}</button>
  );
}

export default ConnectButton;
