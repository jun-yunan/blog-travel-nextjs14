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
  const inputRef = useRef<HTMLInputElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        `relative flex items-center justify-center border-2 py-1 px-1 lg:w-[30%] rounded-full border-gray-300 dark:border-gray-700`,
      )}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">
          <div className="flex items-center justify-center w-full">
            <input
              ref={inputRef}
              placeholder="What are you looking for?"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              type="text"
              onBlur={() => {
                setIsExpanded(false);
              }}
              className={cn(
                'transition-all duration-300 ease-in-out prose outline-none bg-transparent lg:w-full md:w-full lg:block mx-3 focus:text-base placeholder:text-sm lg:placeholder:text-base',
                isExpanded || searchText ? 'w-full block' : 'w-0',
              )}
            />

            <div
              onClick={() => {
                setIsExpanded(true);
                inputRef.current?.focus();
              }}
              className="rounded-full px-2 py-1 cursor-pointer hover:bg-purple-500 bg-purple-400 mx-2"
            >
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
      </Dialog>
    </div>
  );
};

export default SearchHeader;
