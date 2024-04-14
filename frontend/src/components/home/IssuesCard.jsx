import React from "react";

import SingleIssueCard from './SingleIssueCard';

const IssuesCard = ({ issues }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {issues.map((item, index) => (
       <SingleIssueCard key={item._id} issue={item} index={index}/>
      ))}
    </div>
  );
};

export default IssuesCard;
