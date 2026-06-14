import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNotes, addNote, updateNote } from "../services/storage";

function NoteFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEdit) {
      const note = getNotes().find((n) => n.id === Number(id));
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (isEdit) {
      updateNote(Number(id), { title, content });
    } else {
      addNote({ title, content });
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white ">
      <div className="max-w-2xl p-6 pt-10 mx-auto ">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-white cursor-pointer transition "
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">
            {isEdit ? "Edit Note" : "Add New Note"}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl 
            font-semibold cursor-pointer transition"
          >
            {isEdit ? "Save Changes" : "Create Note"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NoteFormPage;
