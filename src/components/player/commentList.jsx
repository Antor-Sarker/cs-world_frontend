/* eslint-disable react/prop-types */
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
export default function CommentList({
  authId,
  comment,
  handelDeleteComment,
  handelEditInput,
  setIsEdit,
  bottomRef,
  inputRef,
}) {
  const [isOpenModify, setIsOpenModify] = useState(false);
  const { commentId, authorId, authorName, content } = comment;

  function handelOpenModal(event) {
    if (event.target.tagName === "svg" || event.target.tagName === "path") {
      setIsOpenModify(!isOpenModify);
    } else {
      setIsOpenModify(false);
    }
  }

  function handelEditButton() {
    handelEditInput(commentId);
    setIsEdit(true);
    bottomRef.current.scrollIntoView();
    inputRef.current.focus();
  }

  return (
    <>
      <div
        className="flex items-start space-x-4 my-8"
        onClick={handelOpenModal}
      >
        <div
          className={`${
            authId === authorId ? "bg-red-500" : "bg-green-500"
          } text-white w-10 h-10 mt-3 text-center text-2xl rounded-full`}
        >
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
                  className="w-6 h-6 cursor-pointer"
                  onClick={handelOpenModal}
                />
              )}

              {isOpenModify && (
                <div className="absolute cursor-pointer">
                  <div
                    className=" rounded-t cursor-pointer bg-indigo-500 hover:bg-indigo-700 p-3"
                    onClick={handelEditButton}
                  >
                    edit
                  </div>
                  <div
                    className=" rounded-b cursor-pointer p-3 bg-red-500 hover:bg-red-700"
                    onClick={() => handelDeleteComment(commentId)}
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
