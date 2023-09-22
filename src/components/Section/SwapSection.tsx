import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { CommonButton } from "../../common/Button";

interface SwapSectionProps {
  title: string;
  value: string;
  onChangeInput?: () => void;
}

function SwapSection({ title, value, onChangeInput }: SwapSectionProps) {
  return (
    <section className="flex_direction_col rounded-2xl basic_border border-gray-100 bg-gray-100 text-gray-700 p-4">
      <span className="text-sm">{title}</span>
      <div className="flex_between">
        <input
          className="flex grow w-0 bg-gray-100 text-4xl text-gray-900"
          placeholder="0"
          value={value}
          onChange={onChangeInput}
        />
        <CommonButton
          customClassName="select_button px-2 py-1.5 rounded-2xl"
          leftIcon={<FontAwesomeIcon icon={faChevronDown} className="ml-1" />}
        >
          Select token
        </CommonButton>
      </div>
      <span>$0</span>
    </section>
  );
}

export default SwapSection;
