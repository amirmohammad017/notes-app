import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoteFormPage from "./pages/NoteFormPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NoteFormPage />} />
        <Route path="/edit/:id" element={<NoteFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
