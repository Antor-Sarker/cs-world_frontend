import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import SideBar from "../sidebar/sideBar";
import Videos from "../videos/videos";

export default function Home() {
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
  const [isOpenFilterModal, setIsOpenFilterModal] = useState({
    sort: false,
    tags: false,
  });
  // const [authData, setAuthData] = useState(null);
  const [videosData, setVideosData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3500/videos")
      .then((res) => res.json())
      .then((data) => setVideosData(data));
  }, []);

  function handelTagsFilter(name) {
    fetch(`http://localhost:3500/tag?name=${name}`)
      .then((res) => res.json())
      .then((data) => setVideosData(data));
    setIsOpenFilterModal({ sort: false, tags: false });
  }

  function handelSortFilter(name) {
    fetch(`http://localhost:3500/sort?by=${name}`)
      .then((res) => res.json())
      .then((data) => setVideosData(data));
    setIsOpenFilterModal({ sort: false, tags: false });
  }

  return (
    <div className="">
      <Navbar
        isOpenSearchModal={isOpenSearchModal}
        setIsOpenSearchModal={setIsOpenSearchModal}
      />
      <div
        className={`${
          isOpenSearchModal && "blur"
        } grid grid-cols-12 absolute top-20 text-white bg-black`}
      >
        <div className="pt-1 col-start-1 col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1 fixed z-10">
          <SideBar
            isOpenFilterModal={isOpenFilterModal}
            setIsOpenFilterModal={setIsOpenFilterModal}
            handelTagsFilter={handelTagsFilter}
            handelSortFilter={handelSortFilter}
          />
        </div>

        <div
          className={`${
            (isOpenFilterModal.tags || isOpenFilterModal.sort) && "blur-sm"
          } pt-1 col-start-3 sm:col-start-3 col-span-10 sm:col-span-10 md:col-start-2 md:col-span-11 lg:col-start-2 lg:col-span-11 xl:col-start-2 xl:col-span-11 2xl:col-start-2 2xl:col-span-11 relative ${
            videosData?.length < 4 && "h-screen"
          }`}
        >
          <Videos
            videosData={videosData}
            isOpenFilterModal={isOpenFilterModal}
          />
        </div>
      </div>
    </div>
  );
}
