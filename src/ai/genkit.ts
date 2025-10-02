import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {config} from 'dotenv';

config();

const plugins = [];

// Only add the Google AI plugin if the API key is configured.
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your-api-key-here') {
  plugins.push(googleAI({apiKey: process.env.GEMINI_API_KEY}));
}

export const ai = genkit({
  plugins,
  model: 'googleai/gemini-2.5-flash',
});
