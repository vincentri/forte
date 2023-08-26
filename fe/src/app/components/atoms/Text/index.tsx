import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Text = ({ children, className }: Props) => {
  return <span className={`${className} text-xs`}>{children}</span>;
};

export default Text;
