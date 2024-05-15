import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import SideBar from "../sidebar/sideBar";
import Videos from "../videos/videos";

export default function Home() {
  const [isOpenModal, setIsOpenModal] = useState("");
  const [isOpenFilter, setIsOpenFilter] = useState("");
  const [videosData, setVideosData] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3500/videos")
      .then((res) => res.json())
      .then((data) => setVideosData(data));
  }, [isOpenModal, isRefresh]);

  return (
    <div>
      <Navbar
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setIsRefresh={setIsRefresh}
      />
      <div className={`grid grid-cols-12 absolute top-20 text-white bg-black`}>
        <div className="pt-1 col-start-1 col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1 fixed z-10">
          <SideBar
            setIsOpenModal={setIsOpenModal}
            isOpenFilter={isOpenFilter}
            setIsOpenFilter={setIsOpenFilter}
            setVideosData={setVideosData}
          />
        </div>

        <div
          className={`${
            (isOpenModal || isOpenFilter) && "blur"
          }  pt-1 col-start-3 sm:col-start-3 col-span-10 sm:col-span-10 md:col-start-2 md:col-span-11 lg:col-start-2 lg:col-span-11 xl:col-start-2 xl:col-span-11 2xl:col-start-2 2xl:col-span-11 relative ${
            videosData?.length < 4 && "h-screen"
          }`}
        >
          <Videos
            videosData={videosData}
            isOpenModal={isOpenModal}
            isOpenFilter={isOpenFilter}
          />
        </div>
      </div>
    </div>
  );
}
