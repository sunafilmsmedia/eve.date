export function Footer() {
  return (
    <footer className="bg-charcoal px-6 pt-14 pb-9 text-center">
      <div className="font-script text-[56px] text-cream mb-2 leading-none">
        Eve
        <span className="font-sans text-[11px] font-bold text-rose tracking-[0.3em] uppercase align-middle ml-2">
          AI
        </span>
      </div>
      <p className="font-script text-[22px] text-cream/55 mb-9">
        L&apos;art de sortir, réinventé.
      </p>
      <div className="flex justify-center gap-[22px] flex-wrap mb-9">
        {["Montréal", "·", "Laval", "·", "Brossard", "·", "Magog"].map((c, i) => (
          <span
            key={i}
            className="text-[10px] font-semibold text-cream/40 tracking-[0.24em]"
          >
            {c}
          </span>
        ))}
      </div>
      <p className="text-[9px] font-medium tracking-[0.2em] text-cream/25 border-t border-white/6 pt-7">
        © 2026 Eve AI · Tous droits réservés
      </p>
    </footer>
  );
}
