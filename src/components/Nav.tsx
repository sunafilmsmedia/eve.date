export function Nav() {
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
            href="#suggestions"
            className="text-[11px] font-semibold text-muted tracking-[0.16em] hover:text-rose transition-colors"
          >
            Suggestions
          </a>
        </li>
        <li>
          <a
            href="#waitlist"
            className="bg-charcoal text-cream px-[22px] py-3 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-rose hover:text-white transition-colors"
          >
            Rejoindre
          </a>
        </li>
      </ul>
    </nav>
  );
}
