"use client";

import { Eye, History, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDemoDateTime } from "@/lib/formatting/date-time";
import { useDemoStore } from "@/store/paired-testing-demo.store";
import type { AuditEvent } from "@/types/paired-testing-demo.types";
import { PageHeader } from "@/components/paired-testing/shared/page-header";

export function AuditClient() {
  const events = useDemoStore((state) => state.auditEvents);
  const filter = useDemoStore((state) => state.auditFilter);
  const setFilter = useDemoStore((state) => state.setAuditFilter);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<AuditEvent>();
  const visible = events.filter((event) => (filter === "all" || event.category === filter)
    && [event.actor, event.objectId, event.id, event.action].join(" ").toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Demonstration history" title="Demonstration Activity Log" description="A synthetic operational event history for the prototype. This log is not immutable or tamper-proof." />
      <div className="rounded-lg border border-amber-300/20 bg-amber-300/[0.055] p-4 text-xs leading-5 text-amber-100/80">This is a demonstration activity log, not a production legal audit trail or genuine chain-of-custody system.</div>
      <div className="data-panel overflow-hidden rounded-lg">
        <div className="flex flex-col gap-2 border-b border-border p-3 sm:flex-row sm:justify-between"><div className="relative max-w-sm flex-1"><Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Search activity events" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search actor, object, event…" className="h-9 bg-background/45 pl-9 text-xs" /></div><Select value={filter} onValueChange={setFilter}><SelectTrigger className="h-9 w-44 bg-background/45 text-xs"><SelectValue /></SelectTrigger><SelectContent>{["all", "study", "protocol", "assignment", "submission", "validation", "evidence", "review", "report"].map((value) => <SelectItem key={value} value={value}>{value === "all" ? "All categories" : value}</SelectItem>)}</SelectContent></Select></div>
        <div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Event</TableHead><TableHead>Date & time</TableHead><TableHead>Actor</TableHead><TableHead>Action</TableHead><TableHead>Object</TableHead><TableHead>Category</TableHead><TableHead>Integrity indicator</TableHead><TableHead /></TableRow></TableHeader><TableBody>{visible.map((event) => <TableRow key={event.id}><TableCell className="mono font-semibold">{event.id}</TableCell><TableCell className="mono whitespace-nowrap text-[10px]">{formatDemoDateTime(event.timestamp)}</TableCell><TableCell>{event.actor}<span className="block text-[10px] text-muted-foreground">{event.actorRole}</span></TableCell><TableCell className="font-medium">{event.action}</TableCell><TableCell><span className="text-xs">{event.objectType}</span><span className="mono block text-[10px] text-primary">{event.objectId}</span></TableCell><TableCell><span className="rounded-md border border-border bg-secondary px-2 py-1 text-[9px] uppercase tracking-wider">{event.category}</span></TableCell><TableCell className="text-xs text-muted-foreground">{event.integrityIndicator}</TableCell><TableCell><Button variant="ghost" size="icon-sm" onClick={() => setSelected(event)}><Eye className="size-4" /><span className="sr-only">View {event.id}</span></Button></TableCell></TableRow>)}</TableBody></Table></div>
      </div>
      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(undefined)}><SheetContent><SheetHeader><SheetTitle className="flex items-center gap-2"><History className="size-4 text-primary" />Event details</SheetTitle><SheetDescription>Demonstration activity record; not an immutable audit event.</SheetDescription></SheetHeader>{selected && <div className="space-y-4 px-4"><p className="mono text-lg font-semibold">{selected.id}</p><dl className="space-y-3 text-xs">{[["ISO timestamp", selected.timestamp], ["Display time", formatDemoDateTime(selected.timestamp)], ["Actor", selected.actor], ["Actor role", selected.actorRole], ["Action", selected.action], ["Object", `${selected.objectType} · ${selected.objectId}`], ["Category", selected.category], ["Integrity indicator", selected.integrityIndicator], ["Note", selected.note ?? "—"]].map(([label, value]) => <div key={label} className="border-b border-border pb-2"><dt className="text-muted-foreground">{label}</dt><dd className="mono mt-1 break-words">{value}</dd></div>)}</dl></div>}</SheetContent></Sheet>
    </div>
  );
}

