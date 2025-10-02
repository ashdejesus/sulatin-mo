'use server';

/**
 * @fileOverview Summarizes the history of Baybayin into key points.
 *
 * - summarizeBaybayinHistory - A function that summarizes the history of Baybayin.
 * - SummarizeBaybayinHistoryInput - The input type for the summarizeBaybayinHistory function.
 * - SummarizeBaybayinHistoryOutput - The return type for the summarizeBaybayinHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeBaybayinHistoryInputSchema = z.object({
  query: z
    .string()
    .default('Summarize the history of Baybayin into key points.')
    .describe('The query to summarize the history of Baybayin.'),
});
export type SummarizeBaybayinHistoryInput = z.infer<
  typeof SummarizeBaybayinHistoryInputSchema
>;

const SummarizeBaybayinHistoryOutputSchema = z.object({
  summary: z.string().describe('The summary of the history of Baybayin.'),
});
export type SummarizeBaybayinHistoryOutput = z.infer<
  typeof SummarizeBaybayinHistoryOutputSchema
>;

export async function summarizeBaybayinHistory(
  input: SummarizeBaybayinHistoryInput
): Promise<SummarizeBaybayinHistoryOutput> {
  return summarizeBaybayinHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeBaybayinHistoryPrompt',
  input: {schema: SummarizeBaybayinHistoryInputSchema},
  output: {schema: SummarizeBaybayinHistoryOutputSchema},
  prompt: `{{query}}`,
});

const summarizeBaybayinHistoryFlow = ai.defineFlow(
  {
    name: 'summarizeBaybayinHistoryFlow',
    inputSchema: SummarizeBaybayinHistoryInputSchema,
    outputSchema: SummarizeBaybayinHistoryOutputSchema,
  },
  async input => {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-api-key-here') {
      throw new Error('API key not configured.');
    }
    const {output} = await prompt(input);
    return output!;
  }
);
