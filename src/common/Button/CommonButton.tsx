import { PropsWithChildren, ReactElement } from "react";
import { BaseButtonProps } from "./types";

interface CommonButtonProps extends BaseButtonProps {
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

const commonClassName = "text-center ";
function CommonButton({
  className = "",
  rightIcon,
  leftIcon,
  children,
  ...rest
}: PropsWithChildren<CommonButtonProps>) {
  return (
    <button className={`${commonClassName} ${className}`} {...rest}>
      {rightIcon}
      {children}
      {leftIcon}
    </button>
  );
}

export default CommonButton;
