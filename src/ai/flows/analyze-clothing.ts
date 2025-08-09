// src/ai/flows/analyze-clothing.ts
'use server';
/**
 * @fileOverview A clothing analysis AI agent.
 *
 * - analyzeClothing - A function that handles the clothing analysis process.
 * - AnalyzeClothingInput - The input type for the analyzeClothing function.
 * - AnalyzeClothingOutput - The return type for the analyzeClothing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeClothingInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a clothing item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeClothingInput = z.infer<typeof AnalyzeClothingInputSchema>;

const AnalyzeClothingOutputSchema = z.object({
  type: z.string().describe('The type of clothing item.'),
  color: z.string().describe('The color of the clothing item.'),
  season: z.string().describe('The season for which the clothing item is suitable.'),
  occasion: z.string().describe('The occasion for which the clothing item is suitable.'),
  tags: z.array(z.string()).describe('A list of tags associated with the clothing item.'),
});
export type AnalyzeClothingOutput = z.infer<typeof AnalyzeClothingOutputSchema>;

export async function analyzeClothing(input: AnalyzeClothingInput): Promise<AnalyzeClothingOutput> {
  return analyzeClothingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeClothingPrompt',
  input: {schema: AnalyzeClothingInputSchema},
  output: {schema: AnalyzeClothingOutputSchema},
  prompt: `You are an AI fashion assistant that analyzes clothing items from images.

You will receive a photo of a clothing item and your job is to identify the clothing item's type, color, suitable season, and suitable occasion.  Also, provide a few descriptive tags.

Analyze the following clothing item:

{{media url=photoDataUri}}`,
});

const analyzeClothingFlow = ai.defineFlow(
  {
    name: 'analyzeClothingFlow',
    inputSchema: AnalyzeClothingInputSchema,
    outputSchema: AnalyzeClothingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
