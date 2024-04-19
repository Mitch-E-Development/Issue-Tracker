import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const CreateIssues = () => {
  // const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [severity, setSeverity] = useState(0);
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar }= useSnackbar();

  const handleSaveIssue = () => {
    const data = {
      status:'New',
      title,
      author,
      severity,
      description,
      notes: notes + ' - ' + new Date().toLocaleString()
    };
    setLoading(true);

    axios
      .post('http://localhost:3000/issues', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Issue Created Successfully', {variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false)
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(error.message)
      });
  };

  return (
    <div className='px-4 py-10'>
      <BackButton />
      <h1 className='text-3xl text-center my-4'>Create Issue</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-purple-400 rounded-xl w-[75%] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title:</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 w-full'  
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author:</label>
          <input 
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 w-full'  
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Severity:</label>
          <input 
            type="number"
            min={1}
            max={10}
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className='border-2 border-gray-500 w-full'  
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description:</label>
          <input 
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 w-full'  
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Note:</label>
          <input 
            type="text"
            value={notes}
            onChange={(e) => setNotes([e.target.value])}
            className='border-2 border-gray-500 w-full'  
          />
        </div>
        <button className='text-white bg-purple-900 hover:bg-sky-600 rounded-lg p-2 m-8' onClick={handleSaveIssue}>
          Save New Issue
        </button>
      </div>
    </div>
  );
};

export default CreateIssues;
