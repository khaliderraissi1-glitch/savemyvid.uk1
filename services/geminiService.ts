
import { GoogleGenAI, Type } from "@google/genai";
import { VideoMetadata } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const extractMetadata = async (url: string): Promise<VideoMetadata> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this video URL and extract its potential metadata (as a simulator for a video downloader).
    URL: ${url}
    
    The response must be valid JSON and follow the schema accurately.
    Determine the platform (Instagram, TikTok, or Facebook) based on the domain.
    If the URL is invalid or from an unsupported platform, flag it in the metadata.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          thumbnail: { type: Type.STRING },
          author: { type: Type.STRING },
          duration: { type: Type.STRING },
          platform: { type: Type.STRING },
          formats: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                quality: { type: Type.STRING },
                url: { type: Type.STRING },
                size: { type: Type.STRING }
              }
            }
          }
        },
        required: ["id", "title", "platform", "formats"]
      }
    }
  });

  const data = JSON.parse(response.text);
  
  // Ensure we have fallback data for the UI if simulation is partial
  return {
    ...data,
    thumbnail: data.thumbnail || `https://picsum.photos/seed/${data.id}/640/360`,
    formats: data.formats.length > 0 ? data.formats : [
      { quality: 'HD 1080p', url: '#', size: '15.4 MB' },
      { quality: 'SD 720p', url: '#', size: '8.2 MB' }
    ]
  };
};
