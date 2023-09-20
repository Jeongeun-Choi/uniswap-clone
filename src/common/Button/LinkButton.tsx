import { PropsWithChildren } from "react";

interface LinkButtonProps {
  paddingX?: string;
  paddingY?: string;
  borderRadius?: string;
}

function LinkButton({
  paddingX = "3",
  paddingY = "3",
  children,
}: PropsWithChildren<LinkButtonProps>) {
  return (
    <button
      className={`text-gray-700 hover:bg-gray-100 px-${paddingX} py-${paddingY} rounded-full text-center text-base`}
    >
      {children}
    </button>
  );
}

export default LinkButton;
