/* eslint-disable react/prop-types */
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import getAuthData, { setAuthData } from "../../utils/auth";
import setHistory from "../../utils/searchHistory";
import Modal from "../modal/modal";
import Search from "../search/search";

export default function Navbar({ isOpenModal, setIsOpenModal, setIsRefresh }) {
  const [searchResult, setSearchResult] = useState(null);
  const [isOpenLogOutModal, setIsOpenLogOutModal] = useState(false);
  const authData = getAuthData();

  const inputRef = useRef(null);
  const navigate = useNavigate();

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
    setIsOpenModal((prev) => (prev === "search" ? "" : "search"));
    setSearchResult(null);
  }

  function handelLogOut() {
    setAuthData(null);
    setIsOpenLogOutModal(false);
  }

  return (
    <>
      <nav className="fixed w-full h-20 z-10 py-5 bg-[#091524]">
        <ul className="flex justify-between mx-5">
          <li className="flex text-white h-10 pt-2">
            <div
              className="cursor-pointer font-medium text-base sm:text-base md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl"
              onClick={() => setIsRefresh((prev) => !prev)}
            >
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
                onFocus={() => setIsOpenModal("search")}
                ref={inputRef}
              />
            </div>
          </li>

          <li className="flex justify-end text-white h-10 font-medium">
            {authData ? (
              <div onClick={() => setIsOpenLogOutModal(!isOpenLogOutModal)}>
                <UserCircleIcon className="w-10 h-10 cursor-pointer" />
              </div>
            ) : (
              <div className="flex">
                <div
                  className="border border-slate-600 pt-1 mx-3 px-2 rounded hover:bg-green-500 transition delay-100 cursor-pointer hidden sm:hidden md:block lg:block xl:block 2xl:block"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </div>
                <div
                  className="border border-slate-600 pt-1 px-2 rounded bg-blue-500 hover:bg-[#091524] transition delay-1000 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </div>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <div
        className={`${
          !isOpenLogOutModal && "hidden"
        } fixed right-0 top-16 z-20 rounded bg-slate-700 text-white text-lg font-medium p-1 shadow-lg shadow-black mr-2`}
      >
        <div>{authData?.firstName + " " + authData?.lastName}</div>
        <div className="text-sm text-slate-300">{authData?.email}</div>
        <div
          className="bg-red-500 mt-5 text-center cursor-pointer"
          onClick={handelLogOut}
        >
          Log out
        </div>
      </div>
      {/* when focus on search input*/}
      {isOpenModal === "search" && (
        <Search
          searchInput={inputRef.current}
          handelSearch={handelSearch}
          handelOpenSearchModal={handelOpenSearchModal}
          searchResult={searchResult}
        />
      )}

      {isOpenModal === "saved" && (
        <Modal
          type="saved"
          title="Saved Videos"
          setIsOpenModal={setIsOpenModal}
        />
      )}

      {isOpenModal === "favourite" && (
        <Modal
          type="favourite"
          title="Your Favourite Videos"
          setIsOpenModal={setIsOpenModal}
        />
      )}

      {isOpenModal === "history" && (
        <Modal
          type="history"
          title="Videos you've watched"
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </>
  );
}
