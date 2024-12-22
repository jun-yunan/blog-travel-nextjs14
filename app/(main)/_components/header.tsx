'use client';

import { FunctionComponent } from 'react';
import Logo from './logo';
import NavDesktop from './nav-desktop';
import { Account } from './account';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SearchHeader from './search-header';
import NavMobile from './nav-mobile';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  // const { user, isLoading, error } = useAuth();
  return (
    <div className="fixed z-50 overflow-x-hidden inset-0 flex items-center justify-between px-2 lg:px-0 lg:justify-around w-full h-[75px] bg-white dark:bg-gray-800">
      <NavMobile />
      <Logo />
      <SearchHeader />
      <NavDesktop />
      {/* {isLoading ? (
        <div className="animate-pulse h-[48px] w-[48px] rounded-full bg-gray-300"></div>
      ) : user ? (
        <Account />
      ) : (
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      )} */}
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        {/* <UserButton /> */}
        <Account />
      </SignedIn>
    </div>
  );
};

export default Header;
