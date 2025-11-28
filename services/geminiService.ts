import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateItinerary = async (destination: string, duration: number): Promise<Itinerary> => {
  const prompt = `
    請為${destination}規劃一個詳細且實際的 ${duration} 天旅遊行程。
    重點在於觀光、美食和文化的融合。
    對於福岡(Fukuoka)，請包括太宰府(Dazaifu)、博多運河城(Canal City)、中洲屋台(Yatai)、大濠公園(Ohori Park)，如果時間允許的話，還有糸島(Itoshima)等必去景點。
    請提供每個地點的經緯度 (lat/lng) 以便繪製地圖。
    輸出必須是純 JSON 格式。
    請使用繁體中文 (Traditional Chinese) 回覆。
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tripTitle: { type: Type.STRING, description: "旅行標題 (Catchy title)" },
          overview: { type: Type.STRING, description: "行程總覽 (Brief summary)" },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dayNumber: { type: Type.INTEGER },
                theme: { type: Type.STRING, description: "當日主題" },
                activities: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING, description: "時間, e.g., 09:00" },
                      location: { type: Type.STRING, description: "地點名稱" },
                      description: { type: Type.STRING, description: "活動描述" },
                      lat: { type: Type.NUMBER },
                      lng: { type: Type.NUMBER },
                    },
                    required: ["time", "location", "description", "lat", "lng"],
                  },
                },
              },
              required: ["dayNumber", "theme", "activities"],
            },
          },
        },
        required: ["tripTitle", "overview", "days"],
      },
    },
  });

  if (response.text) {
    return JSON.parse(response.text) as Itinerary;
  }
  
  throw new Error("Failed to generate itinerary");
};