export interface BaseModalProps {
  width?: string;
  height?: string;
  title?: string;
  hasCloseBtn?: boolean;
  canCloseClickOutside?: boolean;
  onCloseModal: () => void;
}
