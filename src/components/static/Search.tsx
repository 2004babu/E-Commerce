import { ChangeEvent } from 'react';

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
}

const Search = ({ search, setSearch }: SearchProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="relative w-full px-4">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-full p-3 rounded-md outline-none border-none bg-[#f0f5ff]"
      />
    </div>
  );
};

export default Search;