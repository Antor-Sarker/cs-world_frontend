/* eslint-disable react/prop-types */
import {
  ClockIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context";
import getPublishedTime from "../../utils/getPublishedTime";
import { toast } from 'react-toastify';

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
  const [isOpenModify,setIsOpenModify]=useState(false)
  // const [isOpenEdit,setIsOpenEdit]=useState(false)
  const { commentId, authorId, authorName, content, time } = comment;
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
        position:"bottom-center"
      })
        }
      });
  }

  function handelOpenModal(event){
    if(event.target.tagName==='svg' || event.target.tagName==='path'){
      setIsOpenModify(!isOpenModify)
    }
    else{
      setIsOpenModify(false)
    }

  }

  return (
    <>
      <div className="flex items-start space-x-4 my-8" onClick={handelOpenModal}>
        <div className="bg-orange-500 text-white w-10 h-10 mt-3 text-center text-2xl rounded-full">
          <span className="">{authorName[0]}</span>
        </div>

        <div className="w-full bg-slate-800 m-3 rounded p-3">
          <div className="flex justify-between">
            <div>
              <h4 className="text-slate -500 font-bold">{authorName}</h4>
            </div>
            <div>
              {
                authId===authorId  && <EllipsisVerticalIcon className="w-6 h-6" onClick={handelOpenModal}/>
              }

              {isOpenModify && <div className="rounded absolute">
                <div className="cursor-pointer bg-indigo-300 hover:bg-indigo-500 p-3" onClick={handelEdit}>edit</div>
                <div className="cursor-pointer p-3 bg-red-300 hover:bg-red-500" onClick={handelDeleteComment}>delete</div>
              </div>}

               
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
  const [inputComment, setInputComment] = useState("");
  const { authData } = useContext(AuthContext);
  const { id } = useParams();
  const [comments, setComments] = useState(null);
  const bottomRef = useRef(null);
  const authId = authData?.id

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
        position: "top-center"
      });
      setInputComment("");
    }
  }

  function handelScroll(event) {
    bottomRef.current.scrollIntoView();
    event.target.placeholder= authData? "Write a comment":"Please login to comment" 
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
                <HeartIcon className="h-6 w-6" />
                {video?.favouriteCount}
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
                      <button disabled={inputComment==='' && true} className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
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
            <Display key={item.key} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
