import { useEffect, useState } from "react";
import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import Footer from "./components/Footer";
import { dkeeper_backend } from "../../declarations/dkeeper_backend";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    console.log("useEffect is triggered");
    fetchData();
  }, []);

  async function fetchData() {
    const response = await dkeeper_backend.readNote();
    setNotes(response);
  }

  function addNote(newNote) {
    setNotes((prevNotes) => {
      dkeeper_backend.createNote(newNote.title, newNote.content);
      return [newNote, ...prevNotes];
    });
  }

  function deleteNote(id) {
    dkeeper_backend.deleteNote(id);
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <main>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </main>
  );
}

export default App;
