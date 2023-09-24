import { BaseInputProps } from "./types";

function BaseInput({ className, ...rest }: BaseInputProps) {
  return <input className={className} {...rest} />;
}

export default BaseInput;
