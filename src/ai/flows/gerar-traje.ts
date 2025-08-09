'use server';

/**
 * @fileOverview Fluxo de IA para gerar sugestões de trajes com base nas preferências do usuário.
 *
 * - gerarTraje - Uma função que gera sugestões de trajes.
 * - GerarTrajeInput - O tipo de entrada para a função gerarTraje.
 * - GerarTrajeOutput - O tipo de retorno para a função gerarTraje.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GerarTrajeInputSchema = z.object({
  guardaRoupa: z.string().describe('O guarda-roupa do usuário, como uma string JSON.'),
  estiloUsuario: z.string().describe('As preferências de estilo do usuário.'),
  clima: z.string().describe('As condições climáticas atuais.'),
  ocasiao: z.string().describe('A ocasião para a qual o traje é necessário.'),
  preferenciaManequim: z.string().describe('A preferência do usuário para o manequim.'),
});
export type GerarTrajeInput = z.infer<typeof GerarTrajeInputSchema>;

const GerarTrajeOutputSchema = z.object({
  sugestaoTraje: z.string().describe('Uma descrição do traje sugerido.'),
  justificativa: z.string().describe('As notas do estilista explicando a escolha do traje.'),
  mannequinPhotoDataUri: z
    .string()
    .describe(
      'Uma foto de um manequim vestindo o traje, como um URI de dados que deve incluir um tipo MIME e usar codificação Base64. Formato esperado: \'data:<mimetype>;base64,<dados_codificados>\'.' +
        'Esta imagem será gerada pelo modelo.'
    ),
});
export type GerarTrajeOutput = z.infer<typeof GerarTrajeOutputSchema>;

export async function gerarTraje(input: GerarTrajeInput): Promise<GerarTrajeOutput> {
  return fluxoGerarTraje(input);
}

const promptSugestaoTraje = ai.definePrompt({
  name: 'promptSugestaoTraje',
  input: {schema: GerarTrajeInputSchema},
  output: {schema: GerarTrajeOutputSchema},
  prompt: `Você é um estilista pessoal ajudando os usuários a escolher um traje do guarda-roupa deles.

  Dadas as seguintes informações, sugira um traje e explique seu raciocínio.

  Guarda-roupa: {{{guardaRoupa}}}
  Estilo do usuário: {{{estiloUsuario}}}
  Clima: {{{clima}}}
  Ocasião: {{{ocasiao}}}

  Justificativa: Explique brevemente por que você escolheu este traje e como ele atende às necessidades do usuário.
  Sugestão de Traje: Uma descrição do traje sugerido.

  {{#json}}
  { "sugestaoTraje": "...", "justificativa": "..." }
  {{/json}}`,
});

const fluxoGerarTraje = ai.defineFlow(
  {
    name: 'fluxoGerarTraje',
    inputSchema: GerarTrajeInputSchema,
    outputSchema: GerarTrajeOutputSchema,
  },
  async input => {
    const {output: resultadoSugestaoTraje} = await promptSugestaoTraje(input);

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: resultadoSugestaoTraje!.sugestaoTraje,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {
      sugestaoTraje: resultadoSugestaoTraje!.sugestaoTraje,
      justificativa: resultadoSugestaoTraje!.justificativa,
      mannequinPhotoDataUri: media?.url ?? '',
    };
  }
);
