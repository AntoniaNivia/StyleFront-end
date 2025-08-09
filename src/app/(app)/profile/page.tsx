import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUser } from "@/lib/data";

export default function ProfilePage() {
    const user = mockUser;

    return (
        <div className="mx-auto max-w-4xl space-y-6">
             <div>
                <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
                <p className="text-muted-foreground">Gerencie sua conta e preferências.</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-6">
                         <Avatar className="h-24 w-24 border-4 border-primary">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-3xl">{user.name}</CardTitle>
                            <CardDescription className="mt-1">
                                <Badge variant="secondary" className="capitalize">{user.type} Usuário</Badge>
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" defaultValue={user.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="gender">Gênero</Label>
                            <Input id="gender" defaultValue={user.genero} className="capitalize" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="mannequin">Preferência de Manequim</Label>
                            <Input id="mannequin" defaultValue={user.preferenciaManequim} className="capitalize" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button className="bg-accent hover:bg-accent/90">Salvar Alterações</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
