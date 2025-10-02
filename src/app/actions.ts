"use server";

import { generateBaybayinCharacterVariation, GenerateBaybayinCharacterVariationInput } from "@/ai/flows/generate-baybayin-character-variation";
import { speak } from "@/ai/flows/speak";
import { z } from "zod";

const inputSchema = z.object({
  tagalogWord: z.string().min(1, { message: "Word cannot be empty." }),
  baybayinCharacter: z.string(),
});

export async function getBaybayinVariation(prevState: any, formData: FormData) {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-api-key-here') {
    return {
      errors: { _form: ["AI features are disabled. Please configure your Gemini API key in the .env file."] },
      variation: null,
      explanation: null,
    };
  }

  const rawData = {
    tagalogWord: formData.get("tagalogWord"),
    baybayinCharacter: formData.get("baybayinCharacter"),
  };

  const validatedFields = inputSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      variation: null,
      explanation: null,
    };
  }
  
  try {
    const result = await generateBaybayinCharacterVariation(validatedFields.data as GenerateBaybayinCharacterVariationInput);
    return {
      errors: null,
      variation: result.variation,
      explanation: result.explanation,
    };
  } catch (error) {
    console.error(error);
    return {
      errors: { _form: ["An error occurred while generating the variation. Please check your API key."] },
      variation: null,
      explanation: null,
    };
  }
}

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
