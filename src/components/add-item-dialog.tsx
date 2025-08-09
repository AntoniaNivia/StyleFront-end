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
import { analyzeImage } from "@/actions/wardrobe";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  type: string;
  color: string;
  season: string;
  occasion: string;
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
      type: "",
      color: "",
      season: "",
      occasion: "",
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
        title: "No Image Selected",
        description: "Please upload an image to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeImage(imageData);
      setValue("type", result.type);
      setValue("color", result.color);
      setValue("season", result.season);
      setValue("occasion", result.occasion);
      setValue("tags", result.tags.join(", "));
      toast({
        title: "Analysis Complete",
        description: "Your clothing item has been analyzed.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const onSubmit = (data: FormValues) => {
    console.log("Saving item:", { ...data, image: imageData });
    toast({ title: "Item Saved!", description: "The new item has been added to your wardrobe." });
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
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Upload a picture of your clothing item. Use AI to fill the details or do it manually.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="picture">Image</Label>
              <div className="relative flex h-64 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 bg-secondary/50 text-center">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" fill className="object-contain p-2" />
                ) : (
                  <div className="space-y-2 text-muted-foreground">
                    <Upload className="mx-auto h-8 w-8" />
                    <p>Click to upload or drag & drop</p>
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
                Analyze with AI
              </Button>
            </div>
            <div className="space-y-4">
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Input id="type" placeholder="e.g., T-Shirt, Jeans" {...field} />
                  </div>
                )}
              />
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label htmlFor="color">Color</Label>
                    <Input id="color" placeholder="e.g., Blue, Red" {...field} />
                  </div>
                )}
              />
              <Controller
                name="season"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label htmlFor="season">Season</Label>
                    <Input id="season" placeholder="e.g., Summer, Winter" {...field} />
                  </div>
                )}
              />
              <Controller
                name="occasion"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <Label htmlFor="occasion">Occasion</Label>
                    <Input id="occasion" placeholder="e.g., Casual, Formal" {...field} />
                  </div>
                )}
              />
               <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                    <div className="grid gap-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input id="tags" placeholder="e.g., cotton, denim (comma-separated)" {...field} />
                    </div>
                )}
                />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-accent hover:bg-accent/90">
              Save Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
