import { PropsWithChildren } from "react";

interface LinkButtonProps {
  customClassName?: string;
}

const commonClassName =
  "text-gray-700 hover:bg-gray-100 rounded-full text-center text-base ";
function LinkButton({
  customClassName = "px-3 py-3",
  children,
}: PropsWithChildren<LinkButtonProps>) {
  return (
    <button className={commonClassName + customClassName}>{children}</button>
  );
}

export default LinkButton;
