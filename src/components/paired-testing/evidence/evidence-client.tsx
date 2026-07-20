"use client";

import { Eye, FileArchive, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoConfig } from "@/config/paired-testing-demo.config";
import { formatDemoDateTime } from "@/lib/formatting/date-time";
import { formatFileSize } from "@/lib/formatting/file-size";
import { useDemoStore } from "@/store/paired-testing-demo.store";
import type { EvidenceFile } from "@/types/paired-testing-demo.types";
import { PageHeader } from "@/components/paired-testing/shared/page-header";
import { StatusBadge } from "@/components/paired-testing/shared/status-badge";

export function EvidenceClient() {
  const evidence = useDemoStore((state) => state.evidence);
  const filter = useDemoStore((state) => state.evidenceFilter);
  const setFilter = useDemoStore((state) => state.setEvidenceFilter);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<EvidenceFile>();
  const visible = evidence.filter((file) => {
    const normalized = filter.toLowerCase();
    const filtered = normalized === "all"
      || file.evidenceType.toLowerCase().includes(normalized)
      || file.integrityStatus === normalized;
    const searched = [file.id, file.pairId, file.assignmentId, file.testerAlias, file.evidenceType].join(" ").toLowerCase().includes(query.toLowerCase());
    return filtered && searched;
  });
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Synthetic record repository" title="Evidence Repository" description="Organized demonstration evidence metadata linked to paired submissions, assignments, and protocol validation." />
      <div className="grid gap-3 sm:grid-cols-4">
        {[["Evidence records", evidence.length], ["Screenshots", evidence.filter((item) => item.evidenceType === "Quote screenshot").length], ["Screen recordings", evidence.filter((item) => item.evidenceType === "Screen recording").length], ["Flagged / missing", evidence.filter((item) => ["flagged", "missing"].includes(item.integrityStatus)).length]].map(([label, value]) => <div key={label} className="data-panel rounded-lg p-4"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p><p className="numeric mt-2 text-2xl font-semibold">{value}</p></div>)}
      </div>
      <div className="data-panel overflow-hidden rounded-lg">
        <div className="flex flex-col gap-2 border-b border-border p-3 sm:flex-row sm:justify-between">
          <div className="relative max-w-sm flex-1"><Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Search evidence" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search evidence records…" className="h-9 bg-background/45 pl-9 text-xs" /></div>
          <Select value={filter} onValueChange={setFilter}><SelectTrigger className="h-9 w-48 bg-background/45 text-xs"><SelectValue /></SelectTrigger><SelectContent>{["All", "Screenshot", "Screen recording", "Metadata", "Complete", "Missing", "Flagged", "Pending"].map((value) => <SelectItem key={value} value={value.toLowerCase()}>{value}</SelectItem>)}</SelectContent></Select>
        </div>
        <div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>File</TableHead><TableHead>Pair / assignment</TableHead><TableHead>Tester</TableHead><TableHead>Evidence type</TableHead><TableHead>Capture time</TableHead><TableHead>File</TableHead><TableHead>Synthetic hash</TableHead><TableHead>Integrity</TableHead><TableHead /></TableRow></TableHeader>
          <TableBody>{visible.map((file) => <TableRow key={file.id}><TableCell className="mono font-semibold">{file.id}</TableCell><TableCell><span className="mono text-xs">{file.pairId}</span><span className="mono block text-[10px] text-muted-foreground">{file.assignmentId}</span></TableCell><TableCell>{file.testerAlias}</TableCell><TableCell>{file.evidenceType}</TableCell><TableCell className="mono min-w-44 text-[10px]">{formatDemoDateTime(file.captureTimestamp)}</TableCell><TableCell><span className="block max-w-44 truncate text-xs">{file.filename}</span><span className="text-[10px] text-muted-foreground">{file.mimeType} · {formatFileSize(file.sizeBytes)}</span></TableCell><TableCell><span className="mono block max-w-40 truncate text-[9px] text-muted-foreground">{file.syntheticHash}</span></TableCell><TableCell><StatusBadge status={file.integrityStatus} /></TableCell><TableCell><Button variant="ghost" size="icon-sm" onClick={() => setSelected(file)}><Eye className="size-4" /><span className="sr-only">View {file.id}</span></Button></TableCell></TableRow>)}</TableBody>
        </Table></div>
        {!visible.length && <p className="p-10 text-center text-sm text-muted-foreground">No evidence records match the selected criteria.</p>}
      </div>
      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(undefined)}><SheetContent className="overflow-y-auto sm:max-w-lg"><SheetHeader><SheetTitle className="flex items-center gap-2"><FileArchive className="size-4 text-primary" />Evidence record</SheetTitle><SheetDescription>Synthetic evidence metadata preview. No external file is stored.</SheetDescription></SheetHeader>{selected && <div className="space-y-5 px-4 pb-6"><div className="rounded-lg border border-border bg-secondary/30 p-5"><p className="label-kicker">{selected.evidenceType}</p><p className="mono mt-3 text-lg font-semibold">{selected.id}</p><p className="mt-1 text-xs text-muted-foreground">{selected.filename}</p></div><dl className="space-y-3 text-xs">{[["Related pair", selected.pairId], ["Assignment", selected.assignmentId], ["Tester", selected.testerAlias], ["Capture timestamp", formatDemoDateTime(selected.captureTimestamp)], ["Submission timestamp", formatDemoDateTime(selected.submissionTimestamp)], ["MIME type", selected.mimeType], ["File size", formatFileSize(selected.sizeBytes)], ["Review status", selected.reviewStatus], ["Activity events", String(selected.chainEventCount)]].map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-b border-border/60 pb-2"><dt className="text-muted-foreground">{label}</dt><dd className="mono text-right">{value}</dd></div>)}</dl><div><p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Synthetic demonstration hash</p><p className="mono mt-2 break-all rounded-md bg-secondary p-3 text-[10px] leading-5 text-muted-foreground">{selected.syntheticHash}</p></div><p className="rounded-md border border-teal-300/20 bg-teal-300/[0.05] p-3 text-xs leading-5 text-muted-foreground">{demoConfig.shortDisclaimer}. Fixture hashes are labels only and do not constitute cryptographic chain-of-custody verification.</p></div>}</SheetContent></Sheet>
    </div>
  );
}

