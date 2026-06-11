import Link from "next/link";
import { Script } from "./Script";

export function FounderOffer() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-[860px] mx-auto">
        <div className="bg-gradient-to-br from-charcoal to-[#2a221d] rounded-[28px] p-8 sm:p-12 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 20% 30%, rgba(201, 169, 110, 0.45) 0%, transparent 55%), radial-gradient(circle at 85% 70%, rgba(200, 114, 90, 0.35) 0%, transparent 50%)",
            }}
          />
          <div className="relative grid grid-cols-1 md:grid-cols-[1.4fr,1fr] gap-8 items-center">
            <div>
              <p className="text-[10px] font-bold tracking-[0.32em] text-gold mb-3">
                Accès fondateur · 500 premiers membres
              </p>
              <h3 className="font-sans text-[22px] sm:text-[28px] font-extrabold tracking-[0.02em] text-cream leading-[1.2] mb-3">
                Édén à{" "}
                <Script className="text-gold text-[44px] sm:text-[56px] inline-block leading-[0.9]">
                  69 $/an
                </Script>{" "}
                à vie
              </h3>
              <p className="text-[11px] tracking-[0.12em] text-cream/70 leading-[1.8] normal-case">
                Verrouille le tarif fondateur de 69 $/an pour toujours. Ce prix ne sera plus jamais accessible après les 500 premiers membres.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3">
              <Link
                href="/signup"
                className="bg-rose text-white px-9 py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                Réserver ma place
              </Link>
              <p className="text-[9px] tracking-[0.22em] text-cream/50">
                Aucune carte requise pour s&apos;inscrire
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
