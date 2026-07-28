import { createClient } from "@/utils/supabase/server";

async function getUser() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function Nav() {
  const user = await getUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 py-[18px] bg-cream/85 backdrop-blur-md border-b border-rose/10">
      <div className="font-script text-[32px] md:text-[38px] text-charcoal leading-none">
        Eve
        <span className="font-sans text-[11px] font-bold text-rose tracking-[0.25em] uppercase align-middle ml-1.5">
          AI
        </span>
      </div>
      <ul className="hidden md:flex gap-9 items-center list-none">
        <li>
          <a
            href="#how-it-works"
            className="text-[11px] font-semibold text-muted tracking-[0.16em] hover:text-rose transition-colors"
          >
            Comment ça marche
          </a>
        </li>
        <li>
          <a
            href="#categories"
            className="text-[11px] font-semibold text-muted tracking-[0.16em] hover:text-rose transition-colors"
          >
            Catégories
          </a>
        </li>
        <li>
          <a
            href="#pricing"
            className="text-[11px] font-semibold text-muted tracking-[0.16em] hover:text-rose transition-colors"
          >
            Tarifs
          </a>
        </li>
        <li>
          <a
            href="#partners"
            className="text-[11px] font-semibold text-muted tracking-[0.16em] hover:text-rose transition-colors"
          >
            Rejoindre Adam
          </a>
        </li>
        {user ? (
          <li>
            <a
              href="/dates"
              className="bg-charcoal text-cream px-[22px] py-3 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-rose hover:text-white transition-colors"
            >
              Continuer
            </a>
          </li>
        ) : (
          <>
            <li>
              <a
                href="/login"
                className="text-[11px] font-semibold text-muted tracking-[0.16em] hover:text-rose transition-colors"
              >
                Connexion
              </a>
            </li>
            <li>
              <a
                href="/start"
                className="bg-charcoal text-cream px-[22px] py-3 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-rose hover:text-white transition-colors"
              >
                Commencer
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
