"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const OAUTH_NEXT_COOKIE = "eve_oauth_next";

async function getBaseUrl(): Promise<string> {
  let url: string;
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    url = process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const proto = h.get("x-forwarded-proto") ?? "http";
    url = host ? `${proto}://${host}` : "http://localhost:3000";
  }
  // Strip trailing slashes to avoid `https://x.com//auth/callback` double-slash
  return url.replace(/\/+$/, "");
}

export async function signInWithGoogle(formData: FormData) {
  const next = (formData.get("next") as string) || "/dates";
  const supabase = await createClient();
  const baseUrl = await getBaseUrl();

  // Stash next in a cookie so the redirect_to URL stays clean (no query
  // params) — Supabase's Redirect URL matching is finicky about query strings.
  const cookieStore = await cookies();
  cookieStore.set(OAUTH_NEXT_COOKIE, next, {
    maxAge: 60 * 10,
    httpOnly: true,
    sameSite: "lax",
    secure: baseUrl.startsWith("https://"),
    path: "/",
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/auth/callback`,
    },
  });

  if (error || !data?.url) {
    redirect(`/login?error=${encodeURIComponent(error?.message ?? "OAuth init failed")}`);
  }

  redirect(data.url);
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nextRaw = formData.get("next") as string | null;
  const next = nextRaw && nextRaw.startsWith("/") ? nextRaw : "/start";

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  // If the Supabase project has email confirmation OFF, signUp returns a
  // session immediately and the user is authed — send them straight into
  // the app. Otherwise they need to click the confirmation link first.
  if (data?.session) {
    revalidatePath("/", "layout");
    redirect(next);
  }

  redirect("/login?message=Compte créé. Vérifie ton email pour le confirmer, puis connecte-toi ici.");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
