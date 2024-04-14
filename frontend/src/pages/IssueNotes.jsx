import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import axios from "axios";

const IssueNotes = () => {
  const [newNote, setNewNote] = useState("");
  const [currentNotes, setCurrentNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/issues/${id}`)
      .then((res) => {
        setCurrentNotes(res.data.notes);
        // setNotes(res.data.notes);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addNote = (newNote) => {
    setCurrentNotes([...currentNotes, newNote]); // Add the new note to the current notes array
  };

  const handleAddClick = () => {
    if (newNote !== "") {
      addNote({
        content: newNote,
        timestamp: new Date().toISOString(), // Add current timestamp
      });
      setNewNote(""); // Clear input field after adding note
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Issue</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Notes:</span>
            <ul>
              {currentNotes.map((note, index) => (
                <li key={index} className="mt-5">
                  {/* <div><b>{new Date(note.timestamp).toLocaleString()}</b></div> */}
                  <div>{note.content}</div>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
          <input
            type="text"
            placeholder="Add a new note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button onClick={handleAddClick}>Add</button>
        </div>
      )}
    </div>
  );
};

export default IssueNotes;
