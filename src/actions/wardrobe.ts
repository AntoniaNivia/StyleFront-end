'use server'

import { analisarRoupa } from "@/ai/flows/analisar-roupa";
import type { AnalisarRoupaOutput } from "@/ai/flows/analisar-roupa";

export async function analisarImagem(photoDataUri: string): Promise<AnalisarRoupaOutput> {
  try {
    const result = await analisarRoupa({ photoDataUri });
    return result;
  } catch (error) {
    console.error("Erro ao analisar imagem:", error);
    throw new Error("Falha ao analisar imagem com IA.");
  }
}
