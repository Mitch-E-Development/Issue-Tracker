import React from "react";

const SearchBar = ({ setSearch }) => {
  return (
    <div className="p-4">
      <div className="flex justify-center items-center py-4 gap-x-4">
        <label className="text-xl">Search: </label>
        <input
          className="border-2 border-sky-400 rounded-lg w-[50%]"
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;