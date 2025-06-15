// src/components/Navbar.tsx
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) =>
    location.pathname === path ? "text-yellow-400 font-bold" : "text-gray-500";

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl px-6 font-semibold text-blue-700">
        AI 공부 도우미
      </Link>
      <div className="space-x-6 text-sm px-6">
        <Link to="/" className={isActive("/")}>
          홈
        </Link>
        <Link to="/qna" className={isActive("/qna")}>
          질문하기
        </Link>
      </div>
    </nav>
  );
}
