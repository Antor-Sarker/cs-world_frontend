/* eslint-disable react/prop-types */
import {
  AdjustmentsVerticalIcon,
  BookmarkIcon,
  EyeIcon,
  HeartIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context";
import Sort from "./sort";
import Tags from "./tags";

export default function SideBar({
  setIsOpenFavouriteModal,
  setIsOpenHistoryModal,
  isOpenFilterModal,
  setIsOpenFilterModal,
  handelTagsFilter,
  handelSortFilter,
}) {
  const { authData } = useContext(AuthContext);
  function handelOpenFilterModal(name, type) {
    type === "open" &&
      setIsOpenFilterModal({ ...isOpenFilterModal, [name]: true });
    type === "close" &&
      setIsOpenFilterModal({ ...isOpenFilterModal, [name]: false });
  }

  function handelHistoryModal() {
    if (authData) {
      setIsOpenHistoryModal(true);
    } else {
      toast.error("Please Login !", {
        position: "top-center",
      });
    }
  }

  function handelFavouriteModal() {
    if (authData) {
      setIsOpenFavouriteModal(true);
    } else {
      toast.error("Please Login !", {
        position: "top-center",
      });
    }
  }

  return (
    <>
      <div className="flex flex-col text-white text-xs">
        <div className="text-center my-3 cursor-pointer hover:text-pink-500">
          <BookmarkIcon className="w-6 h-6 mx-8" />
          <div>Saved</div>
        </div>

        <div className="text-center my-3 cursor-pointer hover:text-pink-500"
        onClick={handelFavouriteModal}
        >
          <HeartIcon className="w-6 h-6 mx-8" />
          <div>Favourite</div>
        </div>

        <div
          className="text-center my-3 cursor-pointer hover:text-pink-500"
          onClick={handelHistoryModal}
        >
          <EyeIcon className="w-6 h-6 mx-8" />
          <div>History</div>
        </div>

        <div
          className="text-center my-3 cursor-pointer hover:text-pink-500"
          onClick={() => handelOpenFilterModal("sort", "open")}
        >
          <AdjustmentsVerticalIcon className="w-6 h-6 mx-8" />
          <div>Sort</div>
        </div>

        <div
          className="text-center my-3 cursor-pointer hover:text-pink-500"
          onClick={() => handelOpenFilterModal("tags", "open")}
        >
          <TagIcon className="w-6 h-6 mx-8" />
          <div>Tags</div>
        </div>
      </div>

      {isOpenFilterModal.sort && (
        <Sort
          handelOpenFilterModal={handelOpenFilterModal}
          handelSortFilter={handelSortFilter}
        />
      )}
      {isOpenFilterModal.tags && (
        <Tags
          handelOpenFilterModal={handelOpenFilterModal}
          handelTagsFilter={handelTagsFilter}
        />
      )}
    </>
  );
}
