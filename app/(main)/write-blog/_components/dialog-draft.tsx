import { FunctionComponent, RefObject } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useBlogStore } from '@/hooks/useBlogStore';

interface DialogDraftProps {
  submitRef: RefObject<HTMLButtonElement>;
}

const DialogDraft: FunctionComponent<DialogDraftProps> = ({ submitRef }) => {
  const { openDialogDraft, setOpenDialogDraft, setWriteBlog, writeBlog } =
    useBlogStore();

  return (
    <AlertDialog open={openDialogDraft} onOpenChange={setOpenDialogDraft}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save Draft</AlertDialogTitle>
          <AlertDialogDescription>
            Your blog will be saved as draft and you can publish it later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setWriteBlog({ published: false });
              submitRef.current?.click();
            }}
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogDraft;
