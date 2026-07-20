import { PairTable } from "@/components/paired-testing/shared/pair-table";
import { PageHeader } from "@/components/paired-testing/shared/page-header";
import { DisclaimerAlert } from "@/components/paired-testing/shared/disclaimer-alert";

export default function PairsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Technical conformity & expert review" title="Matched Pairs" description="Inspect side-by-side synthetic quote submissions, automated protocol checks, evidence completeness, and review decisions." />
      <DisclaimerAlert compact />
      <PairTable />
    </div>
  );
}

