import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotes, deleteNote } from "../services/storage";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineTrash } from "react-icons/hi";

function HomePage() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const handleDelete = (id) => {
    deleteNote(id);
    setNotes(getNotes());
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen  ">
      <div className="max-w-xl mx-auto p-6 pt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notes</h1>
          <button
            onClick={() => navigate("/new")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            + Add
          </button>
        </div>

        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 shadow rounded-xl p-4 mb-3 flex 
            justify-between items-center"
            >
              <div
                className="cursor-pointer  flex-1"
                onClick={() => navigate(`/edit/${note.id}`)}
              >
                <h2 className="font-semibold text-lg">{note.title}</h2>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {note.content}
                </p>
              </div>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-400 hover:text-red-600 p-2 text-xl rounded-full cursor-pointer
              hover:bg-gray-900 transition"
              >
                <HiOutlineTrash size={25} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {notes.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No notes yet.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
