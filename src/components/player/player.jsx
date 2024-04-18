/* eslint-disable react/prop-types */
import {
  ClockIcon,
  EllipsisVerticalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Display({ item }) {
  return (
    <>
      <div className="m-3">
        <img
          className="rounded cursor-pointer"
          src={item.thumbnail}
          alt="image"
        />
      </div>
    </>
  );
}

export default function Player() {
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3500/video/${id}`)
      .then((res) => res.json())
      .then((data) => setVideo(data));
  }, [id]);

  useEffect(() => {}, []);

  useEffect(() => {
    fetch(`http://localhost:3500/videos`)
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);
  // console.log(video);

  return (
    <div className="grid grid-cols-6 pt-5 bg-black text-white">
      <div className="p-3 col-start-1 col-span-4">
        {/* https://www.youtube.com/embed/MIL2BK02X8A?autoplay=1&mute=1 */}
        {/* https://www.youtube.com/embed/MIL2BK02X8A?autoplay=1&rel=0&controls=0&showinfo=0 */}
        {/* <iframe className="w-full h-96 rounded" src= "https://www.youtube.com/embed/MIL2BK02X8A?autoplay=1&rel=1&controls=0&showinfo=0"/> */}
        <iframe className="w-full h-96 rounded" src={video?.videoLink} />

        <div className="flex justify-evenly">
          <div className="flex">
            <img
              className=" h-7 w-7 text-center rounded-full"
              src={video?.channel.avatar}
              alt="channel"
            />
            <span className="mt-1 ml-1 text-sm">{video?.channel.name}</span>
          </div>
          <div className="text-3xl">{video?.title}</div>
        </div>




        <div className="flex justify-between mt-1">
          <div className="flex">
            <ClockIcon className="w-5 h-5" />
            <span className="ml-1"> 01 March, 2024</span>
          </div>

          <div className="flex">
              <div className="flex">
                views { video?.viewCount}
              </div>

              <div className="flex text-lg">
                <HeartIcon className="h-6 w-6 text-pink-400" />
                {video?.favouriteCount}
              </div>

            </div>
          <div className="flex">
            <EllipsisVerticalIcon className="h-6 w-6" />
          </div>
        </div>


        <div className="flex justify-between mt-2">
          <div className="flex bg-blue-600">
            
          </div>
        </div>

        
      </div>

      <div className="col-span-2 px-10 h-screen overflow-y-scroll">
        {videos?.map((item) => (
          <Display key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}
