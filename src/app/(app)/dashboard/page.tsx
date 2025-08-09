import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockUser, wardrobe } from "@/lib/data"
import { Shirt, Sparkles, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DashboardPage() {
  const user = mockUser;
  const wardrobeCount = wardrobe.length;
  const savedLooksCount = 5; // Mock data

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}!</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items in Wardrobe</CardTitle>
            <Shirt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wardrobeCount}</div>
            <p className="text-xs text-muted-foreground">items ready to be styled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Looks Saved</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedLooksCount}</div>
            <p className="text-xs text-muted-foreground">outfits in your collection</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Look of the Day</CardTitle>
            <CardDescription>A special outfit suggestion, just for you!</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 md:flex-row">
            <div className="relative h-[400px] w-full max-w-[250px] flex-shrink-0">
               <Image src="https://placehold.co/400x600.png" alt="Look of the day" fill className="rounded-lg object-cover" data-ai-hint="fashion mannequin" />
            </div>
            <div className="space-y-4">
                <p className="font-semibold">Today's Vibe: Urban Explorer</p>
                <p className="text-muted-foreground">For a cool day in the city, we're pairing your classic Blue Denim Jacket with the versatile Black Skinny Jeans and a simple White T-Shirt. This timeless combination is both comfortable and effortlessly stylish. Complete the look with your favorite sneakers or boots.</p>
                 <Button className="bg-accent hover:bg-accent/90" asChild>
                    <Link href="/builder">Try it in the Builder</Link>
                </Button>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shirt className="h-5 w-5 text-accent" />
                        Add to your Wardrobe
                    </CardTitle>
                    <CardDescription>Expand your collection by adding a new clothing item.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Button className="w-full" variant="secondary" asChild>
                        <Link href="/wardrobe">Add New Item</Link>
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-accent"/>
                        Create a New Look
                    </CardTitle>
                    <CardDescription>Use our AI stylist to generate a new outfit for any occasion.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                        <Link href="/builder">Generate Look</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
