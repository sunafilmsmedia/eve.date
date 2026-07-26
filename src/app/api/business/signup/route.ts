import { createClient } from "@/utils/supabase/server";

type Payload = {
  business_name?: string;
  business_type?: string;
  email?: string;
  phone?: string;
  website?: string;
  tax_number?: string;
  billing_address?: string;
  description?: string;
  tier?: string;
  interested_in_sponsoring?: boolean;
  sponsored_offer?: string;
};

const ALLOWED_TIERS = new Set(["depart", "croissance", "domination", "pas_sur"]);

const REQUIRED_FIELDS: (keyof Payload)[] = [
  "business_name",
  "business_type",
  "email",
  "website",
  "tax_number",
  "billing_address",
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return Response.json(
      { error: "Supabase not configured" },
      { status: 503 }
    );
  }

  let payload: Payload;
  try {
    payload = (await req.json()) as Payload;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Validate required fields
  for (const field of REQUIRED_FIELDS) {
    const v = payload[field];
    if (typeof v !== "string" || v.trim().length === 0) {
      return Response.json(
        { error: `Champ requis manquant : ${field}` },
        { status: 400 }
      );
    }
  }

  if (!isValidEmail(payload.email!)) {
    return Response.json(
      { error: "Adresse email invalide" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const tier = payload.tier?.trim();
  const tierValue = tier && ALLOWED_TIERS.has(tier) ? tier : null;

  const { error } = await supabase.from("business_signups").insert({
    business_name: payload.business_name!.trim(),
    business_type: payload.business_type!.trim(),
    email: payload.email!.trim().toLowerCase(),
    phone: payload.phone?.trim() || null,
    website: payload.website!.trim(),
    tax_number: payload.tax_number!.trim(),
    billing_address: payload.billing_address!.trim(),
    description: payload.description?.trim() || null,
    tier: tierValue,
    interested_in_sponsoring: payload.interested_in_sponsoring === true,
    sponsored_offer: payload.sponsored_offer?.trim() || null,
  });

  if (error) {
    console.error("[business/signup] insert error:", error);
    return Response.json(
      { error: "Erreur lors de l'enregistrement. Réessaye dans un moment." },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
