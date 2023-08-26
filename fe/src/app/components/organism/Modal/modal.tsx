import { ModalContext, ModalContextIProps } from './context';

interface IProps extends ModalContextIProps {
  children: React.ReactNode;
}

export const Modal = ({
  children,
  show,
  onHide,
  closeOnClickOutside,
  size
}: IProps) => {
  return (
    <ModalContext.Provider
      value={{
        closeOnClickOutside,
        show,
        onHide,
        size
      }}
    >
      <div>{show && children}</div>
    </ModalContext.Provider>
  );
};
