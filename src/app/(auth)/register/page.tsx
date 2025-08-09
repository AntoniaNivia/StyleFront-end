"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Em um aplicativo real, você lidaria com o registro aqui
        router.push('/dashboard');
    }

  return (
    <form onSubmit={handleRegister}>
        <Card>
        <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Criar uma Conta</CardTitle>
            <CardDescription>
            Preencha os detalhes abaixo para criar sua conta Style
            </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid gap-2">
                <Label>Tipo de Conta</Label>
                <RadioGroup defaultValue="regular" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="regular" id="r1" />
                        <Label htmlFor="r1">Usuário Regular</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="store" id="r2" />
                        <Label htmlFor="r2">Loja</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" type="text" placeholder="Seu Nome" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@exemplo.com" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="gender">Gênero</Label>
                     <Select>
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
                    <Label htmlFor="mannequin">Manequim</Label>
                     <Select>
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
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">Criar Conta</Button>
            <div className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link
                href="/login"
                className="font-medium text-accent underline-offset-4 hover:underline"
                >
                Entrar
                </Link>
            </div>
        </CardFooter>
        </Card>
    </form>
  )
}
