/* eslint-disable react/prop-types */
import {
  BookmarkSlashIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import getAuthData from "../../utils/auth";
import getPublishedTime from "../../utils/getPublishedTime";
import CommentList from "./commentList";
import Similar from "./similar";

export default function Player() {
  const [video, setVideo] = useState(null);
  const [similarVideos, setSimilarVideos] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteCount, setFavouriteCount] = useState(0);
  const [isOpenSaveButton, setIsOpenSaveButton] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [inputComment, setInputComment] = useState("");
  const { id } = useParams();
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const authData = getAuthData();

  useEffect(() => {
    fetch(`https://cs-world-backend.vercel.app/video/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVideo(data);
      });
  }, [id]);

  useEffect(() => {
    fetch(`https://cs-world-backend.vercel.app/videos`)
      .then((res) => res.json())
      .then((data) => {
        const similarData = data?.filter((videoData) => {
          const result = videoData?.tags.find((tag) => {
            const isExist = video?.tags?.find(
              (item) => item === tag && video.id !== videoData.id
            );

            if (isExist) return true;
            else return false;
          });
          if (result) return true;
          else return false;
        });
        setSimilarVideos(similarData);
      });
  }, [video]);

  useEffect(() => {
    setFavouriteCount(video?.favouriteUser?.length);
    if (getAuthData()) {
      const existFavourite = video?.favouriteUser?.find(
        (item) => item === authData?.id
      );
      existFavourite ? setIsFavourite(true) : setIsFavourite(false);

      const existSaved = video?.savedUser?.find(
        (item) => item === authData?.id
      );
      existSaved ? setIsSaved(true) : setIsSaved(false);
    }
  }, [authData?.id, video?.favouriteUser, video?.savedUser]);

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
          videoId: video.id,
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
          videoId: video.id,
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

  function handelOnSubmitComment(event) {
    event.preventDefault();

    if (authData && inputComment) {
      const commentsData = {
        commentId: crypto.randomUUID(),
        authorId: authData.id,
        authorName: authData.firstName + " " + authData.lastName,
        content: inputComment,
        time: new Date(),
      };

      fetch(`https://cs-world-backend.vercel.app/comment?videoId=${id}`, {
        method: "POST",
        body: JSON.stringify(commentsData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            setVideo({ ...video, comments: [commentsData, ...video.comments] });
            setInputComment("");
          }
        });
    } else {
      //alert for login
      toast.error("Please Login !", {
        position: "top-center",
      });
      setInputComment("");
    }
  }

  function handelEdit(event) {
    event.preventDefault();

    fetch("https://cs-world-backend.vercel.app/comment", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        videoId: video?.id,
        commentId: editId,
        content: inputComment,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          const afterUpdate = video?.comments.map((comment) => {
            if (comment.commentId === editId) {
              return { ...comment, content: inputComment };
            } else return comment;
          });

          setVideo({ ...video, comments: [...afterUpdate] });
          setInputComment("");
          setIsEdit(false);

          toast.success("update successfully", {
            theme: "colored",
            position: "bottom-center",
          });
        }
      });
  }

  function handelDeleteComment(commentId) {
    fetch("https://cs-world-backend.vercel.app/comment", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ videoId: video?.id, commentId }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          const afterDelete = video?.comments.filter(
            (comment) => comment.commentId !== commentId
          );

          setVideo({ ...video, comments: [...afterDelete] });

          toast.success("delete successfully", {
            theme: "colored",
            position: "bottom-center",
          });
        }
      });
  }

  function handelEditInput(commentId) {
    setIsEdit(true);
    setEditId(commentId);

    const existedComment = video?.comments?.find(
      (item) => item.commentId === commentId
    );
    setInputComment(existedComment?.content);
  }

  function handelScroll(event) {
    bottomRef.current.scrollIntoView();
    event.target.placeholder = authData
      ? "Write a comment"
      : "Please login to comment";
  }

  return (
    <>
      <div className="grid grid-cols-6 pt-5 bg-black text-white">
        <div className="p-4 col-start-1 col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4">
          {/* play video  */}
          <iframe
            className="w-full h-96 rounded bg-[#0d0d0e] p-2 shadow-md"
            src={video?.videoLink}
          />
          <div className="flex justify-around  mt-4 font-light">
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

            <div className="">
              {isOpenSaveButton && (
                <div className="text-black absolute m-6 mt-0 bg-slate-300 rounded p-1 cursor-pointer">
                  {" "}
                  {isSaved ? (
                    <div className="flex" onClick={handelSave}>
                      <BookmarkSlashIcon className="w-5 h-5" />
                      Unsave
                    </div>
                  ) : (
                    <div onClick={handelSave}>Save to Watch later</div>
                  )}
                </div>
              )}

              <EllipsisVerticalIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => setIsOpenSaveButton(!isOpenSaveButton)}
              />
            </div>
          </div>

          {/* input comment */}
          <section ref={bottomRef}>
            <div className="mx-auto w-full md:w-10/12 container">
              <h2 className="text-indigo-300 text-xl font-bold my-5">
                Comments ({video?.comments?.length})
              </h2>
              <div className="flex items center space-x-4">
                <div className="bg-red-500 text-white text-2xl h-20 w-20 text-center p-6 rounded-full">
                  {authData?.firstName[0]}
                </div>
                <div className="w-10/12">
                  <form onSubmit={isEdit ? handelEdit : handelOnSubmitComment}>
                    <textarea
                      className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                      placeholder="Write a comment"
                      onChange={(event) => setInputComment(event.target.value)}
                      onFocus={(e) => handelScroll(e)}
                      ref={inputRef}
                      value={inputComment}
                    ></textarea>
                    <div className="flex justify-end mt-4">
                      <button
                        disabled={inputComment === "" && true}
                        className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                      >
                        {isEdit ? "update" : "Comment"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* display comments */}
            {video?.comments?.map((comment) => (
              <CommentList
                key={comment.commentId}
                authId={authData?.id}
                comment={comment}
                handelDeleteComment={handelDeleteComment}
                handelEditInput={handelEditInput}
                setIsEdit={setIsEdit}
                bottomRef={bottomRef}
                inputRef={inputRef}
              />
            ))}
          </section>
        </div>

        {/* display similar videos */}
        <div className="col-span-2 px-10 hidden sm:hidden md:hidden lg:block xl:block 2xl:block h-screen overflow-y-scroll">
          <Similar similarVideos={similarVideos} />
        </div>
      </div>
    </>
  );
}
