import React from "react";
import { IoSearch } from "react-icons/io5";
const Search = () => {
  return (
    <div
      className="hidden bg-opacity-30 border-accent md:flex w-2/3 items-center justify-between gap-2 rounded-full border border-b-4 bg-white px-1 py-1 text-xs shadow-lg shadow-gray-300/50 backdrop-blur-md"
      style={{
        boxShadow: "0 8px 16px -8px rgba(128,128,128,0.25)", // menambah bayangan bawah
        borderBottom: "3px solid #B7A5DB", // membuat bagian bawah lebih solid
      }}
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
        className="w-full  text-button-bg border-none bg-transparent px-2 placeholder-gray-400 outline-none"
      />
    </div>
  );
};

export default Search;
