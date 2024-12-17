import { FunctionComponent } from 'react';
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

interface DialogDraftProps {}

const DialogDraft: FunctionComponent<DialogDraftProps> = () => {
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
