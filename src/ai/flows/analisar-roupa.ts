'use server';
/**
 * @fileOverview Um agente de IA de análise de roupas.
 *
 * - analisarRoupa - Uma função que lida com o processo de análise de roupas.
 * - AnalisarRoupaInput - O tipo de entrada para a função analisarRoupa.
 * - AnalisarRoupaOutput - O tipo de retorno para a função analisarRoupa.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalisarRoupaInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "Uma foto de um item de vestuário, como um URI de dados que deve incluir um tipo MIME e usar codificação Base64. Formato esperado: 'data:<mimetype>;base64,<dados_codificados>'."
    ),
});
export type AnalisarRoupaInput = z.infer<typeof AnalisarRoupaInputSchema>;

const AnalisarRoupaOutputSchema = z.object({
  tipo: z.string().describe('O tipo de item de vestuário.'),
  cor: z.string().describe('A cor do item de vestuário.'),
  estacao: z.string().describe('A estação para a qual o item de vestuário é adequado.'),
  ocasiao: z.string().describe('A ocasião para a qual o item de vestuário é adequado.'),
  tags: z.array(z.string()).describe('Uma lista de tags associadas ao item de vestuário.'),
});
export type AnalisarRoupaOutput = z.infer<typeof AnalisarRoupaOutputSchema>;

export async function analisarRoupa(input: AnalisarRoupaInput): Promise<AnalisarRoupaOutput> {
  return fluxoAnalisarRoupa(input);
}

const prompt = ai.definePrompt({
  name: 'promptAnalisarRoupa',
  input: {schema: AnalisarRoupaInputSchema},
  output: {schema: AnalisarRoupaOutputSchema},
  prompt: `Você é um assistente de moda de IA que analisa itens de vestuário a partir de imagens.

Você receberá uma foto de um item de vestuário e seu trabalho é identificar o tipo, cor, estação adequada e ocasião adequada do item. Além disso, forneça algumas tags descritivas.

Analise o seguinte item de vestuário:

{{media url=photoDataUri}}`,
});

const fluxoAnalisarRoupa = ai.defineFlow(
  {
    name: 'fluxoAnalisarRoupa',
    inputSchema: AnalisarRoupaInputSchema,
    outputSchema: AnalisarRoupaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
