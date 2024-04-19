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
    <div className="p-4">
      <table className="border-separate border-spacing-2 w-full">
        <thead>
          <tr>
            <th className="border-2 border-purple-400 rounded-md p-2 bg-gray-200">
              No.
            </th>
            <th className="border-2 border-purple-400 rounded-md p-2 bg-gray-200">
              Status
            </th>
            <th className="border-2 border-purple-400 rounded-md p-2 bg-gray-200">
              Title
            </th>
            <th className="border-2 border-purple-400 rounded-md p-2 bg-gray-200 max-md:hidden">
              Author
            </th>
            <th className="border-2 border-purple-400 rounded-md p-2 bg-gray-200">
              Severity
            </th>
            <th className="border-2 border-purple-400 rounded-md p-2 bg-gray-200">
              Description
            </th>
            <th className="border-2 border-purple-400 rounded-md p-2 bg-gray-200">
              Created
            </th>
            <th className="border-2 border-purple-400 rounded-md p-2 bg-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredIssues.map((issue, index) => (
            <tr key={issues._id} className="h-8">
              <td className="border-2 border-purple-400 rounded-md p-2 text-center">
                {index + 1}
              </td>
              <td className="border-2 border-purple-400 rounded-md p-2 text-center">
                {issue.status}
              </td>
              <td className="border-2 border-purple-400 rounded-md p-2 text-center">
                {issue.title}
              </td>
              <td className="border-2 border-purple-400 rounded-md p-2 text-center max-md:hidden">
                {issue.author}
              </td>
              <td className="border-2 border-purple-400 rounded-md p-2 text-center">
                {issue.severity}
              </td>
              <td className="border-2 border-purple-400 rounded-md p-2 text-center">
                {issue.description}
              </td>
              <td className="border-2 border-purple-400 rounded-md p-2 text-center">
                {new Date(issue.createdAt).toLocaleString()}
              </td>
              <td className="border-2 border-purple-400 rounded-md p-2 text-center">
                <div className="flex justify-center gap-x-4">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuesTable;
