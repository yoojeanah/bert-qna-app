// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Qna from "./pages/QnA";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow px-4 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/qna" element={<Qna />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
