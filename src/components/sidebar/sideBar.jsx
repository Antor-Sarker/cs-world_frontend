import {
  AdjustmentsVerticalIcon,
  EyeIcon,
  HeartIcon,
  HomeIcon,
  BookmarkIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

export default function SideBar() {
  return (
    <div className="pl-2 flex flex-col text-white">
      <div className="flex my-3 cursor-pointer hover:text-pink-500">
        <HomeIcon className="w-6 h-6 mr-2" /> Home
      </div>
      <div className="flex my-3 cursor-pointer hover:text-pink-500">
        <BookmarkIcon className="w-6 h-6 mr-2" />
        Saved
      </div>
      <div className="flex my-3 cursor-pointer hover:text-pink-500">
        <HeartIcon className="w-6 h-6 mr-2" />
        Favourite
      </div>

      <div className="flex my-3 cursor-pointer hover:text-pink-500">
        <EyeIcon className="w-6 h-6 mr-2" />
        History
      </div>

      <div className="flex my-3 cursor-pointer hover:text-pink-500">
        <AdjustmentsVerticalIcon className="w-6 h-6 mr-2" />
        Filter
      </div>
      <div className="flex my-3 cursor-pointer hover:text-pink-500">
        <TagIcon className="w-6 h-6 mr-2" />
        Tags
      </div>
    </div>
  );
}
