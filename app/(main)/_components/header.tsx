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

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const { user, isLoading, error } = useAuth();
  return (
    <div className="fixed z-50 overflow-x-hidden inset-0 flex items-center justify-between lg:justify-around w-full h-[75px] bg-white dark:bg-gray-800">
      <Logo />
      <NavMobile />
      <SearchHeader />
      <NavDesktop />
      {isLoading ? (
        <div className="animate-pulse h-[48px] w-[48px] rounded-full bg-gray-300"></div>
      ) : user ? (
        <Account />
      ) : (
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
