import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";
import BaseInput from "../../common/Input/BaseInput";
import { BaseInputProps } from "../../common/Input/types";

interface InputProps extends BaseInputProps {
  width?: string;
  height?: string;
  borderColor?: string;
  bgColor?: string;
  hasLeftIcon?: boolean;
  customLeftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

function SearchInput({
  className,
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
      className={`${className} ${width} ${height} ${borderColor} ${bgColor}`}
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
          className={`outline-0 basic-search-token-input ${bgColor}`}
          {...rest}
        />
        {rightIcon}
      </div>
    </div>
  );
}

export default SearchInput;
