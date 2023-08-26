interface IProps {
  children: React.ReactNode;
}

export const ModalFooter = ({ children }: IProps) => {
  return (
    <div className="flex items-center justify-end rounded-b">
      {children}
    </div>
  );
};
