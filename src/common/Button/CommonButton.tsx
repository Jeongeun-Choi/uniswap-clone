import { PropsWithChildren, ReactElement } from "react";

interface CommonButtonProps {
  customClassName?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

const commonClassName = "text-center ";
function CommonButton({
  customClassName,
  rightIcon,
  leftIcon,
  children,
}: PropsWithChildren<CommonButtonProps>) {
  return (
    <button className={commonClassName + customClassName}>
      {rightIcon}
      {children}
      {leftIcon}
    </button>
  );
}

export default CommonButton;
