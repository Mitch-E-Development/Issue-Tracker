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
        <table className='w-full border-separate border-spacing-2'>
                   <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>ID</th>
              <th className='border border-slate-600 rounded-md'>Status</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md'>Author</th>
              <th className='border border-slate-600 rounded-md'>Severity</th>
              <th className='border border-slate-600 rounded-md'>Description</th>
              <th className='border border-slate-600 rounded-md'>Created On</th>
              <th className='border border-slate-600 rounded-md'>Modified On</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue._id}>
                <td className='border border-slate-600 rounded-md'>{issue._id}</td>
                <td className='border border-slate-600 rounded-md'>{issue.status}</td>
                <td className='border border-slate-600 rounded-md'>{issue.title}</td>
                <td className='border border-slate-600 rounded-md'>{issue.author}</td>
                <td className='border border-slate-600 rounded-md'>{issue.severity}</td>
                <td className='border border-slate-600 rounded-md'>{issue.description}</td>
                <td className='border border-slate-600 rounded-md'>{issue.createdAt}</td>
                <td className='border border-slate-600 rounded-md'>{issue.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
