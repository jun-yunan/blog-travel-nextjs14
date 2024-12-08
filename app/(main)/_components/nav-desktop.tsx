'use client';

import Link from 'next/link';
import { FunctionComponent } from 'react';
import { ToggleTheme } from './toggle-theme';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavDesktopProps {}
interface NavItem {
  name: string;
  href: string;
}
const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Blogs',
    href: '/blogs',
  },
  {
    name: 'Destinations',
    href: '/destinations',
  },
  {
    name: 'Tour',
    href: '/tour',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

const NavDesktop: FunctionComponent<NavDesktopProps> = () => {
  const pathname = usePathname();
  return (
    <div className="lg:flex hidden items-center">
      {navItems.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={cn(
            'text-base font-medium py-2 px-4 rounded-lg hover:bg-gray-100 bg-transparent',
            pathname === item.href
              ? 'text-purple-600 font-semibold bg-purple-200 hover:bg-purple-200'
              : 'bg-white',
          )}
        >
          {item.name}
        </Link>
      ))}
      <ToggleTheme />
    </div>
  );
};

export default NavDesktop;
