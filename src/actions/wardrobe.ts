'use server'

import { analyzeClothing } from "@/ai/flows/analyze-clothing";
import type { AnalyzeClothingOutput } from "@/ai/flows/analyze-clothing";

export async function analyzeImage(photoDataUri: string): Promise<AnalyzeClothingOutput> {
  try {
    const result = await analyzeClothing({ photoDataUri });
    return result;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error("Failed to analyze image with AI.");
  }
}
