import { useContext } from 'react';
import { ModalContext } from './context';

interface IProps {
  children?: React.ReactNode;
}

export const ModalHeader = ({ children }: IProps) => {
  const { onHide } = useContext(ModalContext);

  return (
    <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
      <h3 className="text-lg font-semibold mr-5">{children}</h3>
      <button
        className="ml-auto bg-transparent border-0 float-right text-xl leading-none font-semibold outline-none focus:outline-none"
        onClick={onHide}
      >
        <span className="bg-transparent h-6 w-6 text-2xl text-red-500  block outline-none focus:outline-none">
          ×
        </span>
      </button>
    </div>
  );
};
