import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { feedPosts } from "@/lib/data";
import { Bookmark, Heart, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function FeedDetailPage({ params }: { params: { id: string } }) {
  const post = feedPosts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="overflow-hidden">
          <div className="relative aspect-[4/5]">
            <Image src={post.imageUrl} alt={post.caption} fill className="object-cover" data-ai-hint="fashion model" />
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.avatarUrl} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold text-lg">{post.author.name}</p>
                <p className="text-muted-foreground">{post.caption}</p>
            </div>
        </div>

        <div className="flex items-center gap-2">
            <Button size="icon" variant="outline">
                <Heart className="h-5 w-5 text-red-500" fill={post.isLiked ? "currentColor" : "none"} />
            </Button>
            <Button size="icon" variant="outline">
                <Bookmark className="h-5 w-5 text-blue-500" fill={post.isSaved ? "currentColor" : "none"}/>
            </Button>
            <Button size="icon" variant="outline">
                <Send className="h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground ml-2">{post.likes} likes</p>
        </div>

        {post.items.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle>Items in this Look</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {post.items.map(item => (
                        <div key={item.id} className="flex items-center gap-4">
                            <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                                <Image src={item.imageUrl} alt={item.name} fill className="object-cover"/>
                            </div>
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <Button variant="link" className="p-0 h-auto" asChild>
                                    <Link href="/wardrobe">View item</Link>
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
