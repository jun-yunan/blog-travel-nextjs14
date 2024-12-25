'use client';

import Link from 'next/link';
import { FunctionComponent } from 'react';
import { ToggleTheme } from './toggle-theme';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useNav } from '@/hooks/useNav';

interface NavItem {
  name: string;
  href: string;
}
const listNav: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Blogs',
    href: '/blogs',
  },
  {
    name: 'Write Blog',
    href: '/write-blog',
  },
  {
    name: 'Destinations',
    href: '/destinations',
  },
  // {
  //   name: 'Tour',
  //   href: '/tour',
  // },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];
interface NavDesktopProps {}

const NavDesktop: FunctionComponent<NavDesktopProps> = () => {
  const pathname = usePathname();
  // const listNav = useNav();
  return (
    <div className="lg:flex hidden items-center">
      {listNav.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={cn(
            'text-sm font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-all duration-300 dark:hover:text-black bg-transparent',
            pathname === item.href &&
              'text-purple-600 font-semibold bg-purple-200 hover:bg-purple-200',
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavDesktop;
