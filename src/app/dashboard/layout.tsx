import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/login/actions";
import { Script } from "@/components/Script";

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-lg">
          <Script className="block text-rose text-[68px] mb-4 leading-none">
            Configuration requise
          </Script>
          <p className="text-[11px] tracking-[0.16em] text-muted leading-[1.8] mb-6">
            Supabase n&apos;est pas encore configuré. Copie{" "}
            <code className="bg-rose/10 text-rose px-2 py-0.5 rounded">.env.local.example</code>{" "}
            vers{" "}
            <code className="bg-rose/10 text-rose px-2 py-0.5 rounded">.env.local</code>{" "}
            et ajoute tes clés Supabase.
          </p>
          <a
            href="https://supabase.com/dashboard/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-rose text-white px-9 py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose transition-colors"
          >
            Créer un projet Supabase
          </a>
        </div>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const adminEmails = getAdminEmails();
  const isAdmin = adminEmails.includes(user.email?.toLowerCase() ?? "");

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <h1 className="font-script text-[68px] text-rose mb-4 leading-none">
            Accès refusé
          </h1>
          <p className="text-[11px] tracking-[0.16em] text-muted mb-8 leading-[1.8]">
            Ce compte ({user.email}) n&apos;est pas autorisé à accéder au tableau de bord.
          </p>
          <form action={logout}>
            <button
              type="submit"
              className="bg-rose text-white px-9 py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose transition-colors cursor-pointer"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-rose/10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="font-script text-[32px] text-charcoal leading-none">
            Eve
            <span className="font-sans text-[10px] font-bold text-rose tracking-[0.25em] uppercase align-middle ml-1.5">
              Dashboard
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-7">
            <Link
              href="/dashboard"
              className="text-[10px] font-semibold text-muted tracking-[0.18em] hover:text-rose transition-colors"
            >
              Aperçu
            </Link>
            <Link
              href="/dashboard/dates"
              className="text-[10px] font-semibold text-muted tracking-[0.18em] hover:text-rose transition-colors"
            >
              Dates
            </Link>
            <Link
              href="/dashboard/waitlist"
              className="text-[10px] font-semibold text-muted tracking-[0.18em] hover:text-rose transition-colors"
            >
              Inscrits
            </Link>
            <Link
              href="/dashboard/suggestions"
              className="text-[10px] font-semibold text-muted tracking-[0.18em] hover:text-rose transition-colors"
            >
              Suggestions
            </Link>
            <Link
              href="/dashboard/settings"
              className="text-[10px] font-semibold text-muted tracking-[0.18em] hover:text-rose transition-colors"
            >
              Paramètres
            </Link>
          </nav>
          <form action={logout}>
            <button
              type="submit"
              className="text-[10px] font-bold text-muted tracking-[0.2em] hover:text-rose transition-colors cursor-pointer"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 md:px-10 py-12">
        <p className="text-[10px] tracking-[0.22em] text-muted mb-2">
          Connecté en tant que · {user.email}
        </p>
        <div className="font-script text-[18px] text-rose mb-8">
          Bienvenue <Script>{(user.email?.split("@")[0] ?? "admin")}</Script>
        </div>
        {children}
      </main>
    </div>
  );
}
