'use client';

import { FunctionComponent } from 'react';
import Logo from './logo';
import NavDesktop from './nav-desktop';
import { Account } from './account';
import { useAuth } from '@/hooks/useAuth';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const { user, isLoading, error } = useAuth();
  return (
    <div className="fixed z-50 flex items-center justify-around w-full h-[60px]">
      <Logo />
      <NavDesktop />
      {isLoading ? (
        <div className="animate-spin h-[48px] w-[48px] rounded-full bg-gray-300"></div>
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
