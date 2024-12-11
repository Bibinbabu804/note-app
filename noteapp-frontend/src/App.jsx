import { useState, useEffect } from "react";
import axios from "axios";


const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const { data } = await axios.get("http://localhost:3000/api/notes");
    setNotes(data);
  };

  const addNote = async () => {
    await axios.post("http://localhost:3000/api/notes", { title, content });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:3000/api/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h1 style={{fontFamily:'fantasy'}} className="text-center">Note App</h1>
      <div  className="d-flex  justify-content-center m-5 p-5 me-2">
        <input style={{borderRadius:'20px'}} className="m-2"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea  style={{borderRadius:'20px'}} className="m-2 text-center"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button  style={{width:'100px', height:'60px', borderRadius:'20px'}} className="btn btn-primary my-3 " onClick={addNote}>Add Note</button>
      </div>
      <ul>
        {notes.map((note) => (

          <div >
          <li key={note._id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;