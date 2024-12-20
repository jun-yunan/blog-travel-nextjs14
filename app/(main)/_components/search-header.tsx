import { Search } from 'lucide-react';
import { FunctionComponent } from 'react';

interface SearchHeaderProps {}

const SearchHeader: FunctionComponent<SearchHeaderProps> = () => {
  return (
    <div className="lg:flex hidden items-center justify-center border-2 py-1 px-1 lg:w-[30%] rounded-full">
      <input
        placeholder="What are you looking for?"
        type="text"
        className="hidden lg:block border-none bg-transparent focus:ring-0 focus-visible:ring-0 focus:border-none focus-visible:outline-none mx-3 w-full focus:text-base placeholder:text-base"
      />
      <div className="rounded-full p-2 cursor-pointer hover:bg-purple-500 bg-purple-400 mx-2">
        <Search className="text-white" />
      </div>
    </div>
  );
};

export default SearchHeader;
