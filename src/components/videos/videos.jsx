/* eslint-disable react/prop-types */
import {
  ClockIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Video({ data }) {
  const navigate = useNavigate()
  function handelNavigate(){
    navigate(`video/${data.id}`)
  }
  return (
    <div className="text-sm text-[#b9d0ec] p-4 hover:bg-[#111f31] transition delay-1000 ease-in-out hover:p-0 hover:rounded-lg" onClick={handelNavigate}>
      <div>
        <img
          className="max-w-full rounded-lg cursor-pointer"
          src={data.thumbnail}
          alt="image"
        />
      </div>



      <div className="flex justify-between mt-2">
        <div className="flex">
          {/* <span > */}
          <img
            className=" h-7 w-7 text-center rounded-full"
            src={data.channel.avatar}
            alt="channel"
          />
          {/* </span> */}
          <span className="mt-1 ml-1 text-sm">{data.channel.name}</span>
        </div>
        <div className="flex justify-end mr-2">
          <div className="flex">
            <EyeIcon className="h-5 w-5" /> {data.viewCount}
          </div>
          
          <div className="flex pl-2 text-lg">
            <HeartIcon className="h-6 w-6 text-pink-400" />
            {data.favouriteCount}
          </div>

        </div>
      </div>
      <div className="flex justify-between mt-1">
        <div className="flex">
          <ClockIcon className="w-5 h-5" />
          <span className="ml-1"> 01 March, 2024</span>
        </div>
        <div className="flex">
          <EllipsisVerticalIcon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default function Videos() {
  const [videosData, setVideosData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3500/videos")
      .then((res) => res.json())
      .then((data) => setVideosData(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
      {videosData?.map((data) => (
        <Video key={data.id} data={data} />
      ))}
    </div>
  );
}
