import { AppShell } from "@/components/paired-testing/layout/app-shell";
import { requireActiveUser } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function PairedTestingLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireActiveUser("/paired-testing-demo");

  return (
    <AppShell user={{
      email: profile.email,
      displayName: profile.displayName,
      role: profile.role,
    }}>
      {children}
    </AppShell>
  );
}
