import React from 'react'
import { Link } from "react-router-dom";
import { AiOutlineFolderOpen, AiOutlineEdit } from "react-icons/ai";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineNumbers } from "react-icons/md";
import { useState } from 'react';

import IssueModal from './IssueModal';

const SingleIssueCard = ({ issue, index }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
    key={issue._id}
    className="border-2 border-purple-400 rounded-lg px-4 pt-10 m-4 relative hover:shadow-xl"
  >
    <h2 className="absolute top-1 right-2 px-4 py-1 bg-purple-400 rounded-lg text-white">
      {new Date(issue.createdAt).toLocaleDateString()}
    </h2>

    <div className="flex justify-start items-center gap-x-2">
      <MdOutlineNumbers className="text-purple-400 text-2xl" />
      <h2 className="my-1">{index + 1}</h2>
    </div>

    <div className="flex justify-start items-center gap-x-2">
      <AiOutlineFolderOpen className="text-purple-400 text-2xl" />
      <h2 className="my-1">{issue.title}</h2>
    </div>

    <div className="flex justify-start items-center gap-x-2">
      <BiUserCircle className="text-purple-400 text-2xl" />
      <h2 className="my-1">{issue.author}</h2>
    </div>

    <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
      <BiShow className='text-3xl text-blue-800 hover:text-sky-600 cursor-pointer' onClick={() => setShowModal(true)}/>
      <Link to={`/issues/details/${issue._id}`}>
        <BsInfoCircle className="text-2xl text-green-800 hover:text-sky-600" />
      </Link>
      <Link to={`/issues/edit/${issue._id}`}>
        <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-sky-600" />
      </Link>
      <Link to={`/issues/delete/${issue._id}`}>
        <MdOutlineDelete className="text-2xl text-red-600 hover:text-sky-600" />
      </Link>
    </div>
    {
      showModal && (
        <IssueModal issue={issue} onClose={() => setShowModal(false)} />
      )
    }
  </div>
  )
}

export default SingleIssueCard
