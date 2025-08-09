"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Upload, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

export default function PostPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, handle form submission to backend
    toast({
        title: "Post Created!",
        description: "Your new look has been added to the feed."
    })
    setImagePreview(null);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Post to Feed</h1>
          <p className="text-muted-foreground">Share a new look with the StyleWise community.</p>
        </div>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6 space-y-6">
             <div className="space-y-2">
              <Label htmlFor="picture">Post Image</Label>
              <div className="relative flex h-80 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 bg-secondary/50 text-center">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" fill className="object-contain p-2" />
                ) : (
                  <div className="space-y-2 text-muted-foreground">
                    <ImageIcon className="mx-auto h-12 w-12" />
                    <p className="font-semibold">Click to upload or drag & drop</p>
                     <p className="text-xs">PNG, JPG, or GIF</p>
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
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                placeholder="Describe the look, share some style tips..."
                rows={4}
                required
              />
            </div>
            <div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                Create Post
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
