import Link from "next/link";
import { Script } from "@/components/Script";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { login, signup } from "./actions";

type SearchParams = Promise<{ error?: string; message?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error, message } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-[440px]">
        <Link
          href="/"
          className="block text-center font-script text-[56px] text-charcoal leading-none mb-2 hover:text-rose transition-colors"
        >
          Eve
          <span className="font-sans text-[11px] font-bold text-rose tracking-[0.3em] uppercase align-middle ml-2">
            AI
          </span>
        </Link>
        <p className="text-center font-script text-[24px] text-muted mb-12">
          Bon retour parmi nous.
        </p>

        <div className="bg-warm-white border border-rose/15 rounded-[24px] p-9 shadow-[0_24px_60px_rgba(200,114,90,0.12)]">
          <h1 className="font-sans text-[18px] font-extrabold tracking-[0.18em] text-charcoal mb-2 text-center">
            Espace <Script className="text-rose text-[34px] inline-block">admin</Script>
          </h1>
          <p className="text-[10px] tracking-[0.18em] text-muted text-center mb-8">
            Accès réservé · Gestion du contenu
          </p>

          {message && (
            <div className="bg-light-gold/40 border border-gold/30 text-deep-rose text-[10px] font-semibold tracking-[0.12em] px-4 py-3 rounded-lg mb-6 text-center">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-rose/10 border border-rose/30 text-deep-rose text-[10px] font-semibold tracking-[0.12em] px-4 py-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-4">
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
                placeholder="••••••••"
                className="w-full px-5 py-3.5 border-[1.5px] border-rose/20 rounded-xl text-[11px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40"
              />
            </div>

            <button
              formAction={login}
              className="w-full bg-rose text-white py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose transition-colors cursor-pointer mt-2"
            >
              Se connecter
            </button>
            <button
              formAction={signup}
              className="w-full bg-transparent text-charcoal border-[1.5px] border-charcoal/20 py-4 rounded-full text-[11px] font-semibold tracking-[0.22em] hover:border-rose hover:text-rose transition-colors cursor-pointer"
            >
              Créer un compte (admin)
            </button>
          </form>

          <div className="flex items-center gap-3 my-7">
            <div className="h-px bg-rose/15 flex-1" />
            <span className="text-[9px] tracking-[0.28em] text-muted">Ou</span>
            <div className="h-px bg-rose/15 flex-1" />
          </div>

          <div className="flex justify-center">
            <GoogleSignInButton
              next="/dates"
              label="Continuer avec Google"
              variant="outline"
              fullWidth
            />
          </div>
        </div>

        <p className="text-center mt-8 text-[9px] tracking-[0.2em] text-muted">
          <Link href="/" className="hover:text-rose transition-colors">
            ← Retour à l&apos;accueil
          </Link>
        </p>
      </div>
    </main>
  );
}
