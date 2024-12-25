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
import { blogStore } from '@/store/blogStore';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface DialogDraftProps {
  submitRef: RefObject<HTMLButtonElement>;
  isPending?: boolean;
}

const DialogDraft: FunctionComponent<DialogDraftProps> = ({
  submitRef,
  isPending,
}) => {
  const { openDialogDraft, setOpenDialogDraft, setWriteBlog, writeBlog } =
    blogStore();

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
          <Button
            onClick={() => setOpenDialogDraft(false)}
            disabled={isPending}
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={() => {
              setWriteBlog({ published: false });
              submitRef.current?.click();
            }}
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Save Draft'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogDraft;
