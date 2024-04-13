import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowIssue = () => {
  const [issue, setIssue] = useState({});
  const [issueNotes, setNotes] = useState([])
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/issues/${id}`)
      .then((res) => {
        // console.log(res.data.data)
        setIssue(res.data)
        setNotes(res.data.notes)
        setLoading(false);
        // console.log(issue)
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
      });
  }, []);

  

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Issue</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>ID:</span>
            <span>{issue._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Status:</span>
            <span>{issue.status}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title:</span>
            <span>{issue.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author:</span>
            <span>{issue.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Severity:</span>
            <span>{issue.severity}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Description:</span>
            <span>{issue.description}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Created On</span>
            <span>{new Date(issue.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update</span>
            <span>{new Date(issue.updatedAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Notes:</span>
            {/* <span>{issue.notes}</span> */}
            <ul>
              {issueNotes.map((note, index) => (
                <li key={index}>{index + 1}. {note}</li>
              ))}
            </ul>
          </div>
        </div>
        
        
      )}
    </div>
  );
};

export default ShowIssue;
