import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

interface CommonButtonProps extends HTMLAttributes<HTMLButtonElement> {
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
  ...rest
}: PropsWithChildren<CommonButtonProps>) {
  return (
    <button className={commonClassName + customClassName} {...rest}>
      {rightIcon}
      {children}
      {leftIcon}
    </button>
  );
}

export default CommonButton;
