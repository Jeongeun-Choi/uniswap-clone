import { PropsWithChildren } from "react";

interface CommonButtonProps {
  customClassName?: string;
}

const commonClassName = "text-center ";
function CommonButton({
  customClassName,
  children,
}: PropsWithChildren<CommonButtonProps>) {
  return (
    <button className={commonClassName + customClassName}>{children}</button>
  );
}

export default CommonButton;
