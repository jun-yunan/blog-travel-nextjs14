import { FunctionComponent } from 'react';
import Logo from './logo';
import NavDesktop from './nav-desktop';
import { Account } from './account';
import SearchHeader from './search-header';
import NavMobile from './nav-mobile';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-between px-2 lg:px-0 lg:justify-around w-full h-[75px] bg-white dark:bg-gray-800">
      <NavMobile />
      <Logo />
      <SearchHeader />
      <NavDesktop />
      <SignedOut>
        <Link href="/sign-in">
          <Button
            variant="outline"
            className="rounded-full text-sm font-medium"
          >
            Sign in
          </Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <Account />
      </SignedIn>
    </div>
  );
};

export default Header;
