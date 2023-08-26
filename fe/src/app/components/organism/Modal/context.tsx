import { createContext } from 'react';

export interface ModalContextIProps {
  show: boolean;
  onHide: () => void;
  size?: string;
  closeOnClickOutside?: boolean;
}

export const ModalContext = createContext<ModalContextIProps>({
  show: false,
  onHide: () => {},
});
export const ModalDispatchContext = createContext(null);
