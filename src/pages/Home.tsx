// src/pages/Home.tsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-grow items-center justify-center w-full">
      {" "}
      {/* flex-grow는 여기서 의미가 없을 수 있으므로 제거 고려 */}
      <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl w-full text-center mt-16">
        <img src="/muhan.png" alt="Logo" className="w-44 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4 text-blue-500">
          👋 환영합니다!
        </h2>
        <p className="text-gray-600 mb-6">
          이 웹사이트는{" "}
          <span className="font-semibold text-black">BERT AI 모델</span>을
          활용해 공부 도중 생긴 질문에 답변해주는 도우미입니다.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/qna"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            질문하러 가기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
