
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AddItemDialog } from '@/components/add-item-dialog';
import { guardaRoupa as initialGuardaRoupa } from '@/lib/data';
import type { ItemDeVestuario } from '@/lib/types';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';

export default function WardrobePage() {
  const [guardaRoupa, setGuardaRoupa] = useState<ItemDeVestuario[]>(initialGuardaRoupa);

  const handleItemAdded = (newItem: ItemDeVestuario) => {
    setGuardaRoupa((prev) => [newItem, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meu Guarda-Roupa</h1>
          <p className="text-muted-foreground">Sua coleção pessoal de roupas.</p>
        </div>
        <AddItemDialog onItemAdded={handleItemAdded}>
          <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Novo Item
          </Button>
        </AddItemDialog>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {guardaRoupa.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  data-ai-hint="clothing item"
                />
              </div>
              <div className="p-4">
                <p className="truncate font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.tipo}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
