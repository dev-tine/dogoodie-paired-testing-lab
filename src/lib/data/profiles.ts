import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

export type AppRole = Database["public"]["Enums"]["app_role"];
export type AccountStatus = Database["public"]["Enums"]["account_status"];

export interface CurrentProfile {
  id: string;
  email: string;
  displayName: string | null;
  accountStatus: AccountStatus;
  role: AppRole;
}

export async function getProfileByUserId(
  userId: string,
  suppliedClient?: SupabaseClient<Database>,
): Promise<CurrentProfile | null> {
  const supabase = suppliedClient ?? await createClient();
  const [profileResult, roleResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("id,email,display_name,account_status")
      .eq("id", userId)
      .maybeSingle(),
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle(),
  ]);

  if (profileResult.error || roleResult.error || !profileResult.data || !roleResult.data) {
    return null;
  }

  return {
    id: profileResult.data.id,
    email: profileResult.data.email,
    displayName: profileResult.data.display_name,
    accountStatus: profileResult.data.account_status,
    role: roleResult.data.role,
  };
}
