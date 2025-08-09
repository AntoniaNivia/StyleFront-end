
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockUser, guardaRoupa, feedPosts } from '@/lib/data';
import type { ItemDeVestuario, PostagemFeed } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Loader2, Sparkles, Wand, Star } from 'lucide-react';
import { visualizarLook } from '@/actions/builder';

type Categoria = 'top' | 'bottom' | 'shoes' | 'outerwear' | 'accessory';

type LookSelecionado = {
  [key in Categoria]?: ItemDeVestuario;
};

const categorias: { id: Categoria; nome: string; tipos: string[] }[] = [
  { id: 'top', nome: 'Parte de Cima', tipos: ['Blusa', 'Camisa', 'Top', 'Camiseta'] },
  { id: 'bottom', nome: 'Parte de Baixo', tipos: ['Calça', 'Saia', 'Shorts'] },
  { id: 'outerwear', nome: 'Casaco/Jaqueta', tipos: ['Jaqueta', 'Casaco', 'Blazer'] },
  { id: 'shoes', nome: 'Sapatos', tipos: ['Sapatos', 'Tênis', 'Botas'] },
  { id: 'accessory', nome: 'Acessório', tipos: ['Acessório', 'Bolsa', 'Chapéu'] },
];

export default function ManualBuilderPage() {
  const [lookSelecionado, setLookSelecionado] = useState<LookSelecionado>({});
  const [imagemManequim, setImagemManequim] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const { toast } = useToast();

  const handleSelectChange = (categoria: Categoria, itemId: string) => {
    const item = guardaRoupa.find((i) => i.id === itemId);
    setLookSelecionado((prev) => ({
      ...prev,
      [categoria]: item,
    }));
    setImagemManequim(null); // Reseta a imagem ao mudar a seleção
    setSalvo(false);
  };

  const getDescricaoTraje = () => {
    return Object.values(lookSelecionado)
      .filter(Boolean)
      .map((item) => item!.name)
      .join(', ');
  };

  const handleGenerateMannequin = async () => {
    const descricao = getDescricaoTraje();
    if (!descricao) {
      toast({
        title: 'Nenhum item selecionado',
        description: 'Por favor, selecione pelo menos um item para visualizar.',
        variant: 'destructive',
      });
      return;
    }

    setCarregando(true);
    setImagemManequim(null);
    setSalvo(false);

    try {
      const result = await visualizarLook({
        descricaoTraje: descricao,
        preferenciaManequim: mockUser.preferenciaManequim || 'neutro',
      });
      setImagemManequim(result.mannequinPhotoDataUri);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Falha na Visualização',
        description: 'Ocorreu um erro ao gerar o manequim. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setCarregando(false);
    }
  };

  const handleSaveLook = () => {
     if (!imagemManequim) return;

    setSalvo(true);
    toast({
      title: 'Look Salvo!',
      description: 'O traje foi adicionado à sua coleção no perfil.',
    });
    
    // Simulação de salvamento, como em outras partes do app
     const newPost: PostagemFeed = {
        id: `post-manual-${Date.now()}`,
        autor: { id: mockUser.id, name: mockUser.name, avatarUrl: mockUser.avatarUrl || '' },
        imageUrl: imagemManequim,
        legenda: `Look manual: ${getDescricaoTraje()}`,
        curtidas: 0,
        curtido: false,
        salvo: true,
        itens: Object.values(lookSelecionado).filter(Boolean) as ItemDeVestuario[],
    };
    
    feedPosts.unshift(newPost);
    console.log("Look manual salvo (simulação):", newPost);
  };


  return (
    <div className="grid h-full min-h-[calc(100vh-8rem)] grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Criador Manual de Looks</CardTitle>
            <CardDescription>
              Monte seu look selecionando peças do seu guarda-roupa.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-22rem)] pr-4 md:h-[60vh]">
              <div className="space-y-6">
                {categorias.map(({ id, nome, tipos }) => {
                  const itensFiltrados = guardaRoupa.filter((item) =>
                    tipos.includes(item.tipo)
                  );
                  if (itensFiltrados.length === 0) return null;

                  return (
                    <div key={id} className="grid gap-2">
                      <Label className="font-bold">{nome}</Label>
                      <Select
                        onValueChange={(value) => handleSelectChange(id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Selecione um(a) ${nome.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {itensFiltrados.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-3">
        <div className="flex h-full flex-col gap-4">
          <Card className="flex h-full min-h-[500px] w-full items-center justify-center">
             {carregando && (
              <div className="flex flex-col items-center gap-4 text-center text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-accent" />
                <p className="font-semibold">Montando seu manequim...</p>
              </div>
            )}

            {!carregando && !imagemManequim && (
              <div className="flex flex-col items-center gap-4 text-center text-muted-foreground">
                <Wand className="h-16 w-16" />
                <h2 className="text-xl font-semibold text-foreground">Seu manequim aparecerá aqui</h2>
                <p>Selecione suas peças e clique em "Visualizar Look"!</p>
              </div>
            )}
            
            {!carregando && imagemManequim && (
                <div className="relative h-full w-full p-4">
                    <Image
                        src={imagemManequim}
                        alt="Look montado manualmente"
                        fill
                        className="rounded-lg object-contain"
                    />
                </div>
            )}
          </Card>
           <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={handleGenerateMannequin}
              className="w-full bg-accent hover:bg-accent/90"
              disabled={carregando || Object.keys(lookSelecionado).length === 0}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Visualizar Look
            </Button>
            <Button
              onClick={handleSaveLook}
              className="w-full"
              variant="outline"
              disabled={!imagemManequim || salvo}
            >
              <Star className={`mr-2 h-4 w-4 ${salvo ? "text-yellow-400 fill-current" : ""}`} />
              {salvo ? 'Salvo!' : 'Salvar Look'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
