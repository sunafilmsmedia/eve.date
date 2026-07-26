import Link from "next/link";
import { Script } from "@/components/Script";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { login } from "./actions";

type SearchParams = Promise<{ error?: string; message?: string; next?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error, message, next } = await searchParams;
  const safeNext = next && next.startsWith("/") ? next : "/account";

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-[480px]">
        <Link
          href="/"
          className="block text-center font-script text-[56px] text-charcoal leading-none mb-2 hover:text-rose transition-colors"
        >
          Eve
          <span className="font-sans text-[11px] font-bold text-rose tracking-[0.3em] uppercase align-middle ml-2">
            AI
          </span>
        </Link>
        <p className="text-center font-script text-[24px] text-muted mb-10">
          bon retour
        </p>

        <div className="bg-warm-white border border-rose/15 rounded-[24px] p-8 sm:p-10 shadow-[0_24px_60px_rgba(200,114,90,0.12)]">
          <h1 className="font-sans text-[16px] sm:text-[18px] font-extrabold tracking-[0.14em] text-charcoal mb-2 leading-[1.4]">
            Connecte-toi pour{" "}
            <Script className="text-rose text-[28px] sm:text-[34px] inline-block leading-[0.9]">
              continuer
            </Script>{" "}
            l&apos;aventure
          </h1>
          <p className="text-[10px] tracking-[0.14em] text-muted mb-8 leading-[1.8] normal-case">
            Retrouve tes profils, ton historique et ta progression vers Édén.
          </p>

          {message && (
            <div className="bg-light-gold/40 border border-gold/30 text-deep-rose text-[10px] font-semibold tracking-[0.12em] px-4 py-3 rounded-lg mb-6 text-center leading-[1.6] normal-case">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-rose/10 border border-rose/30 text-deep-rose text-[10px] font-semibold tracking-[0.12em] px-4 py-3 rounded-lg mb-6 text-center leading-[1.6] normal-case">
              {error}
            </div>
          )}

          {/* Email + password — PRIMARY */}
          <form action={login} className="flex flex-col gap-4 mb-2">
            <input type="hidden" name="next" value={safeNext} />
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] font-bold tracking-[0.22em] text-muted mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="ton@email.com"
                className="w-full px-5 py-3.5 border-[1.5px] border-rose/20 rounded-xl text-[11px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-[10px] font-bold tracking-[0.22em] text-muted mb-2"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-5 py-3.5 border-[1.5px] border-rose/20 rounded-xl text-[11px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose text-white py-3.5 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose transition-colors cursor-pointer mt-2"
            >
              Me connecter
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-rose/15 flex-1" />
            <span className="text-[9px] tracking-[0.28em] text-muted">Ou plus rapide</span>
            <div className="h-px bg-rose/15 flex-1" />
          </div>

          {/* Google — SECONDARY */}
          <GoogleSignInButton
            next={safeNext}
            label="Se connecter avec Google"
            variant="outline"
            fullWidth
          />
        </div>

        <p className="text-center mt-7 text-[10px] tracking-[0.18em] text-muted">
          Pas encore de compte ?{" "}
          <Link href={`/signup${next ? `?next=${encodeURIComponent(safeNext)}` : ""}`} className="text-rose hover:text-deep-rose transition-colors font-bold">
            Créer mon compte
          </Link>
        </p>

        <p className="text-center mt-3 text-[9px] tracking-[0.2em] text-muted">
          <Link href="/" className="hover:text-rose transition-colors">
            ← Retour à l&apos;accueil
          </Link>
        </p>
      </div>
    </main>
  );
}
