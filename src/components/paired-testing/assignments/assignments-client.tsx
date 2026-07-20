"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarPlus, Search } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoConfig } from "@/config/paired-testing-demo.config";
import { testerProfilesFixture } from "@/data/paired-testing-demo.fixtures";
import { assignmentSchema, type AssignmentFormValues } from "@/lib/validation/form-schemas";
import { formatDemoDate } from "@/lib/formatting/date-time";
import { useDemoStore } from "@/store/paired-testing-demo.store";
import { PageHeader } from "@/components/paired-testing/shared/page-header";
import { StatusBadge } from "@/components/paired-testing/shared/status-badge";

export function AssignmentsClient() {
  const assignments = useDemoStore((state) => state.assignments);
  const query = useDemoStore((state) => state.assignmentSearchQuery);
  const setQuery = useDemoStore((state) => state.setAssignmentSearchQuery);
  const role = useDemoStore((state) => state.role);
  const visible = assignments.filter((assignment) => {
    const a = testerProfilesFixture.find((tester) => tester.id === assignment.testerAId);
    const b = testerProfilesFixture.find((tester) => tester.id === assignment.testerBId);
    return [assignment.id, assignment.pairId, a?.alias, b?.alias].join(" ").toLowerCase().includes(query.toLowerCase());
  });
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Collection operations" title="Paired Assignments" description="Coordinate synthetic testers, testing windows, route controls, and pair readiness." actions={role === "law_firm_viewer" ? <span className="text-xs text-muted-foreground">Read-only role</span> : <AssignmentDialog />} />
      <div className="grid gap-3 sm:grid-cols-4">
        {[["Total assignments", assignments.length], ["Completed", assignments.filter((item) => item.status === "completed").length], ["Awaiting partner", assignments.filter((item) => item.status === "awaiting_partner").length], ["Locally created", Math.max(0, assignments.length - 12)]].map(([label, value]) => <div key={label} className="data-panel rounded-lg p-4"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p><p className="numeric mt-2 text-2xl font-semibold">{value}</p></div>)}
      </div>
      <div className="data-panel overflow-hidden rounded-lg">
        <div className="border-b border-border p-3">
          <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search assignments" placeholder="Search assignment, pair, tester…" className="h-9 bg-background/45 pl-9 text-xs" /></div>
        </div>
        <div className="overflow-x-auto">
          <Table><TableHeader><TableRow><TableHead>Assignment</TableHead><TableHead>Tester A</TableHead><TableHead>Tester B</TableHead><TableHead>Scheduled date</TableHead><TableHead>Route</TableHead><TableHead>Status</TableHead><TableHead>Tester A state</TableHead><TableHead>Tester B state</TableHead><TableHead>Evidence</TableHead></TableRow></TableHeader>
          <TableBody>{visible.map((assignment) => {
            const a = testerProfilesFixture.find((tester) => tester.id === assignment.testerAId);
            const b = testerProfilesFixture.find((tester) => tester.id === assignment.testerBId);
            return <TableRow key={assignment.id}><TableCell><span className="mono font-semibold">{assignment.id}</span><span className="mono block text-[10px] text-muted-foreground">{assignment.pairId}</span></TableCell><TableCell>{a?.alias}</TableCell><TableCell>{b?.alias}</TableCell><TableCell className="whitespace-nowrap">{formatDemoDate(assignment.scheduledStart)}<span className="mono block text-[10px] text-muted-foreground">{new Date(assignment.scheduledStart).toISOString().slice(11, 16)}Z–{new Date(assignment.scheduledEnd).toISOString().slice(11, 16)}Z</span></TableCell><TableCell className="min-w-52 text-xs"><span>{assignment.pickup}</span><span className="block text-muted-foreground">→ {assignment.destination}</span></TableCell><TableCell><StatusBadge status={assignment.status} /></TableCell><TableCell>{assignment.testerAStatus}</TableCell><TableCell>{assignment.testerBStatus}</TableCell><TableCell><StatusBadge status={assignment.status === "completed" ? "complete" : "pending"} /></TableCell></TableRow>;
          })}</TableBody></Table>
        </div>
        {!visible.length && <p className="p-10 text-center text-sm text-muted-foreground">No assignments match your search.</p>}
      </div>
    </div>
  );
}

