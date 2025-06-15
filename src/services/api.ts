// src/services/api.ts
export async function askQuestion(context: string, question: string) {
  try {
    const res = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ context, question }),
    });

    if (!res.ok) {
      // HTTP 상태 코드가 200번대가 아니면 에러로 간주
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to ask question:", error);
    throw error; // 에러를 호출자에게 다시 던져서 처리할 수 있도록 함
  }
}
