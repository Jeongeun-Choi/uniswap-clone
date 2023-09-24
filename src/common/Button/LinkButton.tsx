import { PropsWithChildren } from "react";
import { BaseButtonProps } from "./types";

const commonClassName =
  "text-gray-700 hover:bg-gray-100 rounded-2xl text-center text-base ";
function LinkButton({
  className = "px-3 py-3",
  children,
}: PropsWithChildren<BaseButtonProps>) {
  return (
    <button className={`${commonClassName} ${className}`}>{children}</button>
  );
}

export default LinkButton;
