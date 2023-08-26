import { useContext, useMemo, useRef } from 'react';
import { useClickAway } from 'react-use';
import { ModalContext } from './context';

interface IProps {
  children: React.ReactNode;
}

export const ModalContent = ({ children }: IProps) => {
  const { closeOnClickOutside, onHide, size } = useContext(ModalContext);
  const ref = useRef(null);
  useClickAway(ref, () => {
    if (closeOnClickOutside) onHide();
  });
  const modalSize = useMemo(() => {
    if (size === 'md') return 'sm:w-8/12 md:w-6/12';
    return 'sm:w-8/12 md:w-7/12 lg:w-5/12';
  }, [size]);
  return (
    <div className="justify-center w-auto items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div
        ref={ref}
        className={`relative w-full mx-3 my-6 sm:mx-auto max-w-3xl ${modalSize}`}
      >
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="relative p-4 flex-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};
