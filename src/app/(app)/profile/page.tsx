
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockUser, feedPosts as initialFeedPosts } from '@/lib/data';
import type { PostagemFeed } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Bookmark, Trash2 } from 'lucide-react';
import Image from 'next/image';

const availableStyles = ['Casual', 'Formal', 'Esportivo', 'Vintage', 'Moderno', 'Boêmio', 'Minimalista'];

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [feedPosts, setFeedPosts] = useState(initialFeedPosts);
  const [estilos, setEstilos] = useState(user.estilosPreferidos || []);
  const [cores, setCores] = useState(user.coresFavoritas || []);
  const [pecas, setPecas] = useState(user.pecasChave || []);
  const [corInput, setCorInput] = useState('');
  const [pecaInput, setPecaInput] = useState('');
  const [selectedLook, setSelectedLook] = useState<PostagemFeed | null>(null);

  const { toast } = useToast();

  const savedLooks = feedPosts.filter(post => post.salvo && post.autor.id === user.id);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange =
    (id: 'genero' | 'preferenciaManequim') => (value: string) => {
      setUser((prev) => ({ ...prev, [id]: value }));
    };

  const handleStyleChange = (style: string) => {
    setEstilos((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };
  
  const addTag = (type: 'cores' | 'pecas') => {
    if (type === 'cores' && corInput.trim()) {
      if (!cores.includes(corInput.trim())) {
        setCores([...cores, corInput.trim()]);
      }
      setCorInput('');
    } else if (type === 'pecas' && pecaInput.trim()) {
       if (!pecas.includes(pecaInput.trim())) {
        setPecas([...pecas, pecaInput.trim()]);
      }
      setPecaInput('');
    }
  };

  const removeTag = (type: 'cores' | 'pecas', tag: string) => {
     if (type === 'cores') {
      setCores(cores.filter(t => t !== tag));
    } else if (type === 'pecas') {
      setPecas(pecas.filter(t => t !== tag));
    }
  }

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, estilosPreferidos: estilos, coresFavoritas: cores, pecasChave: pecas };
    // Em uma aplicação real, aqui você faria a chamada para a API para salvar os dados
    console.log('Salvando alterações:', updatedUser);
    toast({
      title: 'Perfil Atualizado!',
      description: 'Suas informações foram salvas com sucesso.',
    });
  };

  const handleRemoveFromSaved = (postId: string) => {
    setFeedPosts(posts => posts.map(post => 
      post.id === postId ? { ...post, salvo: false } : post
    ));
    setSelectedLook(null);
    toast({
        title: "Look Removido",
        description: "O look foi removido da sua coleção."
    });
  }

  return (
    <>
    <form onSubmit={handleSaveChanges} className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie sua conta e personalize suas preferências de estilo.
          </p>
        </div>
         <Button type="submit" className="bg-accent hover:bg-accent/90">
            Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Perfil e Preferências</TabsTrigger>
            <TabsTrigger value="saved">Looks Salvos</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
            <Card>
                <CardHeader>
                <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24 cursor-pointer border-4 border-primary">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="text-3xl">
                        {user.name.charAt(0)}
                    </AvatarFallback>
                    </Avatar>
                    <div className='w-full'>
                    <CardTitle className="text-3xl">{user.name}</CardTitle>
                    <CardDescription className="mt-1">
                        <Badge variant="secondary" className="capitalize">
                        {user.type} Usuário
                        </Badge>
                    </CardDescription>
                    <Textarea
                        id="bio"
                        placeholder="Conte um pouco sobre você e seu estilo..."
                        value={user.bio || ''}
                        onChange={handleInputChange}
                        className="mt-2"
                    />
                    </div>
                </div>
                </CardHeader>
                <CardContent>
                <Tabs defaultValue="personal">
                    <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
                    <TabsTrigger value="style">Preferências de Estilo</TabsTrigger>
                    </TabsList>
                    <TabsContent value="personal" className="mt-6">
                    <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" value={user.name} onChange={handleInputChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={user.email} onChange={handleInputChange}/>
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
                    </div>
                    </TabsContent>
                    <TabsContent value="style" className="mt-6">
                        <div className="space-y-6">
                            <div>
                                <Label className="text-base font-medium">Seus Estilos</Label>
                                <p className="text-sm text-muted-foreground">Selecione os estilos que mais te representam.</p>
                                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                    {availableStyles.map(style => (
                                        <div key={style} className="flex items-center space-x-2">
                                            <Checkbox id={`style-${style}`} checked={estilos.includes(style.toLowerCase())} onCheckedChange={() => handleStyleChange(style.toLowerCase())}/>
                                            <Label htmlFor={`style-${style}`} className="font-normal">{style}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Label className="text-base font-medium">Cores Favoritas</Label>
                                <p className="text-sm text-muted-foreground">Adicione as cores que você mais gosta de usar.</p>
                                <div className="mt-4 flex gap-2">
                                    <Input value={corInput} onChange={e => setCorInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag('cores'))} placeholder="Digite uma cor e pressione Enter" />
                                    <Button type="button" onClick={() => addTag('cores')}>Adicionar</Button>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {cores.map(cor => (
                                        <Badge key={cor} variant="secondary" className="flex items-center gap-1 pr-1">
                                            {cor}
                                            <button type="button" onClick={() => removeTag('cores', cor)} className="rounded-full hover:bg-background">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Label className="text-base font-medium">Peças-Chave</Label>
                                <p className="text-sm text-muted-foreground">Quais são as peças essenciais no seu guarda-roupa?</p>
                                <div className="mt-4 flex gap-2">
                                    <Input value={pecaInput} onChange={e => setPecaInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag('pecas'))} placeholder="Digite uma peça e pressione Enter" />
                                    <Button type="button" onClick={() => addTag('pecas')}>Adicionar</Button>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {pecas.map(peca => (
                                        <Badge key={peca} variant="secondary" className="flex items-center gap-1 pr-1">
                                            {peca}
                                            <button type="button" onClick={() => removeTag('pecas', peca)} className="rounded-full hover:bg-background">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="saved">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bookmark />
                        Meus Looks Salvos
                    </CardTitle>
                    <CardDescription>Sua coleção de looks favoritos e trajes gerados por IA.</CardDescription>
                </CardHeader>
                <CardContent>
                    {savedLooks.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {savedLooks.map(post => (
                                <button key={post.id} className="group relative rounded-lg overflow-hidden" onClick={() => setSelectedLook(post)}>
                                    <Image 
                                        src={post.imageUrl}
                                        alt={post.legenda}
                                        width={400}
                                        height={600}
                                        className="object-cover aspect-[3/4] w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    />
                                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 rounded-b-lg">
                                        <p className="text-sm line-clamp-2">{post.legenda}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                         <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48 border-2 border-dashed rounded-lg">
                            <Bookmark className="h-10 w-10 mb-2" />
                            <p className="font-semibold">Nenhum look salvo ainda</p>
                            <p className="text-sm">Salve looks do feed ou gere novos com a IA!</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </form>

    <Dialog open={!!selectedLook} onOpenChange={(isOpen) => !isOpen && setSelectedLook(null)}>
        <DialogContent className="max-w-md">
            {selectedLook && (
                <>
                    <DialogHeader>
                        <DialogTitle>{selectedLook.legenda}</DialogTitle>
                        <DialogDescription>
                            Por {selectedLook.autor.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="relative aspect-[3/4] w-full my-4 rounded-lg overflow-hidden">
                         <Image src={selectedLook.imageUrl} alt={selectedLook.legenda} fill className="object-cover"/>
                    </div>
                    <DialogFooter className="sm:justify-between gap-2">
                        <Button variant="destructive" onClick={() => handleRemoveFromSaved(selectedLook.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remover dos Salvos
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Fechar
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </>
            )}
        </DialogContent>
    </Dialog>
    </>
  );
}

    