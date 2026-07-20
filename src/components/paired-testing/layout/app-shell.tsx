"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity, ClipboardCheck, Columns2, FileArchive, FileText, FlaskConical, History,
  Home, LayoutDashboard, Menu, RefreshCcw, ShieldCheck, Users,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { demoConfig } from "@/config/paired-testing-demo.config";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";
import { useDemoStore } from "@/store/paired-testing-demo.store";
import type { NavigationItem, Role } from "@/types/paired-testing-demo.types";

const icons = { Activity, ClipboardCheck, Columns2, FileArchive, FileText, FlaskConical, History, Home, LayoutDashboard, Users };

function RoleSwitcher({ className }: { className?: string }) {
  const hydrated = useHydrated();
  const role = useDemoStore((state) => state.role);
  const setRole = useDemoStore((state) => state.setRole);
  return (
    <div className={cn("min-w-[180px]", className)}>
      <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">View as</p>
      <Select value={hydrated ? role : "expert_reviewer"} onValueChange={(value) => setRole(value as Role)}>
        <SelectTrigger className="h-9 w-full border-border bg-secondary/70 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(demoConfig.roles).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

function ResetDemoDialog({ compact = false }: { compact?: boolean }) {
  const reset = useDemoStore((state) => state.resetDemoData);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size={compact ? "icon-sm" : "sm"} className={cn("text-muted-foreground hover:text-foreground", !compact && "w-full justify-start")}>
          <RefreshCcw className="size-3.5" />
          {!compact && "Reset Demo Data"}
          {compact && <span className="sr-only">Reset Demo Data</span>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset demonstration data?</DialogTitle>
          <DialogDescription>
            This restores the original deterministic fixtures, review decisions, assignments, drafts, and activity events.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
          <DialogClose asChild>
            <Button onClick={() => { reset(); toast.success("Demonstration data restored."); }}>Reset Demo Data</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary navigation" className="space-y-1">
      {demoConfig.navigation.map((item: NavigationItem) => {
        const Icon = icons[item.icon as keyof typeof icons] ?? Activity;
        const active = item.href === "/paired-testing-demo"
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex min-h-9 items-center gap-3 rounded-md border border-transparent px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
              active && "border-primary/15 bg-primary/[0.085] text-primary",
            )}
          >
            <Icon className="size-4 shrink-0" strokeWidth={1.7} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <Link href="/paired-testing-demo" className="flex items-center gap-3 rounded-md">
      <span className="grid size-9 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
        <ShieldCheck className="size-5" strokeWidth={1.8} />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.19em] text-primary">DoGoodie</span>
        <span className="block truncate text-sm font-semibold text-foreground">Paired Testing Lab</span>
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const current = demoConfig.navigation.find((item) =>
    item.href === "/paired-testing-demo" ? pathname === item.href : pathname.startsWith(item.href));
  return (
    <div className="min-h-screen">
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border/80 bg-[#08120e]/95 p-4 backdrop-blur-xl lg:flex lg:flex-col">
        <Brand />
        <div className="mt-6 rounded-lg border border-border/80 bg-secondary/40 p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="mono text-[10px] text-primary">{demoConfig.study.id}</span>
            <span className="rounded-sm border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-primary">Active</span>
          </div>
          <p className="mt-2 text-xs font-medium leading-5 text-foreground">{demoConfig.study.name}</p>
          <p className="mt-1 text-[10px] leading-4 text-muted-foreground">{demoConfig.study.platform} · {demoConfig.study.rideTier}</p>
        </div>
        <div className="mt-5 flex-1 overflow-y-auto"><Navigation /></div>
        <div className="space-y-3 border-t border-border/70 pt-4">
          <RoleSwitcher />
          <ResetDemoDialog />
          <div className="flex items-center justify-between px-2 text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
            <span>{demoConfig.product.badge}</span><span>{demoConfig.product.version}</span>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header role="banner" className="no-print sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border/80 bg-background/88 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden"><Menu className="size-4" /><span className="sr-only">Open navigation</span></Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[290px] p-4">
                <SheetHeader className="px-0 pt-0"><SheetTitle className="sr-only">Application navigation</SheetTitle></SheetHeader>
                <Brand />
                <div className="mt-6"><Navigation /></div>
                <div className="mt-6 border-t border-border pt-5"><RoleSwitcher /></div>
              </SheetContent>
            </Sheet>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{demoConfig.study.id}</p>
              <p className="text-sm font-medium text-foreground">{current?.label ?? "Matched Pair Review"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-md border border-teal-300/20 bg-teal-300/[0.06] px-2.5 py-1 text-[10px] font-medium text-teal-200 sm:inline-flex">Synthetic data</span>
            <div className="hidden xl:block"><RoleSwitcher className="min-w-[190px]" /></div>
            <ResetDemoDialog compact />
          </div>
        </header>
        <main id="main-content" className="box-border min-w-0 w-full max-w-[1600px] overflow-x-hidden p-4 sm:p-6 lg:mx-auto lg:p-7">
          {children}
        </main>
      </div>
    </div>
  );
}
