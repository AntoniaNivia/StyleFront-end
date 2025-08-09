
"use client"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Icons } from "@/components/icons"
import {
  LayoutDashboard,
  Shirt,
  Sparkles,
  Heart,
  User,
  PlusSquare,
  Wand,
} from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { usePathname } from "next/navigation"
import Link from "next/link"
// ...existing code...

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Painel" },
  { href: "/wardrobe", icon: Shirt, label: "Guarda-Roupa" },
  { href: "/builder", icon: Sparkles, label: "Criador IA" },
  { href: "/manual-builder", icon: Wand, label: "Criador Manual" },
  { href: "/feed", icon: Heart, label: "Inspiração" },
  { href: "/profile", icon: User, label: "Perfil" },
]

const storeNavItems = [
    { href: "/post", icon: PlusSquare, label: "Postar no Feed" },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // TODO: Obter usuário real via autenticação/contexto
  const user = { name: '', type: '' };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Icons.logo className="text-accent group-data-[collapsible=icon]:hidden" />
            <SidebarTrigger className="ml-auto" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {user.type === "store" && storeNavItems.map((item) => (
                 <SidebarMenuItem key={item.href}>
                 <SidebarMenuButton
                   asChild
                   isActive={pathname === item.href}
                   tooltip={item.label}
                 >
                   <Link href={item.href}>
                     <item.icon />
                     <span>{item.label}</span>
                   </Link>
                 </SidebarMenuButton>
               </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-end gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <UserNav />
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
