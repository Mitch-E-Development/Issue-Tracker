import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import {BsInfoCircle }from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

import Spinner from '../components/Spinner';


const Home = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3000/issues')
      .then((res) => {
        setIssues(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
      .finally(
        setLoading(false)
      )
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
       <h1 className='text-3xl m-8'>Issues List</h1>
       <Link to='/issues/create'>
        <MdOutlineAddBox className='text-sky-800 text-4xl'/>
       </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-hidden border border-sky-400 rounded-xl">
        <table className='w-full rounded-xl'>
          <thead>
            <tr className='bg-gray-200 border-b-2 border-b-sky-400'>
              <th className='border border-sky-400 rounded-md p-2'>No.</th>
              <th className='border border-sky-400 rounded-md p-2'>Number</th>
              <th className='border border-sky-400 rounded-md p-2'>Title</th>
              <th className='border border-sky-400 rounded-md p-2 max-md:hidden'>Author</th>
              <th className='border border-sky-400 rounded-md p-2'>Severity</th>
              <th className='border border-sky-400 rounded-md p-2'>Description</th>
              <th className='border border-sky-400 rounded-md p-2'>Modified On</th>
              <th className='border border-sky-400 rounded-md p-2'>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, index) => (
              <tr key={issue._id}>
                 <td className='border border-sky-400 rounded-md text-center p-2'>
                  {index + 1}
                </td>
                <td className='border border-sky-400 rounded-md text-center p-2'>{issue.status}</td>
                <td className='border border-sky-400 rounded-md text-center p-2' >{issue.title}</td>
                <td className='border border-sky-400 rounded-md text-center max-md:hidden p-2'>{issue.author}</td>
                <td className='border border-sky-400 rounded-md text-center p-2'>{issue.severity}</td>
                <td className='border border-sky-400 rounded-md text-center p-2'>{issue.description}</td>
                <td className='border border-sky-400 rounded-md text-center p-2'>{new Date(issue.updatedAt).toLocaleDateString()}</td>
                <td className='border border-sky-400 rounded-md text-center p-2'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/issues/details/${issue._id}\n`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/issues/edit/${issue._id}\n`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/issues/delete/${issue._id}\n`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link> 
                  </div>          
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default Home;
