import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AddItemDialog } from "@/components/add-item-dialog";
import { wardrobe } from "@/lib/data";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

export default function WardrobePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Wardrobe</h1>
          <p className="text-muted-foreground">Your personal clothing collection.</p>
        </div>
        <AddItemDialog>
          <Button className="bg-accent hover:bg-accent/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        </AddItemDialog>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {wardrobe.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[3/4]">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" data-ai-hint="clothing item" />
              </div>
              <div className="p-4">
                <p className="font-semibold truncate">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.type}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
