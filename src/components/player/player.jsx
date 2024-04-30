/* eslint-disable react/prop-types */
import {
  ClockIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPublishedTime from "../../utils/getPublishedTime";

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

  useEffect(() => {
    fetch(`http://localhost:3500/videos`)
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <>
      <div className="grid grid-cols-6 pt-5 bg-black text-white">
        <div className="p-4 col-start-1 col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4">
          <iframe
            className="w-full h-96 rounded bg-[#0d0d0e] p-2 shadow-md"
            src={video?.videoLink}
          />

          <div className="flex justify-around mt-4 font-light">
            <div className="">
              <div className="flex">
                <img
                  className=" h-7 w-7 text-center rounded-full"
                  src={video?.channel.avatar}
                  alt="channel"
                />
                <span className="mt-1 ml-1 text-indigo-300">
                  {video?.channel.name}
                </span>
              </div>

              <div className="flex text-sm text-indigo-100 mt-3">
                <ClockIcon className="w-4 h-4 text-sm" />
                <span className="ml-1">
                  {getPublishedTime(video?.publishedAt)}
                </span>
              </div>
            </div>

            <div className="flex">
              <div className="flex text-indigo-300">
                <div>
                  <EyeIcon className="h-6 w-6" />
                </div>
                {video?.viewCount}
              </div>

              <div className="flex text-lg pl-5 text-indigo-400">
                <HeartIcon className="h-6 w-6" />
                {video?.favouriteCount}
              </div>
            </div>

            <div className="flex">
              <EllipsisVerticalIcon className="h-7 w-7" />
            </div>
          </div>

          <section id="comments">
            <div className="mx-auto w-full md:w-10/12 container">
              <h2 className="text-indigo-300 text-xl font-bold my-5">
                Comments (10)
              </h2>
              <div className="flex items center space-x-4">
                <div className="bg-orange-500 text-white text-2xl h-20 w-20 text-center p-6 rounded-full">
                  A
                </div>
                <div className="w-10/12">
                  <textarea
                    className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                    placeholder="Write a comment"
                  ></textarea>
                  <div className="flex justify-end mt-4">
                    <button className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="col-span-2 px-10 hidden sm:hidden md:hidden lg:block xl:block 2xl:block h-screen overflow-y-scroll">
          {videos?.map((item) => (
            <Display key={item.key} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
