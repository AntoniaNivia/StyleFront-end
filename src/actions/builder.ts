'use server'

import { generateOutfit } from "@/ai/flows/generate-outfit";
import type { GenerateOutfitInput, GenerateOutfitOutput } from "@/ai/flows/generate-outfit";
import { wardrobe, mockUser } from "@/lib/data";

type GenerateLookInput = Omit<GenerateOutfitInput, 'wardrobe' | 'mannequinPreference'>;

export async function generateLook(input: GenerateLookInput): Promise<GenerateOutfitOutput> {
    try {
        // In a real app, you'd fetch the current user's wardrobe and mannequin preference from a database
        const fullInput: GenerateOutfitInput = {
            ...input,
            wardrobe: JSON.stringify(wardrobe),
            mannequinPreference: mockUser.mannequinPreference || 'neutral',
        };
        const result = await generateOutfit(fullInput);
        return result;
    } catch (error) {
        console.error("Error generating outfit:", error);
        throw new Error("Failed to generate outfit with AI.");
    }
}
