/* eslint-disable react/prop-types */
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";

function List({ item, savedData, setSavedData }) {
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);

  function handelNavigate(url) {
    navigate(url);
  }

  function handelRemoveSaved(videoId) {
    fetch("http://localhost:3500/saved", {
      method: "PATCH",
      body: JSON.stringify({
        isSaved: true,
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
          const afterRemove = savedData.filter((video) => video.id !== item.id);
          setSavedData(afterRemove);
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
        onClick={() => handelRemoveSaved(item.id)}
      >
        <TrashIcon className="w-8 h-8 hover:text-red-500" />
      </div>
    </div>
  );
}

export default function Saved({ setIsOpenSavedModal }) {
  const [savedData, setSavedData] = useState(null);
  const { authData } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3500/saved/${authData.id}`)
      .then((res) => res.json())
      .then((data) => setSavedData(data));
  }, [authData.id]);

  return (
    <div
      className="bg-blue-950 w-full sm:w-full md:w-6/12 lg:w-4/12 xl:w-4/12 2xl:w-4/12 h-screen fixed top-20 z-20 overflow-y-scroll"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#81ABBC black" }}
    >
      <div className=" flex justify-between border-b-2 border-slate-700 mb-5">
        <div className="text-indigo-400 text-xl text-center py-5 px-3">
          Saved Videos
        </div>

        <div
          className="text-white justify-end"
          onClick={() => setIsOpenSavedModal(false)}
        >
          <XMarkIcon className="w-9 h-9 cursor-pointer" />
        </div>
      </div>

      <div className="">
        {savedData?.map((item) => (
          <List
            key={item?.id}
            item={item}
            savedData={savedData}
            setSavedData={setSavedData}
          />
        ))}
        {savedData?.length === 0 && <p>empty</p>}
      </div>
    </div>
  );
}
