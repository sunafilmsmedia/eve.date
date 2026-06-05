"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleSignInButton } from "./GoogleSignInButton";

const INTERESTS = [
  "Vin & Gastronomie",
  "Plein air & Nature",
  "Art & Culture",
  "Sport & Aventure",
  "Cinéma & Théâtre",
  "Musique & Concerts",
  "Cuisine & Brunchs",
  "Spa & Détente",
  "Mode & Shopping",
  "Voyages & Découverte",
  "Cocktails & Mixologie",
  "Jeux & Soirées casual",
];

const VIBES = [
  "Romantique",
  "Aventurier·ère",
  "Casanier·ère",
  "Festif·ve",
  "Calme & introspectif·ve",
];

export function AvatarForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [vibe, setVibe] = useState<string>("");
  const [budget, setBudget] = useState(80);

  const toggleInterest = (i: string) => {
    setInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const partner = { name, nickname, interests, vibe, budget };
    if (typeof window !== "undefined") {
      localStorage.setItem("eve_status", "couple");
      localStorage.setItem("eve_partner", JSON.stringify(partner));
    }
    router.push("/dates");
  };

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="max-w-[680px] mx-auto">
        <Link
          href="/"
          className="inline-block font-script text-[34px] text-charcoal leading-none hover:text-rose transition-colors"
        >
          Eve
          <span className="font-sans text-[10px] font-bold text-rose tracking-[0.3em] uppercase align-middle ml-1.5">
            AI
          </span>
        </Link>
        <p className="text-[10px] tracking-[0.22em] text-muted mt-3 mb-10">
          Étape 1 · Avatar de ta moitié
        </p>

        <h1 className="font-sans text-[24px] sm:text-[34px] font-extrabold tracking-[0.02em] text-charcoal mb-2 leading-[1.15]">
          Parle-moi de
        </h1>
        <p className="font-script text-[52px] sm:text-[72px] text-rose mb-4 leading-[0.9]">
          ta moitié
        </p>
        <p className="text-[11px] tracking-[0.16em] text-muted mb-8 leading-[1.8] max-w-lg">
          Pour qu&apos;Eve te crée des dates vraiment personnalisées, j&apos;ai besoin de mieux la·le connaître.
        </p>

        {/* Account benefits banner */}
        <div className="bg-gradient-to-br from-light-gold/40 to-blush/30 border border-gold/30 rounded-[20px] p-7 mb-10">
          <div className="flex items-start gap-4 mb-5">
            <span className="text-[28px] leading-none mt-1">✨</span>
            <div>
              <p className="text-[10px] font-bold tracking-[0.28em] text-deep-rose mb-2">
                Crée un compte pour sauvegarder ton avatar
              </p>
              <p className="text-[10px] tracking-[0.14em] text-muted leading-[1.8]">
                Sans compte, ton avatar reste uniquement sur cet appareil. Crée un compte gratuit pour profiter de :
              </p>
            </div>
          </div>
          <ul className="list-none space-y-2 mb-6 pl-12">
            {[
              "Avatar sauvegardé et accessible partout",
              "Historique de tes conversations avec Eve",
              "Synchronisation entre tes appareils",
              "Préférences personnalisées (langue, ville…)",
              "Accès aux abonnements Pomme et fonctionnalités à venir",
            ].map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2.5 text-[10px] tracking-[0.12em] text-charcoal/80 leading-[1.7]"
              >
                <span className="text-rose font-bold flex-shrink-0 mt-0.5">○</span>
                {benefit}
              </li>
            ))}
          </ul>
          <div className="flex gap-3 flex-wrap pl-12 items-center">
            <GoogleSignInButton next="/avatar" label="Continuer avec Google" />
            <p className="text-[9px] tracking-[0.18em] text-muted self-center">
              ou continue sans compte ci-dessous
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 bg-warm-white border border-rose/15 rounded-[24px] p-7 sm:p-12"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-[10px] font-bold tracking-[0.22em] text-muted mb-3"
            >
              Son prénom *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Marie, Alex, Sam..."
              className="w-full px-5 py-3.5 border-[1.5px] border-rose/20 rounded-xl text-[12px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40"
            />
          </div>

          <div>
            <label
              htmlFor="nickname"
              className="block text-[10px] font-bold tracking-[0.22em] text-muted mb-3"
            >
              Surnom (optionnel)
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Chouchou, Bébé d'amour..."
              className="w-full px-5 py-3.5 border-[1.5px] border-rose/20 rounded-xl text-[12px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-[0.22em] text-muted mb-3">
              Ses passions
              <span className="text-rose ml-2 tracking-normal lowercase font-normal">
                (autant que tu veux)
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleInterest(i)}
                  className={`text-[10px] font-bold tracking-[0.14em] px-4 py-2.5 rounded-full border-[1.5px] transition-all ${
                    interests.includes(i)
                      ? "bg-rose text-white border-rose"
                      : "bg-cream text-muted border-rose/20 hover:border-rose hover:text-rose"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-[0.22em] text-muted mb-3">
              Son tempérament en couple
            </label>
            <div className="flex flex-wrap gap-2">
              {VIBES.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVibe(v === vibe ? "" : v)}
                  className={`text-[10px] font-bold tracking-[0.14em] px-4 py-2.5 rounded-full border-[1.5px] transition-all ${
                    vibe === v
                      ? "bg-rose text-white border-rose"
                      : "bg-cream text-muted border-rose/20 hover:border-rose hover:text-rose"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="budget"
              className="block text-[10px] font-bold tracking-[0.22em] text-muted mb-4"
            >
              Budget moyen par sortie
            </label>
            <div className="flex items-center gap-5">
              <input
                id="budget"
                type="range"
                min={30}
                max={300}
                step={10}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="flex-1 accent-rose"
              />
              <span className="font-script text-[40px] text-rose leading-none min-w-[100px] text-right">
                ${budget}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-rose text-white py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose hover:-translate-y-0.5 transition-all cursor-pointer mt-2"
          >
            Créer son avatar →
          </button>
        </form>

        <p className="text-center mt-6 text-[9px] tracking-[0.2em] text-muted">
          <Link href="/start" className="hover:text-rose transition-colors">
            ← Modifier ma situation
          </Link>
        </p>
      </div>
    </main>
  );
}
