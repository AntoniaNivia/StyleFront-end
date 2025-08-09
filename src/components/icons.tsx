import { cn } from '@/lib/utils'

export const Icons = {
  logo: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <h1 className={cn("font-headline text-3xl font-bold tracking-tighter text-foreground", className)} {...props}>
      Style
    </h1>
  ),
};
