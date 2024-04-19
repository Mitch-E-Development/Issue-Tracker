import React from "react";
import { AiOutlineClose, AiOutlineFolderOpen } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
// import { MdOutlineNumbers } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";

const IssueModal = ({ issue, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-purple-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-purple-400 text-white rounded-lg text-xl">
          {new Date(issue.createdAt).toLocaleDateString()}
        </h2>

        <div className="flex justify-start items-center gap-x-2 mt-10">
          <IoKeyOutline className="text-purple-400 text-3xl" />
          <h2 className="my-1 text-xl">{issue._id}</h2>
        </div>

        <div className="flex justify-start items-center gap-x-2">
          <AiOutlineFolderOpen className="text-purple-400 text-3xl" />
          <h2 className="my-1 text-xl">{issue.title}</h2>
        </div>

        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-purple-400 text-3xl" />
          <h2 className="my-1 text-xl">{issue.author}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <MdOutlineDescription className="text-purple-400 text-3xl" />
          <h2 className="my-1 text-xl">{issue.description}</h2>
        </div>
        <h2 className="mt-10 text-2xl">
          <b>Issue Notes:</b>
        </h2>
        <div className="my-2">
          <ul>
            {issue.notes.map((note, index) => (
              <>
                <li key={index} className="text-xl">
                  {index + 1}. {note}
                </li>
                <hr />
              </>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IssueModal;
