import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  url: string;
}

const Links = ({ children, url }: Props) => {
  return <Link href={url}>{children}</Link>;
};

export default Links;
