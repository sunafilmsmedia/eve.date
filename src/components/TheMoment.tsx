import Link from "next/link";
import { Script } from "./Script";

export function TheMoment() {
  return (
    <section className="px-6 py-[120px] bg-gradient-to-b from-warm-white via-cream to-warm-white">
      <div className="max-w-[820px] mx-auto text-center">
        <p className="text-[10px] font-bold tracking-[0.32em] text-rose mb-6">
          Le moment qu&apos;on connaît tous
        </p>

        <p className="text-[14px] sm:text-[16px] tracking-[0.06em] text-muted mb-3 normal-case">
          Vendredi 17h. Ta moitié te demande :
        </p>

        <h2 className="font-sans text-[28px] sm:text-[40px] md:text-[52px] font-extrabold tracking-[0.01em] text-charcoal mb-10 leading-[1.1]">
          «{" "}
          <Script className="text-rose text-[60px] sm:text-[88px] md:text-[112px] inline-block leading-[0.85]">
            on fait quoi ce soir ?
          </Script>{" "}
          »
        </h2>

        <div className="bg-warm-white border border-rose/15 rounded-[24px] p-7 sm:p-10 mb-8 text-left max-w-[620px] mx-auto">
          <p className="text-[12px] tracking-[0.08em] text-charcoal/80 leading-[1.85] normal-case mb-5">
            Tu ouvres TikTok. Puis Google. Puis Maps. Puis ChatGPT.
          </p>
          <p className="font-script text-[28px] sm:text-[34px] text-deep-rose leading-[1.2]">
            45 minutes plus tard,
            <br />
            rien n&apos;est décidé.
          </p>
        </div>

        <p className="font-sans text-[20px] sm:text-[28px] font-extrabold tracking-[0.02em] text-charcoal mb-3 leading-[1.2]">
          Eve règle ça.
        </p>
        <p className="text-[11px] tracking-[0.14em] text-muted mb-10 leading-[1.8] max-w-[520px] mx-auto normal-case">
          En moins de 2 minutes, Eve te propose un plan adapté à ton budget, ta ville, la saison et les personnes avec qui tu sors.
        </p>

        <Link
          href="/signup"
          className="inline-block bg-rose text-white px-9 py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose hover:-translate-y-0.5 transition-all"
        >
          Trouver un plan pour ce soir
        </Link>
      </div>
    </section>
  );
}
