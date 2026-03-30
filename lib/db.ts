import { createClient } from "@supabase/supabase-js";

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function getBriefBySlug(slug: string) {
  const admin = getAdmin();
  const { data, error } = await admin
    .from("briefs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getLatestBriefs(limit = 9) {
  const admin = getAdmin();
  const { data } = await admin
    .from("briefs")
    .select("*")
    .eq("status", "done")
    .order("created_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}
