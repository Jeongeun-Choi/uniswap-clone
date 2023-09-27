import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { BaseModalProps } from "./types";

function BaseModal({
  width,
  height,
  title,
  hasCloseBtn,
  canCloseClickOutside = true,
  onCloseModal,
  children,
}: PropsWithChildren<BaseModalProps>) {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleClickCloseBtn = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onCloseModal();
    },
    [onCloseModal]
  );

  const handleCloseModal = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (modalRef.current === e.target && canCloseClickOutside) {
        onCloseModal();
      }
    },
    [canCloseClickOutside, onCloseModal]
  );

  const handleEscCloseModal = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  useEffect(() => {
    if (modalRef.current) {
      document.addEventListener("keydown", handleEscCloseModal);
    }
    return () => document.removeEventListener("keydown", handleEscCloseModal);
  }, [handleEscCloseModal]);

  return (
    <div
      ref={modalRef}
      className="flex justify-center items-center absolute z-[9999] bg-gray-500/60 w-full h-full top-0 left-0"
      onClick={handleCloseModal}
    >
      <div className={`bg-white rounded-[20px] ${width} ${height}`}>
        <header className="flex_between p-5">
          <div>{title}</div>
          {hasCloseBtn && (
            <button onClick={handleClickCloseBtn}>
              <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
            </button>
          )}
        </header>
        {children}
      </div>
    </div>
  );
}

export default BaseModal;
