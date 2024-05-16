/* eslint-disable react/prop-types */
import {
  ExclamationCircleIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getAuthData from "../../utils/auth";

function List({ type, item, data, setData }) {
  const navigate = useNavigate();
  const authData = getAuthData();

  function handelNavigate(url) {
    navigate(url);
  }

  function handelRemove(videoId) {
    fetch(`https://cs-world-backend.vercel.app/${type}`, {
      method: type === "history" ? "DELETE" : "PATCH",
      body: JSON.stringify({
        [type]: true,
        userId: authData.id,
        videoId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          const afterRemove = data.filter((video) => video.id !== item.id);
          setData(afterRemove);
        }
      });
  }

  return (
    <div className="border-b-2 border-slate-700 hover:bg-slate-800 text-white flex justify-around">
      <img
        className="max-w-64 p-3 cursor-pointer"
        src={item?.thumbnail}
        onClick={() => handelNavigate(`/video/${item?.id}`)}
      />
      <div
        className="pt-12 cursor-pointer"
        onClick={() => handelRemove(item.id)}
      >
        <TrashIcon className="w-8 h-8 hover:text-red-500" />
      </div>
    </div>
  );
}

// reusable component for saved, favourite, history modal
export default function Modal({ type, title, setIsOpenModal }) {
  const [data, setData] = useState(null);
  const authData = getAuthData();

  useEffect(() => {
    fetch(`https://cs-world-backend.vercel.app/${type}/${authData.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [authData.id, type]);

  return (
    <div
      className="bg-blue-950 w-full sm:w-full md:w-6/12 lg:w-4/12 xl:w-4/12 2xl:w-4/12 h-5/6 fixed top-20 z-20 overflow-y-scroll"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#81ABBC black" }}
    >
      <div className=" flex justify-between border-b-2 border-slate-700 mb-5">
        <div className="text-indigo-400 text-xl text-center py-5 px-3">
          {title}
        </div>

        <div
          className="text-white justify-end"
          onClick={() => setIsOpenModal("")}
        >
          <XMarkIcon className="w-9 h-9 cursor-pointer" />
        </div>
      </div>

      <div className="">
        {data?.map((item) => (
          <List
            key={item?.id}
            type={type}
            item={item}
            data={data}
            setData={setData}
          />
        ))}
        {data?.length === 0 && (
          <div className="flex justify-center text-red-200">
            {" "}
            <ExclamationCircleIcon className="w-8 h-8 px-1" />{" "}
            <p className="text-center font-light text-lg">empty!</p>
          </div>
        )}
      </div>
    </div>
  );
}
