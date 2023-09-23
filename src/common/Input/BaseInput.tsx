import { AllHTMLAttributes } from "react";

interface BaseInputProps extends AllHTMLAttributes<HTMLInputElement> {
  customInputStyle?: string;
}

function BaseInput({ customInputStyle, ...rest }: BaseInputProps) {
  return <input className={customInputStyle} {...rest} />;
}

export default BaseInput;
