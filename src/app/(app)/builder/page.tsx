
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, Wand2, Star } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { gerarLook } from "@/actions/builder"
import type { GerarTrajeOutput } from "@/ai/flows/gerar-traje"
import { feedPosts, mockUser } from "@/lib/data"
import { PostagemFeed } from "@/lib/types"

export default function BuilderPage() {
  const [clima, setClima] = useState("")
  const [ocasiao, setOcasiao] = useState("")
  const [estiloUsuario, setEstiloUsuario] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [resultado, setResultado] = useState<GerarTrajeOutput | null>(null)
  const [salvo, setSalvo] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setResultado(null)
    setSalvo(false)
    try {
      const response = await gerarLook({ clima, ocasiao, estiloUsuario: estiloUsuario })
      setResultado(response)
    } catch (error) {
      toast({
        title: "Falha na Geração",
        description: "Ocorreu um erro ao gerar o look. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setCarregando(false)
    }
  }

  const handleSaveLook = () => {
    if (!resultado) return;
  
    // Em um app real, você salvaria isso no backend.
    // Aqui, vamos simular adicionando a um estado local ou a uma lista mock.
    // Por simplicidade, vamos apenas exibir um toast.
    setSalvo(true);
    toast({
      title: "Look Salvo!",
      description: "O traje foi adicionado à sua coleção no perfil.",
    });

    // O ideal seria ter uma lista de looks salvos no mockUser
    // e adicionar este look a ela. Vamos simular isso:
    const newPost: PostagemFeed = {
        id: `post-generated-${Date.now()}`,
        autor: { id: mockUser.id, name: mockUser.name, avatarUrl: mockUser.avatarUrl || '' },
        imageUrl: resultado.mannequinPhotoDataUri,
        legenda: `Look gerado por IA para ${ocasiao}`,
        curtidas: 0,
        curtido: false,
        salvo: true,
        itens: [], 
    };
    // Esta é uma simulação, não persistirá. Para persistir,
    // precisaríamos de gerenciamento de estado global ou chamadas de API.
    console.log("Novo look salvo (simulação):", newPost);
  };

  return (
    <div className="grid h-full min-h-[calc(100vh-8rem)] gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <form onSubmit={handleGenerate}>
          <Card>
            <CardHeader>
              <CardTitle>Criador de Looks com IA</CardTitle>
              <CardDescription>Descreva o contexto, e nosso estilista de IA criará o look perfeito para você.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="climate">Clima</Label>
                <Input id="climate" placeholder="ex: Ensolarado e quente, 25°C" value={clima} onChange={(e) => setClima(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="occasion">Ocasião</Label>
                <Input id="occasion" placeholder="ex: Almoço casual com amigos" value={ocasiao} onChange={(e) => setOcasiao(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="style">Seu Estilo</Label>
                <Textarea id="style" placeholder="ex: Adoro o estilo vintage, boêmio. Prefiro roupas confortáveis." value={estiloUsuario} onChange={(e) => setEstiloUsuario(e.target.value)} required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={carregando}>
                {carregando ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Gerar Look
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>

      <div className="lg:col-span-3">
        <Card className="flex h-full min-h-[500px] w-full items-center justify-center">
          {carregando && (
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
              <p className="font-semibold">Nossa IA está montando seu estilo...</p>
              <p className="text-sm">Isso pode levar um momento.</p>
            </div>
          )}

          {!carregando && !resultado && (
            <div className="flex flex-col items-center gap-4 text-center text-muted-foreground">
              <Wand2 className="h-16 w-16" />
              <h2 className="text-xl font-semibold text-foreground">Seu look gerado por IA aparecerá aqui</h2>
              <p>Preencha o formulário para começar!</p>
            </div>
          )}

          {!carregando && resultado && (
            <CardContent className="flex w-full flex-col items-center gap-6 p-6 md:flex-row">
                 <div className="relative h-[450px] w-full max-w-[300px] flex-shrink-0">
                    <Image src={resultado.mannequinPhotoDataUri} alt="Traje gerado" fill className="rounded-lg object-cover" />
                 </div>
                 <div className="flex w-full flex-col space-y-4">
                    <div>
                        <h3 className="text-xl font-bold">Sugestão de Traje</h3>
                        <p className="text-muted-foreground">{resultado.sugestaoTraje}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Notas do Estilista</h3>
                        <p className="text-muted-foreground">{resultado.justificativa}</p>
                    </div>
                    <Button onClick={handleSaveLook} disabled={salvo} variant="outline">
                        <Star className={`mr-2 h-4 w-4 ${salvo ? "text-yellow-400 fill-current" : ""}`} />
                        {salvo ? "Salvo!" : "Salvar Look"}
                    </Button>
                 </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
