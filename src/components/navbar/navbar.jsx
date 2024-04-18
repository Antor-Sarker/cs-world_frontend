/* eslint-disable react/prop-types */
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import setHistory from "../../utils/searchHistory";
import Search from "../search/search";
export default function Navbar({ isOpenSearchModal, setIsOpenSearchModal }) {
  const [searchResult, setSearchResult] = useState(null);
  const inputRef = useRef(null);

  function handelSearch(query) {
    if (query === "") {
      setSearchResult(null);
      return;
    }
    fetch(`http://localhost:3500/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => setSearchResult(data));
  }

  function handelOpenSearchModal(searchInput) {
    setHistory(searchInput.value);
    searchInput.value = "";
    setIsOpenSearchModal((prev) => !prev);
    setSearchResult(null);
  }

  return (
    <>
      <nav className="fixed w-full h-20 z-10 py-5 bg-[#091524]">
        <ul className="flex justify-between mx-5">
          <li className="flex text-white h-10 pt-2">
            <div className="font-medium text-base sm:text-base md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl">
              CS-World
            </div>
            <div className="rounded-md flex bg-[#243e5e] mx-5">
              <MagnifyingGlassIcon className="mt-1 h-6 w-6 mx-2 text-[#687789] bg-[#243e5e]" />
              <input
                className="w-28 sm:w-28 md:w-full lg:w-full xl:w-full 2xl:w-full rounded-md focus:outline-none bg-[#243e5e]"
                type="search"
                name="search"
                id="search"
                placeholder="Search..."
                onChange={(event) => handelSearch(event.target.value)}
                onFocus={() => setIsOpenSearchModal(true)}
                ref={inputRef}
              />
            </div>
          </li>

          <li className="flex justify-end text-white h-10 font-semibold">
            <div className="flex">
              <div className=" border border-slate-600 pt-1 mx-3 px-2 rounded hover:bg-green-500 cursor-pointer hidden sm:hidden md:block lg:block xl:block 2xl:block">
                Sign up
              </div>
              <div className="border border-slate-600 pt-1 px-2 rounded bg-blue-500 hover:bg-[#091524] cursor-pointer">
                Log in
              </div>
            </div>
          </li>
        </ul>
      </nav>
      {/* when focus on search input*/}
      {isOpenSearchModal && (
        <Search
          searchInput={inputRef.current}
          handelSearch={handelSearch}
          handelOpenSearchModal={handelOpenSearchModal}
          searchResult={searchResult}
        />
      )}
    </>
  );
}
