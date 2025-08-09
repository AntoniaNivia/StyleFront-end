
'use server';

/**
 * @fileOverview Fluxo de IA para visualizar um traje selecionado em um manequim.
 *
 * - visualizarTraje - Uma função que gera uma imagem de manequim para um traje.
 * - VisualizarTrajeInput - O tipo de entrada para a função visualizarTraje.
 * - VisualizarTrajeOutput - O tipo de retorno para a função visualizarTraje.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VisualizarTrajeInputSchema = z.object({
  descricaoTraje: z.string().describe('Uma descrição textual do traje a ser visualizado.'),
  preferenciaManequim: z.string().describe('A preferência do usuário para o manequim (ex: feminino, masculino, neutro).'),
});
export type VisualizarTrajeInput = z.infer<typeof VisualizarTrajeInputSchema>;

const VisualizarTrajeOutputSchema = z.object({
  mannequinPhotoDataUri: z
    .string()
    .describe(
      'Uma foto de um manequim vestindo o traje, como um URI de dados que deve incluir um tipo MIME e usar codificação Base64. Formato esperado: \'data:<mimetype>;base64,<dados_codificados>\'.'
    ),
});
export type VisualizarTrajeOutput = z.infer<typeof VisualizarTrajeOutputSchema>;


export async function visualizarTraje(input: VisualizarTrajeInput): Promise<VisualizarTrajeOutput> {
  return fluxoVisualizarTraje(input);
}

const fluxoVisualizarTraje = ai.defineFlow(
  {
    name: 'fluxoVisualizarTraje',
    inputSchema: VisualizarTrajeInputSchema,
    outputSchema: VisualizarTrajeOutputSchema,
  },
  async (input) => {
    const promptImagem = `Um manequim ${input.preferenciaManequim} vestindo o seguinte traje: ${input.descricaoTraje}. O manequim deve estar em um fundo de estúdio branco liso. A foto deve ser de corpo inteiro.`;

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: promptImagem,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
        throw new Error("A IA não conseguiu gerar uma imagem para o traje.");
    }

    return {
      mannequinPhotoDataUri: media.url,
    };
  }
);