function AssignmentDialog() {
  const [open, setOpen] = React.useState(false);
  const create = useDemoStore((state) => state.createDemoAssignment);
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      testerAId: testerProfilesFixture[0].id,
      testerBId: testerProfilesFixture[1].id,
      scheduledDate: "2026-05-22",
      startTime: "10:00",
      endTime: "10:15",
      platform: demoConfig.study.platform,
      pickup: demoConfig.study.pickup,
      destination: demoConfig.study.destination,
      rideTier: demoConfig.study.rideTier,
      isolatedVariable: demoConfig.study.isolatedVariable,
    },
  });
  const onSubmit = (values: AssignmentFormValues) => {
    const id = create(values);
    toast.success(`${id} created locally.`);
    reset();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button><CalendarPlus className="size-4" />Create Demo Assignment</Button></DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader><DialogTitle>Create demonstration assignment</DialogTitle><DialogDescription>This creates local synthetic state only. No server or external service is contacted.</DialogDescription></DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-4" noValidate>
          {Object.keys(errors).length > 0 && <div role="alert" className="rounded-md border border-red-400/30 bg-red-400/10 p-3 text-xs text-red-200">Review the highlighted assignment fields.</div>}
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller control={control} name="testerAId" render={({ field }) => <SelectField label="Tester A" value={field.value} onChange={field.onChange} options={testerProfilesFixture.map((tester) => [tester.id, tester.alias])} error={errors.testerAId?.message} />} />
            <Controller control={control} name="testerBId" render={({ field }) => <SelectField label="Tester B" value={field.value} onChange={field.onChange} options={testerProfilesFixture.map((tester) => [tester.id, tester.alias])} error={errors.testerBId?.message} />} />
            <Field label="Scheduled date" type="date" error={errors.scheduledDate?.message} {...register("scheduledDate")} />
            <div className="grid grid-cols-2 gap-3"><Field label="Start" type="time" error={errors.startTime?.message} {...register("startTime")} /><Field label="End" type="time" error={errors.endTime?.message} {...register("endTime")} /></div>
            <Field label="Platform" error={errors.platform?.message} {...register("platform")} />
            <Field label="Ride tier" error={errors.rideTier?.message} {...register("rideTier")} />
            <Field label="Pickup" error={errors.pickup?.message} {...register("pickup")} />
            <Field label="Destination" error={errors.destination?.message} {...register("destination")} />
          </div>
          <Field label="Isolated variable" error={errors.isolatedVariable?.message} {...register("isolatedVariable")} />
          <div className="flex justify-end gap-2 pt-2"><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Create Assignment</Button></div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, error, ...props }: React.ComponentProps<typeof Input> & { label: string; error?: string }) {
  const id = React.useId();
  return <div className="space-y-1.5"><Label htmlFor={id}>{label}</Label><Input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />{error && <p id={`${id}-error`} className="text-xs text-red-300">{error}</p>}</div>;
}
function SelectField({ label, value, onChange, options, error }: { label: string; value: string; onChange: (value: string) => void; options: string[][]; error?: string }) {
  return <div className="space-y-1.5"><Label>{label}</Label><Select value={value} onValueChange={onChange}><SelectTrigger aria-invalid={Boolean(error)}><SelectValue /></SelectTrigger><SelectContent>{options.map(([id, name]) => <SelectItem key={id} value={id}>{name}</SelectItem>)}</SelectContent></Select>{error && <p className="text-xs text-red-300">{error}</p>}</div>;
}

import React from "react";

