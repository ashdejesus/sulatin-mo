'use server';
/**
 * @fileOverview Generates the most appropriate variation of a Baybayin character based on the Tagalog word input.
 *
 * - generateBaybayinCharacterVariation - A function that handles the generation of the Baybayin character variation.
 * - GenerateBaybayinCharacterVariationInput - The input type for the generateBaybayinCharacterVariation function.
 * - GenerateBaybayinCharacterVariationOutput - The return type for the generateBaybayinCharacterVariation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBaybayinCharacterVariationInputSchema = z.object({
  tagalogWord: z.string().describe('The Tagalog word for which to generate the Baybayin character variation.'),
  baybayinCharacter: z.string().describe('The base Baybayin character to find a variation for.'),
});
export type GenerateBaybayinCharacterVariationInput = z.infer<typeof GenerateBaybayinCharacterVariationInputSchema>;

const GenerateBaybayinCharacterVariationOutputSchema = z.object({
  variation: z.string().describe('The most appropriate variation of the Baybayin character for the given Tagalog word.'),
  explanation: z.string().describe('An explanation of why this variation is the most appropriate.'),
});
export type GenerateBaybayinCharacterVariationOutput = z.infer<typeof GenerateBaybayinCharacterVariationOutputSchema>;

export async function generateBaybayinCharacterVariation(
  input: GenerateBaybayinCharacterVariationInput
): Promise<GenerateBaybayinCharacterVariationOutput> {
  return generateBaybayinCharacterVariationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBaybayinCharacterVariationPrompt',
  input: {schema: GenerateBaybayinCharacterVariationInputSchema},
  output: {schema: GenerateBaybayinCharacterVariationOutputSchema},
  prompt: `You are an expert in Baybayin script and Tagalog language. Given a Tagalog word and a base Baybayin character, you will determine the most appropriate variation of the Baybayin character to use for that word.

Tagalog Word: {{{tagalogWord}}}
Base Baybayin Character: {{{baybayinCharacter}}}

Consider the historical context, phonetic nuances, and common usage of Baybayin to select the best variation. Explain your choice.

Output the variation and an explanation of why it is the most appropriate choice.

Ensure that the outputted variation is a valid Baybayin character.

{{zodFormat instruction=true}}
`,
});

const generateBaybayinCharacterVariationFlow = ai.defineFlow(
  {
    name: 'generateBaybayinCharacterVariationFlow',
    inputSchema: GenerateBaybayinCharacterVariationInputSchema,
    outputSchema: GenerateBaybayinCharacterVariationOutputSchema,
  },
  async input => {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-api-key-here') {
      throw new Error('API key not configured.');
    }
    const {output} = await prompt(input);
    return output!;
  }
);
