export interface BaseModalProps {
  width?: string;
  height?: string;
  title?: string;
  hasCloseBtn?: boolean;
  onCloseModal: () => void;
}
