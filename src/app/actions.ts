"use server";

import { speak } from "@/ai/flows/speak";

export async function getAudioForText(text: string) {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-api-key-here') {
    console.warn("Skipping audio generation: API key not configured.");
    return null;
  }
  try {
    const audioDataUri = await speak(text);
    return audioDataUri;
  } catch (error) {
    console.error("Error generating audio:", error);
    return null;
  }
}
