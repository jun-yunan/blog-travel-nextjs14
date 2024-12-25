'use client';

import { FunctionComponent } from 'react';
import Logo from './logo';
import NavDesktop from './nav-desktop';
import { Account } from './account';
import SearchHeader from './search-header';
import NavMobile from './nav-mobile';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-between px-2 lg:px-0 lg:justify-around w-full h-[75px] bg-white dark:bg-gray-800">
      <NavMobile />
      <Logo />
      <SearchHeader />
      <NavDesktop />
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Account />
      </SignedIn>
    </div>
  );
};

export default Header;
