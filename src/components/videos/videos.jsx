/* eslint-disable react/prop-types */
import {
  BookmarkSlashIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getPublishedTime from "../../utils/getPublishedTime";

import { useEffect, useState } from "react";
import getAuthData from "../../utils/auth";

function Video({ data, isOpenModal, isOpenFilter }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isOpenSaveButton, setIsOpenSaveButton] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [favouriteCount, setFavouriteCount] = useState(0);

  const navigate = useNavigate();
  const authData = getAuthData();

  //for update favourite and saved button when rerender
  useEffect(() => {
    setFavouriteCount(data.favouriteUser.length);
    if (getAuthData()) {
      const existFavourite = data?.favouriteUser?.find(
        (item) => item === authData?.id
      );
      existFavourite ? setIsFavourite(true) : setIsFavourite(false);

      const existSaved = data?.savedUser?.find((item) => item === authData?.id);
      existSaved ? setIsSaved(true) : setIsSaved(false);
    }
  }, [authData?.id, data.favouriteUser, data?.savedUser]);

  function handelNavigate() {
    if (isOpenModal || isOpenFilter) return;
    fetch("https://cs-world-backend.vercel.app/viewCount", {
      method: "POST",
      body: JSON.stringify({ videoId: data.id, logedInUser: authData }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => {
      res && navigate(`video/${data.id}`);
    });
  }

  function handelFavourite() {
    if (!authData) {
      //alert for login
      toast.error("Please Login !", {
        position: "top-center",
      });
    } else {
      fetch("https://cs-world-backend.vercel.app/favourite", {
        method: "PATCH",
        body: JSON.stringify({
          favourite: isFavourite ? true : false,
          userId: authData.id,
          videoId: data.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            isFavourite
              ? setFavouriteCount((prev) => prev - 1)
              : setFavouriteCount((prev) => prev + 1);
            setIsFavourite(!isFavourite);
          }
        });
    }
  }

  function handelSave() {
    if (!authData) {
      //alert for login
      toast.error("Please Login !", {
        position: "top-center",
      });
      setIsOpenSaveButton(false);
    } else {
      fetch("https://cs-world-backend.vercel.app/saved", {
        method: "PATCH",
        body: JSON.stringify({
          saved: isSaved ? true : false,
          userId: authData.id,
          videoId: data.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            !isSaved &&
              toast.success("Saved to Watch later", {
                theme: "colored",
                position: "top-center",
              });
            setIsSaved(!isSaved);

            setIsOpenSaveButton(false);
          }
        });
    }
  }

  return (
    <div className="text-sm text-[#b9d0ec] transition delay-1000 hover:scale-105 p-4 hover:rounded-lg">
      <div>
        <img
          className="max-w-full rounded-lg cursor-pointer"
          src={data.thumbnail}
          alt="image"
          onClick={handelNavigate}
        />
      </div>

      <div className="flex justify-between mt-2">
        <div className="flex">
          <img
            className=" h-7 w-7 text-center rounded-full"
            src={data.channel.avatar}
            alt="channel"
          />

          <span className="mt-1 ml-1 text-sm">{data.channel.name}</span>
        </div>
        <div className="flex justify-end mr-2">
          <div className="flex">
            <EyeIcon className="h-5 w-5" /> {data.viewCount}
          </div>

          <div className="flex pl-2 text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${
                isFavourite ? "fill-current" : "hover:fill-current"
              }  cursor-pointer`}
              onClick={handelFavourite}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            {favouriteCount}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-1">
        <div className="flex">
          <ClockIcon className="w-5 h-5" />
          <span className="ml-1">{getPublishedTime(data.publishedAt)}</span>
        </div>
        <div className="flex">
          {isOpenSaveButton && (
            <div className="relative text-black font-semibold bg-slate-300 rounded cursor-pointer">
              {" "}
              {isSaved ? (
                <div className="flex px-1" onClick={handelSave}>
                  <BookmarkSlashIcon className="w-5 h-5" />
                  Unsave
                </div>
              ) : (
                <div className="px-1" onClick={handelSave}>
                  Save to Watch later
                </div>
              )}
            </div>
          )}

          <EllipsisVerticalIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => setIsOpenSaveButton(!isOpenSaveButton)}
          />
        </div>
      </div>
    </div>
  );
}

export default function Videos({ videosData, isOpenModal, isOpenFilter }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
      {videosData?.map((data) => (
        <Video
          key={data.id}
          data={data}
          isOpenModal={isOpenModal}
          isOpenFilter={isOpenFilter}
        />
      ))}
    </div>
  );
}
