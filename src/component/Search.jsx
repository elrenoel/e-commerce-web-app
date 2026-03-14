import React from "react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <div className="searchBox flex items-center gap-2 h-12.5 bg-[#e5e5e5] rounded-[5px] relative py-2 px-5">
      <BsSearch size={20} />
      <input
        type="text"
        placeholder="Seacrh for products..."
        className="outline-0 w-full h-full bg-inherit p-2 text-[15px]"
      />
    </div>
  );
};

export default Search;
