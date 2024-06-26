import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteIssue = () => {
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar()

  const handleDeleteIssue = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/issues/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Issue Deleted Successfully', {variant: 'success'})
        navigate('/');

      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(error);
      })
  }


  return (
    <div className='px-4 py-10'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center'>Delete Issue</h1>
      {loading ? <Spinner /> : ''}
      <div className='my-10 flex flex-col items-center border-2 border-purple-600 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this issue?</h3>

        <button
          className='p-2 bg-red-600 text-white m-8 w-[60%] rounded-lg'
          onClick={handleDeleteIssue}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteIssue;
