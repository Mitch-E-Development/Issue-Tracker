import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditIssue = () => {
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [severity, setSeverity] = useState(0);
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/issues/${id}`)
      .then((res) => {
        setStatus(res.data.status);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setSeverity(res.data.severity);
        setDescription(res.data.description);
        setNotes(res.data.notes);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [id]);

  const handleAddNote = () => {
    if (newNote !== "") {
      // Check if the new note is not empty
      const updatedNotes = notes; // Create a copy of the existing notes array
      updatedNotes.push(newNote + " - " + new Date().toLocaleString()); // Push the new note onto the copied array
      setNotes(updatedNotes); // Set the updated array as the new state
      setNewNote("");
    }
  };

  const handleSaveIssue = () => {
    if (!status) {
      enqueueSnackbar('Please select a status', { variant: 'error' });
      return;
    }

    const data = {
      status,
      title,
      author,
      severity,
      description,
      notes,
    };
    setLoading(true);

    axios
      .put(`http://localhost:3000/issues/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Issue Updated Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error.message);
      });
  };

  return (
    <div className="px-4 py-10">
      <BackButton />
      <h1 className="text-3xl text-center my-4">Edit Issue</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-purple-400 rounded-xl w-[75%] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Status:</label>
          <select
            className="border border-gray-500 bg-white"
            value={status}
            onChange={(e) => {setStatus(e.target.value)}}
          >
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="Resolved">Resolved</option>
            <option value="Verified">Verified</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Severity:</label>
          <input
            type="number"
            min={1}
            max={10}
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="border-2 border-gray-500 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Add Note:</label>
          <input
            type="text"
            placeholder=""
            value={newNote}
            onChange={(e) => setNewNote([e.target.value])}
            className="border-2 border-gray-500 w-full"
          />
          <button className="text-white bg-purple-900 hover:bg-sky-600 rounded-lg p-2 my-4" onClick={handleAddNote}>
            Add Note
          </button>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Notes:</label>
          <ul>
            {notes.map((note, index) => (
              <li key={index} className="mt-5">
                <div>
                  {index + 1}. {note}
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </div>
        <button className="text-white bg-purple-900 hover:bg-sky-600 rounded-lg p-2 m-8" onClick={handleSaveIssue}>
          Save New Issue
        </button>
      </div>
    </div>
  );
};

export default EditIssue;
