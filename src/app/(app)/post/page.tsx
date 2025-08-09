'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function PostPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [legenda, setLegenda] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    // Simulação de chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Em um aplicativo real, aqui você faria a chamada para o backend
    // para salvar o post e a imagem. Como não temos um backend,
    // vamos apenas exibir um toast e redirecionar.
    
    setCarregando(false);
    toast({
      title: 'Post Criado!',
      description: 'Seu novo look foi adicionado ao feed.',
    });
    
    setImagePreview(null);
    setLegenda('');
    (e.target as HTMLFormElement).reset();

    // Redireciona para a página de feed após o sucesso
    router.push('/feed');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Postar no Feed</h1>
        <p className="text-muted-foreground">
          Compartilhe um novo look com a comunidade Style.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="picture">Imagem do Post</Label>
              <div className="relative flex h-80 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 bg-secondary/50 text-center">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="space-y-2 text-muted-foreground">
                    <ImageIcon className="mx-auto h-12 w-12" />
                    <p className="font-semibold">
                      Clique para enviar ou arraste e solte
                    </p>
                    <p className="text-xs">PNG, JPG ou GIF</p>
                  </div>
                )}
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 h-full w-full opacity-0"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="caption">Legenda</Label>
              <Textarea
                id="caption"
                placeholder="Descreva o look, compartilhe algumas dicas de estilo..."
                rows={4}
                required
                value={legenda}
                onChange={(e) => setLegenda(e.target.value)}
              />
            </div>
            <div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={carregando}>
                {carregando ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Criar Post
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
