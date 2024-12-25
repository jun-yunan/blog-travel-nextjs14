import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import { SignOutButton } from '@clerk/nextjs';

export function DialogSignOut({
  children,
  onClick,
  open,
  setOpen,
}: {
  children?: React.ReactNode;
  onClick: () => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to sign out?</DialogTitle>
          <DialogDescription>
            You will be redirected to the sign in page.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <SignOutButton redirectUrl="/sign-in">
            <Button variant="destructive">Sign out</Button>
          </SignOutButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
