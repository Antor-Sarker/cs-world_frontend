/* eslint-disable react/prop-types */
import {
  AdjustmentsVerticalIcon,
  BookmarkIcon,
  EyeIcon,
  HeartIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import getAuthData from "../../utils/auth";
import Sort from "./sort";
import Tags from "./tags";

export default function SideBar({
  setIsOpenModal,
  isOpenFilter,
  setIsOpenFilter,
  setVideosData,
}) {
  const authData = getAuthData();

  function handelOpenModal(type) {
    if (authData) {
      setIsOpenModal(type);
    } else {
      toast.error("Please Login !", {
        position: "top-center",
      });
    }
  }

  return (
    <>
      <div className="flex flex-col text-white text-xs">
        <div
          className="text-center my-3 cursor-pointer hover:text-pink-500"
          onClick={() => handelOpenModal("saved")}
        >
          <BookmarkIcon className="w-6 h-6 mx-8" />
          <div>Saved</div>
        </div>

        <div
          className="text-center my-3 cursor-pointer hover:text-pink-500"
          onClick={() => handelOpenModal("favourite")}
        >
          <HeartIcon className="w-6 h-6 mx-8" />
          <div>Favourite</div>
        </div>

        <div
          className="text-center my-3 cursor-pointer hover:text-pink-500"
          onClick={() => handelOpenModal("history")}
        >
          <EyeIcon className="w-6 h-6 mx-8" />
          <div>History</div>
        </div>

        <div
          className="text-center my-3 cursor-pointer hover:text-pink-500"
          onClick={() => setIsOpenFilter("sort")}
        >
          <AdjustmentsVerticalIcon className="w-6 h-6 mx-8" />
          <div>Sort</div>
        </div>

        <div
          className="text-center my-3 cursor-pointer hover:text-pink-500"
          onClick={() => setIsOpenFilter("tags")}
        >
          <TagIcon className="w-6 h-6 mx-8" />
          <div>Tags</div>
        </div>
      </div>

      {isOpenFilter === "sort" && (
        <Sort setIsOpenFilter={setIsOpenFilter} setVideosData={setVideosData} />
      )}

      {isOpenFilter === "tags" && (
        <Tags setIsOpenFilter={setIsOpenFilter} setVideosData={setVideosData} />
      )}
    </>
  );
}
