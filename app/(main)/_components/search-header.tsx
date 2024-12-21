import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { FunctionComponent, useRef, useState } from 'react';

interface SearchHeaderProps {}

const SearchHeader: FunctionComponent<SearchHeaderProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <div
      className={cn(
        `flex items-center justify-center border-2 py-1 px-1 lg:w-[30%] rounded-full border-gray-300 dark:border-gray-700`,
      )}
    >
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
          'transition-all duration-300 ease-in-out prose outline-none bg-transparent lg:w-full lg:block mx-3 focus:text-base placeholder:text-sm lg:placeholder:text-base',
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
  );
};

export default SearchHeader;
