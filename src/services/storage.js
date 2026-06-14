const STORAGE_KEY = "notes_app_data";

export const getNotes = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveNotes = (notes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

export const addNote = (note) => {
  const notes = getNotes();
  const newNote = {
    id: Date.now(),
    title: note.title || "Untitled",
    content: note.content || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveNotes([newNote, ...notes]);
  return newNote;
};

export const updateNote = (id, updated) => {
  const notes = getNotes().map((n) =>
    n.id === id ? { ...n, ...updated, updatedAt: new Date().toISOString() } : n,
  );
  saveNotes(notes);
};

export const deleteNote = (id) => {
  const notes = getNotes().filter((n) => n.id !== id);
  saveNotes(notes);
};
