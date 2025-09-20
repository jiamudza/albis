import React from "react";
import { IoSearch } from "react-icons/io5";
const Search = () => {
  return (
    <div
      className="bg-opacity-30 border-accent flex items-center justify-start gap-2 rounded-full border border-b-4 bg-white px-1 py-1 text-xs"
    >
      <button
        type="button"
        className="hover:bg-accent bg-primary cursor-pointer rounded-full p-2 text-white duration-100 ease-in-out focus:scale-95 focus:outline-none"
        aria-label="Search"
      >
        <IoSearch size={12} />
      </button>
      <input
        type="text"
        placeholder="Search..."
        className="w-full text-button-bg border-none bg-transparent px-2 placeholder-gray-400 outline-none"
      />
    </div>
  );
};

export default Search;
