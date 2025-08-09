'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockUser } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: 'genero' | 'preferenciaManequim') => (value: string) => {
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // Em uma aplicação real, aqui você faria a chamada para a API para salvar os dados
    console.log('Salvando alterações:', user);
    toast({
      title: 'Perfil Atualizado!',
      description: 'Suas informações foram salvas com sucesso.',
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie sua conta e preferências.</p>
      </div>

      <form onSubmit={handleSaveChanges}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="text-3xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl">{user.name}</CardTitle>
                <CardDescription className="mt-1">
                  <Badge variant="secondary" className="capitalize">
                    {user.type} Usuário
                  </Badge>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={user.name} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user.email} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gênero</Label>
                 <Select value={user.genero} onValueChange={handleSelectChange('genero')}>
                    <SelectTrigger id="gender">
                        <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mannequin">Preferência de Manequim</Label>
                 <Select value={user.preferenciaManequim} onValueChange={handleSelectChange('preferenciaManequim')}>
                    <SelectTrigger id="mannequin">
                        <SelectValue placeholder="Selecione a preferência" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="neutro">Neutro</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-accent hover:bg-accent/90">
                Salvar Alterações
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
