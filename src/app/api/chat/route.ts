import Anthropic from "@anthropic-ai/sdk";
import { DATES } from "@/lib/dates";

const client = new Anthropic();

const SYSTEM_PROMPT = `Tu es Eve, une concierge AI spécialisée en idées de dates et sorties dans la région de Montréal (Montréal, Laval, Brossard, Magog).

PERSONNALITÉ:
- Chaleureuse, attentionnée, romantique sans être mielleuse
- Tu tutoies naturellement
- Tu poses des questions pour mieux comprendre le besoin avant de recommander
- Tes réponses sont courtes : 2-3 paragraphes max, pas de longue introduction
- Tu réponds toujours en français (sauf si l'utilisateur écrit en anglais)
- Tu utilises parfois "✨" ou un cœur, jamais excessivement

QUAND TU RECOMMANDES UNE DATE:
- Utilise le nom exact du catalogue ci-dessous
- Mentionne la ville, le prix approximatif et la durée
- Explique brièvement pourquoi cette date convient à la demande
- Si plusieurs dates correspondent, propose 2-3 options classées par pertinence
- Si rien ne correspond parfaitement, propose une variation inspirée d'une date similaire et précise que c'est une suggestion sur mesure

QUAND DEMANDER DES PRÉCISIONS:
- Si la demande est vague ("conseille-moi une date"), demande l'occasion, le budget, la ville préférée et la saison
- Si l'utilisateur cherche pour quelqu'un en particulier, demande ce qu'il/elle aime

RÈGLES STRICTES:
- Ne propose JAMAIS de dates qui ne sont pas dans le catalogue (sauf variation explicite)
- Ne mentionne pas que tu es une AI ou un chatbot
- Ne sors pas du rôle de concierge dates

CATALOGUE DE DATES DISPONIBLES:
${JSON.stringify(
  DATES.map((d) => ({
    title: d.title,
    city: d.city,
    category: d.category,
    occasions: d.occasions,
    seasons: d.seasons,
    steps: d.steps,
    duration: d.duration,
    price: d.price,
    rating: d.rating,
    forSingles: d.forSingles,
    forCouples: d.forCouples,
  })),
  null,
  2
)}`;

type UserContext = {
  status?: "single" | "couple";
  partner?: {
    name?: string;
    nickname?: string;
    interests?: string[];
    vibe?: string;
    budget?: number;
  };
};

function buildUserContextBlock(ctx: UserContext): string {
  if (ctx.status === "couple" && ctx.partner) {
    const p = ctx.partner;
    return [
      `Contexte utilisateur: en couple.`,
      p.name ? `Partenaire: ${p.name}${p.nickname ? ` (surnom: ${p.nickname})` : ""}.` : "",
      p.interests?.length ? `Passions: ${p.interests.join(", ")}.` : "",
      p.vibe ? `Tempérament: ${p.vibe}.` : "",
      p.budget ? `Budget moyen par sortie: ~$${p.budget}.` : "",
      `Filtre les recommandations selon ces préférences quand pertinent.`,
    ]
      .filter(Boolean)
      .join(" ");
  }
  if (ctx.status === "single") {
    return "Contexte utilisateur: célibataire. Recommande surtout des dates pour premières rencontres ou sorties casual.";
  }
  return "Contexte utilisateur: inconnu.";
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      "ANTHROPIC_API_KEY n'est pas configuré. Ajoute-le dans .env.local et redémarre le serveur.",
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const messages: { role: "user" | "assistant"; content: string }[] = body.messages ?? [];
    const context: UserContext = body.context ?? {};

    if (!messages.length || messages[messages.length - 1].role !== "user") {
      return new Response("Bad request: messages must end with a user turn", { status: 400 });
    }

    const userContext = buildUserContextBlock(context);

    const stream = client.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
        {
          type: "text",
          text: userContext,
        },
      ],
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          const final = await stream.finalMessage();
          console.log("[chat] usage:", {
            input: final.usage.input_tokens,
            output: final.usage.output_tokens,
            cache_read: final.usage.cache_read_input_tokens,
            cache_write: final.usage.cache_creation_input_tokens,
          });
        } catch (err) {
          console.error("[chat] stream error:", err);
          controller.enqueue(
            encoder.encode("\n\n[Une erreur est survenue. Réessaye dans un moment.]")
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("[chat] route error:", err);
    return new Response("Erreur serveur", { status: 500 });
  }
}
