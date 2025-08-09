"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Upload } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { analisarImagem } from "@/actions/wardrobe";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  tipo: string;
  cor: string;
  estacao: string;
  ocasiao: string;
  tags: string;
};

export function AddItemDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const { control, setValue, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      tipo: "",
      cor: "",
      estacao: "",
      ocasiao: "",
      tags: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImageData(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imageData) {
      toast({
        title: "Nenhuma Imagem Selecionada",
        description: "Por favor, envie uma imagem para analisar.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analisarImagem(imageData);
      setValue("tipo", result.tipo);
      setValue("cor", result.cor);
      setValue("estacao", result.estacao);
      setValue("ocasiao", result.ocasiao);
      setValue("tags", result.tags.join(", "));
      toast({
        title: "Análise Concluída",
        description: "Seu item de vestuário foi analisado.",
      });
    } catch (error) {
      toast({
        title: "Falha na Análise",
        description: "Ocorreu um erro ao analisar a imagem. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const onSubmit = (data: FormValues) => {
    console.log("Salvando item:", { ...data, image: imageData });
    toast({ title: "Item Salvo!", description: "O novo item foi adicionado ao seu guarda-roupa." });
    setOpen(false);
    reset();
    setImagePreview(null);
    setImageData(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Item</DialogTitle>
            <DialogDescription>
              Envie uma foto do seu item de vestuário. Use a IA para preencher os detalhes ou faça manualmente.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="picture">Imagem</Label>
              <div className="relative flex h-64 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 bg-secondary/50 text-center">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" fill className="object-contain p-2" />
                ) : (
                  <div className="space-y-2 text-muted-foreground">
                    <Upload className="mx-auto h-8 w-8" />
                    <p>Clique para enviar ou arraste e solte</p>
                  </div>
                )}
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 h-full w-full opacity-0"
                  onChange={handleFileChange}
                />
              </div>
              <Button type="button" className="w-full" onClick={handleAnalyze} disabled={!imagePreview || isAnalyzing}>
                {isAnalyzing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Analisar com IA
              </Button>
            </div>
            <div className="space-y-4">
              <Controller
                name="tipo"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Input id="type" placeholder="ex: Camiseta, Calça Jeans" {...field} />
                  </div>
                )}
              />
              <Controller
                name="cor"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label htmlFor="color">Cor</Label>
                    <Input id="color" placeholder="ex: Azul, Vermelho" {...field} />
                  </div>
                )}
              />
              <Controller
                name="estacao"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label htmlFor="season">Estação</Label>
                    <Input id="season" placeholder="ex: Verão, Inverno" {...field} />
                  </div>
                )}
              />
              <Controller
                name="ocasiao"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label htmlFor="occasion">Ocasião</Label>
                    <Input id="occasion" placeholder="ex: Casual, Formal" {...field} />
                  </div>
                )}
              />
               <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                    <div className="grid gap-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input id="tags" placeholder="ex: algodão, jeans (separado por vírgula)" {...field} />
                    </div>
                )}
                />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-accent hover:bg-accent/90">
              Salvar Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
