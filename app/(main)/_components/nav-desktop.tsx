import Link from 'next/link';
import { FunctionComponent } from 'react';
import { ToggleTheme } from './toggle-theme';

interface NavDesktopProps {}
interface NavItem {
  name: string;
  href: string;
}
const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/',
  },
  {
    name: 'Services',
    href: '/services',
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
  return (
    <div className="lg:flex hidden items-center gap-x-6 px-10 py-1 rounded-full border-2 border-gray-200">
      {navItems.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className="text-base font-medium py-2 px-4 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800"
        >
          {item.name}
        </Link>
      ))}
      <ToggleTheme />
    </div>
  );
};

export default NavDesktop;
