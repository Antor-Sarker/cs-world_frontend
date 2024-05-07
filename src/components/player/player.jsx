/* eslint-disable react/prop-types */
import {
  ClockIcon,
  EllipsisVerticalIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context";
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

function CommentList({ comments, setComments, comment, videoId, authId }) {
  const [isOpenModify, setIsOpenModify] = useState(false);
  // const [isOpenEdit,setIsOpenEdit]=useState(false)
  const { commentId, authorId, authorName, content } = comment;
  function handelDeleteComment() {
    fetch("http://localhost:3500/comment", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ videoId, commentId }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          const afterDelete = comments.filter(
            (comment) => comment.commentId !== commentId
          );
          setComments(afterDelete);

          toast.success("delete successfully", {
            theme: "colored",
            position: "bottom-center",
          });
        }
      });
  }

  function handelOpenModal(event) {
    if (event.target.tagName === "svg" || event.target.tagName === "path") {
      setIsOpenModify(!isOpenModify);
    } else {
      setIsOpenModify(false);
    }
  }

  return (
    <>
      <div
        className="flex items-start space-x-4 my-8"
        onClick={handelOpenModal}
      >
        <div className="bg-orange-500 text-white w-10 h-10 mt-3 text-center text-2xl rounded-full">
          <span className="">{authorName[0]}</span>
        </div>

        <div className="w-full bg-slate-800 m-3 rounded p-3">
          <div className="flex justify-between">
            <div>
              <h4 className="text-slate -500 font-bold">{authorName}</h4>
            </div>
            <div>
              {authId === authorId && (
                <EllipsisVerticalIcon
                  className="w-6 h-6"
                  onClick={handelOpenModal}
                />
              )}

              {isOpenModify && (
                <div className="rounded absolute">
                  <div className="cursor-pointer bg-indigo-300 hover:bg-indigo-500 p-3">
                    edit
                  </div>
                  <div
                    className="cursor-pointer p-3 bg-red-300 hover:bg-red-500"
                    onClick={handelDeleteComment}
                  >
                    delete
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-slate-300">{content}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Player() {
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteCount, setFavouriteCount] = useState(0);
  const [inputComment, setInputComment] = useState("");
  const { authData } = useContext(AuthContext);
  const { id } = useParams();
  const [comments, setComments] = useState(null);
  const bottomRef = useRef(null);
  const authId = authData?.id;

  useEffect(() => {
    fetch(`http://localhost:3500/video/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVideo(data);
        setComments(video?.comments);
      });
  }, [id, video?.comments]);

  useEffect(() => {
    fetch(`http://localhost:3500/videos`)
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  useEffect(() => {
    setFavouriteCount(video?.favouriteUser?.length);
    if (authData) {
      const result = video?.favouriteUser?.find(
        (item) => item === authData?.id
      );
      result ? setIsFavourite(true) : setIsFavourite(false);
    }
  }, [authData, video?.favouriteUser]);

  function handelFavourite() {
    if (!authData) {
      //alert for login
      toast.error("Please Login !", {
        position: "top-center",
      });
    } else {
      fetch("http://localhost:3500/favourite", {
        method: "PATCH",
        body: JSON.stringify({
          isFavourite: isFavourite ? true : false,
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

      fetch(`http://localhost:3500/comment?videoId=${id}`, {
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

            <div className="flex">
              <EllipsisVerticalIcon className="h-7 w-7" />
            </div>
          </div>

          <section ref={bottomRef}>
            <div className="mx-auto w-full md:w-10/12 container">
              <h2 className="text-indigo-300 text-xl font-bold my-5">
                Comments ({video?.comments?.length})
              </h2>
              <div className="flex items center space-x-4">
                <div className="bg-orange-500 text-white text-2xl h-20 w-20 text-center p-6 rounded-full">
                  A
                </div>
                <div className="w-10/12">
                  <form onSubmit={handelOnSubmitComment}>
                    <textarea
                      className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                      placeholder="Write a comment"
                      onChange={(event) => setInputComment(event.target.value)}
                      onFocus={(e) => handelScroll(e)}
                      value={inputComment}
                    ></textarea>
                    <div className="flex justify-end mt-4">
                      <button
                        disabled={inputComment === "" && true}
                        className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                      >
                        Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* display comments */}
            {comments?.map((comment) => (
              <CommentList
                key={comment.commentId}
                comments={comments}
                setComments={setComments}
                comment={comment}
                videoId={video.id}
                authId={authId}
              />
            ))}
          </section>
        </div>

        <div className="col-span-2 px-10 hidden sm:hidden md:hidden lg:block xl:block 2xl:block h-screen overflow-y-scroll">
          {videos?.map((item) => (
            <Display key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
