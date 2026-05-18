"use client";

import { useState } from "react";
import { SectionHeader, Script } from "./SectionHeader";

export function Waitlist() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="px-6 py-[120px] text-center">
      <div className="max-w-[620px] mx-auto">
        <SectionHeader
          label="Liste d'attente"
          title={
            <>
              Sois parmi les{" "}
              <Script className="text-rose text-[48px] sm:text-[64px] md:text-[80px] inline-block leading-[0.9] my-1">
                premiers
              </Script>
            </>
          }
          desc="Eve sera lancée prochainement à Montréal. Inscris-toi pour un accès en avant-première et 3 mois Pro offerts."
        />
        <div className="fade-in inline-flex items-center gap-2.5 bg-light-gold text-deep-rose text-[10px] font-bold tracking-[0.2em] px-[22px] py-2.5 rounded-full mb-2">
          🔥 347 personnes déjà inscrites
        </div>
        <form
          onSubmit={handleSubmit}
          className="fade-in flex gap-3 mt-11 flex-wrap justify-center"
        >
          <input
            type="email"
            placeholder="ton@email.com"
            required
            disabled={submitted}
            className="flex-1 min-w-[240px] px-6 py-[17px] border-[1.5px] border-rose/25 rounded-full text-[11px] font-medium tracking-[0.12em] text-charcoal bg-warm-white outline-none focus:border-rose transition-colors placeholder:text-muted/50 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={submitted}
            className={`px-[38px] py-[18px] rounded-full text-[11px] font-bold tracking-[0.22em] text-white transition-all cursor-pointer disabled:cursor-default ${
              submitted ? "bg-[#2d6a4f]" : "bg-rose hover:bg-deep-rose hover:-translate-y-0.5"
            }`}
          >
            {submitted ? "✓ Tu es sur la liste !" : "Accès anticipé"}
          </button>
        </form>
        <p className="mt-5 text-[9px] font-medium tracking-[0.22em] text-muted">
          Aucun spam · Désabonnement en 1 clic
        </p>
      </div>
    </section>
  );
}
