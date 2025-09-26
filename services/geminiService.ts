
import { GoogleGenAI, Type } from "@google/genai";
import { Solution } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY is not defined in environment variables");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = "gemini-2.5-flash";

const promptText = `你是一位專業的台灣國中學科家教。你的任務是分析這張包含一個或多個國中題目的圖片，並提供詳細的解題。請遵循以下指示：
1. 辨識圖片中的每一個題目。
2. 針對每個題目，提供以下資訊：
   - **原始題目**：將題目文字完整打出來。
   - **正確答案**：提供正確的答案。
   - **詳解**：提供詳細的解題步驟和說明。
   - 如果是**選擇題**，除了說明正確選項為何正確，也要詳細解釋其他錯誤選項為何錯誤。
   - 如果是**數學計算題**，必須列出所有詳細的計算過程。
   - 如果是**英文題目**，詳解請主要使用英文撰寫，並在下方附上完整的中文翻譯。
3. 請將你的回覆格式化為一個 JSON 陣列，陣列中的每個物件代表一個題目，且每個物件都應包含 \`question\`、\`answer\`、\`explanation\` 這三個鍵(key)。`;


export const solveQuestionFromImage = async (base64ImageData: string, mimeType: string): Promise<Solution[] | string> => {
  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: {
            parts: [
                { inlineData: { data: base64ImageData, mimeType: mimeType } },
                { text: promptText }
            ]
        },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING, description: "辨識出的原始題目文字" },
                    answer: { type: Type.STRING, description: "題目的正確答案" },
                    explanation: { type: Type.STRING, description: "詳細的解題說明與過程" },
                  },
                  required: ["question", "answer", "explanation"],
                },
            },
            temperature: 0.2,
        },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get solution from Gemini API.");
  }
};
