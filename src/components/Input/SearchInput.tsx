import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AllHTMLAttributes, ReactElement } from "react";
import BaseInput from "../../common/Input/BaseInput";

interface InputProps extends AllHTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
  customInputClassName?: string;
  borderColor?: string;
  bgColor?: string;
  hasLeftIcon?: boolean;
  customLeftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

function SearchInput({
  customInputClassName,
  width,
  height,
  borderColor,
  bgColor,
  hasLeftIcon,
  customLeftIcon,
  rightIcon,
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
        <BaseInput
          customInputStyle={`outline-0 ${customInputClassName} ${bgColor}`}
          {...rest}
        />
        {rightIcon}
      </div>
    </div>
  );
}

export default SearchInput;
