/* eslint-disable react/prop-types */
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import setHistory from "../../utils/searchHistory";
import History from "../history/history";
import Search from "../search/search";
import Favourite from "../favourite/favourite";

export default function Navbar({
  isOpenFavouriteModal,
  setIsOpenFavouriteModal,
  isOpenSearchModal,
  setIsOpenSearchModal,
  isOpenHistoryModal,
  setIsOpenHistoryModal,
}) {
  const [searchResult, setSearchResult] = useState(null);
  const [isOpenLogOutModal, setIsOpenLogOutModal] = useState(false);

  const [historyData, setHistoryData] = useState([]);
  const { authData, setAuthData } = useContext(AuthContext);

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
    setIsOpenSearchModal((prev) => !prev);
    setSearchResult(null);
  }

  function handelLogOut() {
    setAuthData(null);
    setIsOpenLogOutModal(false);
  }

  function handelDeleteHistory(id) {
    fetch("http://localhost:3500/history", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ userId: authData.id, videoId: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          const afterDelete = historyData?.filter((item) => item.id !== id);
          setHistoryData(afterDelete);
        }
      });
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

          <li className="flex justify-end text-white h-10 font-medium">
            {authData ? (
              <div onClick={() => setIsOpenLogOutModal(!isOpenLogOutModal)}>
                <UserCircleIcon className="w-10 h-10 cursor-pointer" />
              </div>
            ) : (
              <div className="flex">
                <div
                  className=" border border-slate-600 pt-1 mx-3 px-2 rounded hover:bg-green-500 cursor-pointer hidden sm:hidden md:block lg:block xl:block 2xl:block"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </div>
                <div
                  className="border border-slate-600 pt-1 px-2 rounded bg-blue-500 hover:bg-[#091524] cursor-pointer"
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
      {isOpenSearchModal && (
        <Search
          searchInput={inputRef.current}
          handelSearch={handelSearch}
          handelOpenSearchModal={handelOpenSearchModal}
          searchResult={searchResult}
        />
      )}

      {
        isOpenFavouriteModal &&
        <Favourite 
          setIsOpenFavouriteModal={setIsOpenFavouriteModal}/>
      }

      {isOpenHistoryModal && (
        <History
          setIsOpenHistoryModal={setIsOpenHistoryModal}
          handelDeleteHistory={handelDeleteHistory}
          historyData={historyData}
          setHistoryData={setHistoryData}
        />
      )}


    </>
  );
}
