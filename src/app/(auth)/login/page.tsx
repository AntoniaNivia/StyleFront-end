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
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Em um aplicativo real, você lidaria com a autenticação aqui
    router.push('/dashboard');
  }

  return (
    <form onSubmit={handleLogin}>
      <Card>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Bem-vindo de Volta</CardTitle>
          <CardDescription>
            Digite seu e-mail e senha para entrar em sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@exemplo.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90">Entrar</Button>
          <div className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Cadastre-se
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
