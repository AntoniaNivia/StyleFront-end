
'use server'

import { gerarTraje } from "@/ai/flows/gerar-traje";
import type { GerarTrajeInput, GerarTrajeOutput } from "@/ai/flows/gerar-traje";
import { visualizarTraje } from "@/ai/flows/visualizar-traje";
import type { VisualizarTrajeInput, VisualizarTrajeOutput } from "@/ai/flows/visualizar-traje";
import { guardaRoupa, mockUser } from "@/lib/data";

type GerarLookInput = Omit<GerarTrajeInput, 'guardaRoupa' | 'preferenciaManequim'>;

export async function gerarLook(input: GerarLookInput): Promise<GerarTrajeOutput> {
    try {
        // Em um aplicativo real, você buscaria o guarda-roupa e a preferência de manequim do usuário atual de um banco de dados
        const fullInput: GerarTrajeInput = {
            ...input,
            guardaRoupa: JSON.stringify(guardaRoupa),
            preferenciaManequim: mockUser.preferenciaManequim || 'neutro',
        };
        const result = await gerarTraje(fullInput);
        return result;
    } catch (error) {
        console.error("Erro ao gerar traje:", error);
        throw new Error("Falha ao gerar traje com IA.");
    }
}

export async function gerarLookDoDia(): Promise<GerarTrajeOutput> {
    try {
        const fullInput: GerarTrajeInput = {
            guardaRoupa: JSON.stringify(guardaRoupa),
            estiloUsuario: "casual, confortável, moderno",
            clima: "ameno",
            ocasiao: "um dia típico",
            preferenciaManequim: mockUser.preferenciaManequim || 'neutro',
        };
        const result = await gerarTraje(fullInput);
        return result;
    } catch (error) {
        console.error("Erro ao gerar look do dia:", error);
        throw new Error("Falha ao gerar look do dia com IA.");
    }
}


export async function visualizarLook(input: VisualizarTrajeInput): Promise<VisualizarTrajeOutput> {
    try {
        const result = await visualizarTraje(input);
        return result;
    } catch (error) {
        console.error("Erro ao visualizar traje:", error);
        throw new Error("Falha ao visualizar traje com IA.");
    }
}
