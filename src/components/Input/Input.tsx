import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLAttributes, ReactElement } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
  customInputClassName?: string;
  borderColor?: string;
  bgColor?: string;
  hasLeftIcon?: boolean;
  customLeftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

function Input({
  customInputClassName,
  width,
  height,
  borderColor,
  bgColor,
  hasLeftIcon,
  customLeftIcon,
  rightIcon,
  placeholder,
  ...rest
}: InputProps) {
  return (
    <div
      className={`px-4 py-3 basic_border rounded-[12px] ${width} ${height} ${borderColor} ${bgColor}`}
    >
      <div className="flex items-center">
        {hasLeftIcon &&
          (customLeftIcon || (
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-gray-700 mr-1.5"
            />
          ))}
        <input
          placeholder={placeholder}
          className={`outline-0 ${customInputClassName} ${bgColor}`}
          {...rest}
        />
        {rightIcon}
      </div>
    </div>
  );
}

export default Input;
