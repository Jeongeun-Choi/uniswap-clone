import { ReactElement } from "react";
import { BaseInputProps } from "../../common/Input/types";

export interface InputProps extends BaseInputProps {
  borderColor?: string;
  bgColor?: string;
  hasLeftIcon?: boolean;
  customLeftIcon?: ReactElement;
  rightIcon?: ReactElement;
}
