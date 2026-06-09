import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const OAUTH_NEXT_COOKIE = "eve_oauth_next";
const DEFAULT_NEXT = "/dates";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  const cookieStore = await cookies();
  const next = cookieStore.get(OAUTH_NEXT_COOKIE)?.value ?? DEFAULT_NEXT;
  cookieStore.delete(OAUTH_NEXT_COOKIE);

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? origin;
  return NextResponse.redirect(`${baseUrl}${next}`);
}
