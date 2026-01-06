
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI with the server-side API key
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Use Gemini to simulate the yt-dlp extraction process
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Simulate a video downloader metadata extraction for this URL: ${url}. 
      Return a JSON object with: id, title, author, duration, platform (instagram, tiktok, or facebook), thumbnail, previewUrl (use a sample mp4 link like https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4), and formats (array of objects with quality, url, size).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            author: { type: Type.STRING },
            duration: { type: Type.STRING },
            platform: { type: Type.STRING },
            thumbnail: { type: Type.STRING },
            previewUrl: { type: Type.STRING },
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

    const metadata = JSON.parse(response.text);

    // Final sanitization for frontend
    return NextResponse.json({
      ...metadata,
      thumbnail: metadata.thumbnail || `https://picsum.photos/seed/${metadata.id}/640/360`,
      previewUrl: metadata.previewUrl || "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      formats: metadata.formats && metadata.formats.length > 0 ? metadata.formats : [
        { quality: 'HD 1080p (MP4)', url: '#', size: '15.4 MB' },
        { quality: 'SD 720p (MP4)', url: '#', size: '8.2 MB' }
      ]
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to process video link. Please ensure it is a public post.' }, { status: 500 });
  }
}
