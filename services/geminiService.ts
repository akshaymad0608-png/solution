
import { GoogleGenAI, Type } from "@google/genai";
import { SolverMode, Solution } from "../types";
import { SYSTEM_PROMPT } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAiSolution = async (problem: string, mode: SolverMode): Promise<Solution> => {
  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: [{ 
      parts: [{ 
        text: `Solve this problem in ${mode} mode: "${problem}"` 
      }] 
    }],
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: { type: Type.STRING },
          steps: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          resources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                link: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["name", "link", "description"]
            }
          },
          indianExamples: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          growthHacks: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          nextActions: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          estimatedTime: { type: Type.STRING }
        },
        required: ["analysis", "steps", "resources", "indianExamples", "growthHacks", "nextActions", "estimatedTime"]
      }
    }
  });

  return JSON.parse(response.text || "{}") as Solution;
};
