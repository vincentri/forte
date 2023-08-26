interface IProps {
  className?: string;
}

export const ModalOverlay = ({ className }: IProps) => {
  return <div className={`${className} opacity-25 fixed inset-0 z-40 bg-black`} />;
};
