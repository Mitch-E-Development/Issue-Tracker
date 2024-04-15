import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import {
  MdOutlineAddBox,
  MdOutlineNoteAdd,
  MdOutlineDelete,
} from "react-icons/md";

const IssuesTable = ({ issues, search }) => {
  
  const filterIssues = () => {
    const searchLower = search.toLowerCase();
    if (searchLower === "") return issues; // Show all if search is empty
    return issues.filter((issue) => {
      const fields = [
        issue.status.toLowerCase(),
        issue.title.toLowerCase(),
        issue.author.toLowerCase(),
        issue.severity.toString(),
        issue.description.toLowerCase(),
      ];
      const concatenatedFields = fields.join(" ");
      return concatenatedFields.includes(searchLower);
    });
  };

  const filteredIssues = filterIssues();

  return (
    <div className="overflow-hidden border border-sky-400 rounded-xl">
      <table className="w-full border-sky-400 rounded-xl">
        <thead>
          <tr className="bg-gray-200 border-b-2 border-b-sky-400">
            <th className="border border-sky-400 rounded-md p-2">No.</th>
            <th className="border border-sky-400 rounded-md p-2">Status</th>
            <th className="border border-sky-400 rounded-md p-2">Title</th>
            <th className="border border-sky-400 rounded-md p-2 max-md:hidden">
              Author
            </th>
            <th className="border border-sky-400 rounded-md p-2">Severity</th>
            <th className="border border-sky-400 rounded-md p-2">
              Description
            </th>
            <th className="border border-sky-400 rounded-md p-2">Created</th>
            <th className="border border-sky-400 rounded-md p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
            {filteredIssues.map((issue, index) => (
              <tr key={issue._id}>
                <td className="border border-sky-400 rounded-md text-center p-2">
                  {index + 1}
                </td>
                <td className="border border-sky-400 rounded-md text-center p-2">
                  {issue.status}
                </td>
                <td className="border border-sky-400 rounded-md text-center p-2">
                  {issue.title}
                </td>
                <td className="border border-sky-400 rounded-md text-center max-md:hidden p-2">
                  {issue.author}
                </td>
                <td className="border border-sky-400 rounded-md text-center p-2">
                  {issue.severity}
                </td>
                <td className="border border-sky-400 rounded-md text-center p-2">
                  {issue.description}
                </td>
                <td className="border border-sky-400 rounded-md text-center p-2">
                  {new Date(issue.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-sky-400 rounded-md text-center p-2">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/issues/details/${issue._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    {/* <Link to={`/issues/notes/${issue._id}`}>
                      <MdOutlineNoteAdd className='text-2xl text-sky-800' />
                    </Link> */}
                    <Link to={`/issues/edit/${issue._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/issues/delete/${issue._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuesTable;
