import { useEffect, useState } from 'react';
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
        setIssue(res.data)
        setNotes(res.data.notes)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

  return (
    <div className='px-4 py-10'>
      <BackButton />
      <h1 className='text-3xl text-center my-4'>Show Issue</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-purple-400 rounded-xl w-[75%] p-4 mx-auto'>
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
            <span className='text-xl mr-4 text-gray-500'>Created:</span>
            <span>{new Date(issue.createdAt).toLocaleString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Updated:</span>
            <span>{new Date(issue.updatedAt).toLocaleString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Notes:</span>
            <ul>
            {issueNotes.map((note, index) => (
              <li key={index} className='mt-5'>
                <div>{index + 1}. {note}</div>
                <hr />
              </li>
            ))}
          </ul>
          </div>
        </div>
        
        
      )}
    </div>
  );
};

export default ShowIssue;
