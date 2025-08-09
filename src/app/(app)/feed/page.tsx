"use client"
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { feedPosts as initialFeedPosts } from "@/lib/data";
import { Heart, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function FeedPage() {
  const [feedPosts, setFeedPosts] = useState(initialFeedPosts);

  const toggleLike = (id: string) => {
    setFeedPosts(posts => posts.map(post => 
      post.id === id ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 } : post
    ));
  };
  
  const toggleSave = (id: string) => {
    setFeedPosts(posts => posts.map(post => 
      post.id === id ? { ...post, isSaved: !post.isSaved } : post
    ));
  };

  return (
    <div className="space-y-6">
       <div>
          <h1 className="text-3xl font-bold tracking-tight">Inspiration Feed</h1>
          <p className="text-muted-foreground">Discover new styles from the community.</p>
        </div>
      <div className="[column-count:1] gap-4 space-y-4 sm:[column-count:2] md:[column-count:3] lg:[column-count:4]">
        {feedPosts.map((post) => (
          <div key={post.id} className="break-inside-avoid">
            <Card className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative">
                  <Link href={`/feed/${post.id}`}>
                    <Image
                      src={post.imageUrl}
                      alt={post.caption}
                      width={500}
                      height={700}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint="fashion model"
                    />
                  </Link>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatarUrl} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-semibold">{post.author.name}</p>
                    </div>
                    <p className="text-sm mt-1 line-clamp-2">{post.caption}</p>
                  </div>
                   <div className="absolute top-2 right-2 flex flex-col gap-2">
                     <button onClick={() => toggleLike(post.id)} className="p-2 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background">
                       <Heart className={cn("h-5 w-5", post.isLiked ? "text-red-500 fill-current" : "text-foreground")} />
                     </button>
                      <button onClick={() => toggleSave(post.id)} className="p-2 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background">
                       <Bookmark className={cn("h-5 w-5", post.isSaved ? "text-blue-500 fill-current" : "text-foreground")} />
                     </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
