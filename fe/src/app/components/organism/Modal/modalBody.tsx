import { useWindowSize } from 'react-use';

interface IProps {
  children: React.ReactNode;
}

export const ModalBody = ({ children }: IProps) => {
  const { height } = useWindowSize();
  return (
    <div
      className={`relative p-3 flex-auto overflow-auto`}
      style={{ maxHeight: `${height - 200}px` }}
    >
      {children}
    </div>
  );
};
