import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';

interface SidebarSettingsProps {}

const listSettings = [
  {
    href: '/account',
    name: 'General',
  },
  {
    href: '/account/edit-profile',
    name: 'Edit Profile',
  },
  {
    href: '/account/password',
    name: 'Password',
  },
  {
    href: '/account/social-profiles',
    name: 'Social Profiles',
  },
  {
    href: '/account/company',
    name: 'Company',
  },
  {
    href: '/account/notifications',
    name: 'Notifications',
  },
  //   {
  //     href: '/account/delete-account',
  //     name: 'Delete Account',
  //   },
];
const SidebarSettings: FunctionComponent<SidebarSettingsProps> = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-y-4 items-start w-[200px]">
      {listSettings.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={cn(
            'text-base text-gray-600 dark:text-gray-400',
            item.href === pathname &&
              'font-semibold text-black text-base dark:text-white',
          )}
        >
          {item.name}
        </Link>
      ))}
      <Separator />
      <Link href="/account/delete" className="text-red-600 text-base">
        Delete Account
      </Link>
    </div>
  );
};

export default SidebarSettings;
