import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface LogoProps {}

const Logo: FunctionComponent<LogoProps> = () => {
  return (
    <Link
      href="/dashboard"
      className="flex animate-pulse items-center justify-center"
    >
      <p className="text-xl font-semibold tracking-wide">NAKIET</p>
    </Link>
  );
};

export default Logo;
