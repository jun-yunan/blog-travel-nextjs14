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
    href: '/blogs?page=1',
  },
  {
    name: 'Write Blog',
    href: '/write-blog',
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

export const useNav = () => {
  return listNav;
};
