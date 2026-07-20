import { PairComparisonClient } from "@/components/paired-testing/comparison/pair-comparison-client";

export default async function PairComparisonPage({ params }: { params: Promise<{ pairId: string }> }) {
  const { pairId } = await params;
  return <PairComparisonClient pairId={pairId} />;
}

