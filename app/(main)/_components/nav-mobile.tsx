'use client';

import { FunctionComponent, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useNav } from '@/hooks/useNav';
import { AlignJustify } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Account } from './account';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavMobileProps {}

const NavMobile: FunctionComponent<NavMobileProps> = () => {
  const pathname = usePathname();
  const listNav = useNav();

  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden flex items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">
            <AlignJustify />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[60%] flex flex-col gap-y-4 items-start"
        >
          <SheetHeader>
            <SheetTitle>Blog Travel</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="w-full h-full justify-between flex flex-col">
            <div className="w-full flex flex-col gap-y-4">
              {listNav.map((item, index) => (
                <SheetClose asChild>
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      'text-base font-medium',
                      pathname === item.href && 'text-purple-600 font-semibold',
                    )}
                  >
                    <span>{item.name}</span>
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div>
              <Account />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavMobile;
