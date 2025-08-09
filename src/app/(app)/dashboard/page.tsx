
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockUser, guardaRoupa as initialGuardaRoupa, feedPosts as initialFeedPosts } from "@/lib/data"
import { Shirt, Sparkles, Star, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { gerarLookDoDia } from "@/actions/builder"
import type { GerarTrajeOutput } from "@/ai/flows/gerar-traje"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  const usuario = mockUser;
  const [guardaRoupa, setGuardaRoupa] = useState(initialGuardaRoupa)
  const [feedPosts, setFeedPosts] = useState(initialFeedPosts)

  const [lookDoDia, setLookDoDia] = useState<GerarTrajeOutput | null>(null)
  const [carregandoLook, setCarregandoLook] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchLookDoDia = async () => {
      setCarregandoLook(true)
      try {
        const look = await gerarLookDoDia()
        setLookDoDia(look)
      } catch (error) {
        toast({
          title: "Erro ao Gerar Look",
          description: "Não foi possível buscar a sugestão de look do dia.",
          variant: "destructive",
        })
      } finally {
        setCarregandoLook(false)
      }
    }
    fetchLookDoDia()
  }, [toast])

  const contagemGuardaRoupa = guardaRoupa.length;
  const contagemLooksSalvos = feedPosts.filter(p => p.salvo).length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Bem-vindo(a) de volta, {usuario.name}!</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Itens no Guarda-Roupa</CardTitle>
            <Shirt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contagemGuardaRoupa}</div>
            <p className="text-xs text-muted-foreground">itens prontos para serem estilizados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Looks Salvos</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contagemLooksSalvos}</div>
            <p className="text-xs text-muted-foreground">trajes na sua coleção</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Look do Dia</CardTitle>
            <CardDescription>Uma sugestão de traje especial, só para você!</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 md:flex-row">
            {carregandoLook ? (
              <div className="flex w-full flex-col items-center gap-4 md:flex-row">
                 <Skeleton className="relative h-[400px] w-full max-w-[250px] flex-shrink-0 rounded-lg" />
                 <div className="w-full space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-10 w-36" />
                 </div>
              </div>
            ) : lookDoDia && (
              <>
                <div className="relative h-[400px] w-full max-w-[250px] flex-shrink-0">
                   <Image src={lookDoDia.mannequinPhotoDataUri} alt="Look do dia" fill className="rounded-lg object-cover" data-ai-hint="fashion mannequin" />
                </div>
                <div className="space-y-4">
                    <p className="font-semibold">{lookDoDia.sugestaoTraje}</p>
                    <p className="text-muted-foreground">{lookDoDia.justificativa}</p>
                     <Button className="bg-accent hover:bg-accent/90" asChild>
                        <Link href="/builder">Experimente no Criador</Link>
                    </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shirt className="h-5 w-5 text-accent" />
                        Adicionar ao Guarda-Roupa
                    </CardTitle>
                    <CardDescription>Expanda sua coleção adicionando um novo item de vestuário.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Button className="w-full" variant="secondary" asChild>
                        <Link href="/wardrobe">Adicionar Novo Item</Link>
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-accent"/>
                        Criar um Novo Look
                    </CardTitle>
                    <CardDescription>Use nosso estilista de IA para gerar um novo traje para qualquer ocasião.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                        <Link href="/builder">Gerar Look</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
