/* eslint-disable react/prop-types */

import { XMarkIcon } from "@heroicons/react/24/outline";
export default function Sort({ setIsOpenFilter, setVideosData }) {
  function handelSortFilter(name) {
    fetch(`http://localhost:3500/sort?by=${name}`)
      .then((res) => res.json())
      .then((data) => setVideosData(data));
    setIsOpenFilter("");
  }

  return (
    <div className="absolute bg-slate-600 w-40 h-44 top-2/4 rounded m-2 pl-2">
      <div className="flex justify-end h-8" onClick={() => setIsOpenFilter("")}>
        <XMarkIcon className="h-7 w-7 hover:h-8 hover:w-8 cursor-pointer" />
      </div>

      <div className="flex flex-wrap pb-3 font-semibold mt-5">
        <div
          className="bg-[#FF204E] hover:bg-slate-600 hover:border m-1 p-1 rounded cursor-pointer"
          onClick={() => handelSortFilter("all")}
        >
          Reset
        </div>

        <div
          className="bg-indigo-600 hover:bg-slate-600 hover:border m-1 p-1 rounded cursor-pointer"
          onClick={() => handelSortFilter("popular")}
        >
          Popular
        </div>

        <div
          className="bg-[#e49401] hover:bg-slate-600 hover:border m-1 p-1 rounded cursor-pointer"
          onClick={() => handelSortFilter("oldest")}
        >
          Oldest
        </div>

        <div
          className="bg-[#03C988] hover:bg-slate-600 hover:border m-1 p-1 rounded cursor-pointer"
          onClick={() => handelSortFilter("latest")}
        >
          Latest
        </div>
      </div>
    </div>
  );
}
