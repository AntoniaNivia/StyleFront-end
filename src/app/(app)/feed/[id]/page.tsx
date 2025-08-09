
"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// ...existing code...
import { Bookmark, Heart, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function FeedDetailPage({ params }: { params: { id: string } }) {
  const [feedPosts, setFeedPosts] = useState<any[]>([]); // TODO: Carregar posts reais
  const post = feedPosts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }
  
  const toggleLike = (id: string) => {
    setFeedPosts(posts => posts.map(p => 
      p.id === id ? { ...p, curtido: !p.curtido, curtidas: p.curtido ? p.curtidas - 1 : p.curtidas + 1 } : p
    ));
  };
  
  const toggleSave = (id: string) => {
    setFeedPosts(posts => posts.map(p => 
      p.id === id ? { ...p, salvo: !p.salvo } : p
    ));
  };


  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="overflow-hidden">
          <div className="relative aspect-[4/5] w-full">
            <Image src={post.imageUrl} alt={post.legenda} fill className="object-cover" data-ai-hint="fashion model" />
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
                <AvatarImage src={post.autor.avatarUrl} />
                <AvatarFallback>{post.autor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold text-lg">{post.autor.name}</p>
                <p className="text-muted-foreground">{post.legenda}</p>
            </div>
        </div>

        <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" onClick={() => toggleLike(post.id)}>
                <Heart className={`h-5 w-5 ${post.curtido ? "text-red-500 fill-current" : ""}`} />
            </Button>
            <Button size="icon" variant="outline" onClick={() => toggleSave(post.id)}>
                <Bookmark className={`h-5 w-5 ${post.salvo ? "text-blue-500 fill-current" : ""}`}/>
            </Button>
            <Button size="icon" variant="outline">
                <Send className="h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground ml-2">{post.curtidas} curtidas</p>
        </div>

        {post.itens.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle>Itens neste Look</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {post.itens.map(item => (
                        <div key={item.id} className="flex items-center gap-4">
                            <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                                <Image src={item.imageUrl} alt={item.name} fill className="object-cover"/>
                            </div>
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <Button variant="link" className="p-0 h-auto" asChild>
                                    <Link href="/wardrobe">Ver item</Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
