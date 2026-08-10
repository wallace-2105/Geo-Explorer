import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Hexagon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard" },
  { to: "/trilhas", label: "Trilhas" },
  { to: "/desafios", label: "Desafios" },
  { to: "/certificados", label: "Certificados" },
  { to: "/perfil", label: "Perfil" },
] as const;

function NavLinks({ onNavigate, vertical }: { onNavigate?: () => void; vertical?: boolean }) {
  return (
    <nav
      aria-label="Navegação principal"
      className={cn("flex gap-1", vertical ? "flex-col items-stretch" : "items-center")}
    >
      {NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          activeOptions={{ exact: item.to === "/" }}
          className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Ir para o conteúdo
      </a>

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2.5"
            aria-label="Geo-Explorer, início"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
              <Hexagon className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-semibold leading-none">
                Geo<span className="text-primary">-</span>Explorer
              </span>
              <span className="mt-1 hidden text-xs text-muted-foreground sm:block">
                Trilhas de aprendizagem para devs
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <NavLinks />
            <Button asChild size="sm">
              <Link to="/desafios">Gerar desafio</Link>
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="min-h-11 min-w-11 lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-surface">
              <SheetTitle className="px-1 font-display">Navegação</SheetTitle>
              <div className="mt-4 px-1">
                <NavLinks vertical onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main id="conteudo" key={pathname} className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border/80 py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 text-sm text-muted-foreground sm:px-6">
          <p className="font-display text-foreground">Geo-Explorer</p>
          <p>
            Projeto de portfólio. Frontend preparado para consumir uma API REST em Node.js +
            TypeScript.
          </p>
        </div>
      </footer>
    </div>
  );
}
