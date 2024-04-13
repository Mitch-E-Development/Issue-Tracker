import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteIssue = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  const handleDeleteIssue = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/issues/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');

      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      })
  }


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Issue</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this issue?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteIssue}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteIssue;
