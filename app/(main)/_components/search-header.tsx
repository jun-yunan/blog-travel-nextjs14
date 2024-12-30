import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { CommandSearch } from './command-search';

interface SearchHeaderProps {}

const SearchHeader: FunctionComponent<SearchHeaderProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        className={cn(
          `relative flex items-center justify-center border-2 py-1 px-1 lg:w-[30%] rounded-full border-gray-300 dark:border-gray-700`,
        )}
      >
        <DialogTrigger className="w-full">
          <div className="flex items-center justify-center w-full">
            <input
              readOnly
              placeholder="What are you looking for?"
              type="text"
              className="prose outline-none bg-transparent w-full mx-3 focus:text-base placeholder:text-sm"
            />

            <div className="rounded-full px-2 py-1 cursor-pointer hover:bg-purple-500 bg-purple-400 mx-2">
              <Search className="text-white" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Search</DialogHeader>
          <DialogDescription>
            Find what you&apos;re looking for quickly.
          </DialogDescription>
          <CommandSearch open={open} onOpen={setOpen} />
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default SearchHeader;
