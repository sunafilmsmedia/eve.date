"use client";

import { useState } from "react";
import { Script } from "./Script";

export function Suggestions() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="suggestions"
      className="px-6 py-[120px] bg-gradient-to-br from-light-gold to-blush"
    >
      <div className="fade-in max-w-[680px] mx-auto bg-warm-white rounded-[28px] p-7 sm:p-[52px] text-center shadow-[0_24px_60px_rgba(200,114,90,0.18)]">
        <h2 className="font-sans text-[24px] sm:text-[32px] md:text-[38px] font-extrabold tracking-[0.02em] text-charcoal mb-5 leading-[1.15]">
          Tu as une{" "}
          <Script className="text-rose text-[42px] sm:text-[56px] md:text-[68px] inline-block leading-[0.9]">
            idée
          </Script>
        </h2>
        <p className="text-[11px] tracking-[0.16em] text-muted leading-[1.9] mb-10">
          Soumets ton idée à la communauté Eve. Si elle est testée et bien notée, elle sera officiellement intégrée à l&apos;application.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <input
            type="text"
            placeholder="Nom de ta date"
            required
            className="w-full px-[22px] py-4 border-[1.5px] border-rose/20 rounded-[12px] text-[11px] font-medium tracking-[0.12em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/50"
          />
          <input
            type="text"
            placeholder="Ville"
            required
            className="w-full px-[22px] py-4 border-[1.5px] border-rose/20 rounded-[12px] text-[11px] font-medium tracking-[0.12em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/50"
          />
          <textarea
            rows={3}
            placeholder="Décris les étapes..."
            className="w-full px-[22px] py-4 border-[1.5px] border-rose/20 rounded-[12px] text-[11px] font-medium tracking-[0.12em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/50 resize-none"
          />
          <input
            type="email"
            placeholder="Ton courriel"
            className="w-full px-[22px] py-4 border-[1.5px] border-rose/20 rounded-[12px] text-[11px] font-medium tracking-[0.12em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/50"
          />
          <button
            type="submit"
            disabled={submitted}
            className={`px-[38px] py-[18px] rounded-full text-[11px] font-bold tracking-[0.22em] text-white transition-all cursor-pointer disabled:cursor-default ${
              submitted ? "bg-[#2d6a4f]" : "bg-rose hover:bg-deep-rose hover:-translate-y-0.5"
            }`}
          >
            {submitted ? "✓ Idée soumise !" : "Soumettre mon idée"}
          </button>
        </form>
      </div>
    </section>
  );
}
