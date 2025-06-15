// src/pages/QnA.tsx
import { useState } from "react";

// 질문-답변 쌍의 타입을 정의합니다.
interface QAPair {
  question: string;
  answer: string;
  context: string; // 필요하다면 컨텍스트도 저장할 수 있습니다.
}

// 예시 데이터를 상수로 정의
const EXAMPLE_CONTEXT =
  "조선 왕조는 1392년에 태조 이성계에 의해 건국되었고, 1910년까지 약 518년간 지속된 한국의 마지막 왕조이다. 수도는 한양(지금의 서울)이었으며, 유교를 통치 이념으로 삼았다. 세종대왕은 한글을 창제하여 백성들의 문맹률을 낮추는 데 크게 기여했다.";

const EXAMPLE_QUESTION = "조선 왕조의 통치 이념은 무엇이었니?";

export default function Qna() {
  // 초기값은 빈 문자열로 유지하여 플레이스홀더가 보이도록 합니다.
  const [context, setContext] = useState("");
  const [question, setQuestion] = useState("");

  const [qaHistory, setQaHistory] = useState<QAPair[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const MAX_HISTORY_ITEMS = 5; // 보여줄 최근 질문-답변 개수

  // '예시 채우기' 버튼 클릭 시 호출될 함수
  const handleLoadExample = () => {
    setContext(EXAMPLE_CONTEXT);
    setQuestion(EXAMPLE_QUESTION);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 입력값 유효성 검사
    if (!context.trim() || !question.trim()) {
      alert("지문과 질문을 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, question }),
      });
      const data = await res.json();

      if (res.ok) {
        setQaHistory((prevHistory) => {
          const newHistory = [
            ...prevHistory,
            { question, answer: data.answer, context },
          ];
          return newHistory.slice(-MAX_HISTORY_ITEMS);
        });
        setQuestion(""); // 질문 입력창 비우기
      } else {
        console.error("API Error:", data);
        setQaHistory((prevHistory) => {
          const newHistory = [
            ...prevHistory,
            {
              question,
              answer: `답변을 가져오는 데 실패했습니다: ${
                data.error || res.statusText
              }`,
              context,
            },
          ];
          return newHistory.slice(-MAX_HISTORY_ITEMS);
        });
      }
    } catch (error: any) {
      console.error("Fetch Error:", error);
      setQaHistory((prevHistory) => {
        const newHistory = [
          ...prevHistory,
          { question, answer: `네트워크 오류: ${error.message}`, context },
        ];
        return newHistory.slice(-MAX_HISTORY_ITEMS);
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-12">
      {" "}
      {/* min-h-screen 제거하고 w-full h-full로 변경 고려 */}
      <div className="bg-white max-w-3xl w-full p-10 rounded-xl shadow-lg mx-auto">
        {" "}
        {/* mx-auto 추가 */}
        <h2 className="flex justify-center items-center text-2xl font-bold text-blue-700 mb-6">
          <img src="/muhan.png" alt="Logo" className="w-12 mr-2" />
          BERT AI 공부 도우미
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows={6}
            placeholder="학습할 자료 (Context)를 여기에 붙여넣으세요. 또는 '예시 채우기' 버튼을 클릭하세요."
            className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
          <input
            type="text"
            placeholder="궁금한 질문을 입력하세요."
            className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <button
              type="button"
              onClick={handleLoadExample}
              className="w-full sm:w-auto bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm mb-2 sm:mb-0"
            >
              예시 채우기
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  답변 생성 중...
                </span>
              ) : (
                "질문하기"
              )}
            </button>
          </div>
        </form>
        {qaHistory.length > 0 && (
          <div className="mt-6 space-y-4">
            {qaHistory.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm"
              >
                <strong className="text-blue-700 font-semibold">Q:</strong>{" "}
                <span className="text-gray-900">{item.question}</span>
                <br />
                <strong className="text-blue-700 font-semibold">A:</strong>{" "}
                <span className="text-gray-800 whitespace-pre-line">
                  {item.answer}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
