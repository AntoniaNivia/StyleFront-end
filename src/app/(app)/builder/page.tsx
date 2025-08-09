"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, Wand2 } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { generateLook } from "@/actions/builder"
import type { GenerateOutfitOutput } from "@/ai/flows/generate-outfit"

export default function BuilderPage() {
  const [climate, setClimate] = useState("")
  const [occasion, setOccasion] = useState("")
  const [userStyle, setUserStyle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<GenerateOutfitOutput | null>(null)
  const { toast } = useToast()

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)
    try {
      const response = await generateLook({ climate, occasion, userStyle })
      setResult(response)
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating the look. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid h-full min-h-[calc(100vh-8rem)] gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <form onSubmit={handleGenerate}>
          <Card>
            <CardHeader>
              <CardTitle>AI Outfit Builder</CardTitle>
              <CardDescription>Describe the context, and our AI stylist will create the perfect look for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="climate">Climate</Label>
                <Input id="climate" placeholder="e.g., Sunny and warm, 25°C" value={climate} onChange={(e) => setClimate(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="occasion">Occasion</Label>
                <Input id="occasion" placeholder="e.g., Casual lunch with friends" value={occasion} onChange={(e) => setOccasion(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="style">Your Style</Label>
                <Textarea id="style" placeholder="e.g., I love vintage, bohemian style. Prefer comfortable clothes." value={userStyle} onChange={(e) => setUserStyle(e.target.value)} required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Look
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>

      <div className="lg:col-span-3">
        <Card className="flex h-full min-h-[500px] w-full items-center justify-center">
          {isLoading && (
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
              <p className="font-semibold">Our AI is styling you...</p>
              <p className="text-sm">This may take a moment.</p>
            </div>
          )}

          {!isLoading && !result && (
            <div className="flex flex-col items-center gap-4 text-center text-muted-foreground">
              <Wand2 className="h-16 w-16" />
              <h2 className="text-xl font-semibold text-foreground">Your AI-generated look will appear here</h2>
              <p>Fill out the form to get started!</p>
            </div>
          )}

          {!isLoading && result && (
            <CardContent className="flex w-full flex-col items-center gap-6 p-6 md:flex-row">
                 <div className="relative h-[450px] w-full max-w-[300px] flex-shrink-0">
                    <Image src={result.mannequinPhotoDataUri} alt="Generated outfit" fill className="rounded-lg object-cover" />
                 </div>
                 <div className="w-full space-y-4">
                    <h3 className="text-xl font-bold">Stylist's Notes</h3>
                    <p className="text-muted-foreground">{result.reasoning}</p>
                    <h3 className="text-xl font-bold">Outfit Suggestion</h3>
                    <p className="text-muted-foreground">{result.outfitSuggestion}</p>
                 </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
