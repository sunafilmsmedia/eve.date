"use client";

import { useState, useMemo } from "react";
import { CATEGORIES, type DateIdea } from "@/lib/dates";

type DatesDrawerProps = {
  dates: DateIdea[];
};

export function DatesDrawer({ dates }: DatesDrawerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dates;
    return dates.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
    );
  }, [dates, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, DateIdea[]>();
    for (const d of filtered) {
      const arr = map.get(d.category) ?? [];
      arr.push(d);
      map.set(d.category, arr);
    }
    return map;
  }, [filtered]);

  return (
    <>
      {/* Trigger button — always visible, top-left, fixed */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-40 bg-charcoal text-cream px-4 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] hover:bg-rose transition-colors shadow-[0_8px_24px_rgba(0,0,0,0.15)] cursor-pointer flex items-center gap-2"
        aria-label="Ouvrir le catalogue"
      >
        <span className="text-[14px] leading-none">☰</span>
        <span>Catalogue · {dates.length}</span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[340px] max-w-[85vw] z-50 bg-cream border-r border-rose/15 shadow-[8px_0_32px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-rose/10">
            <div>
              <p className="text-[9px] font-bold tracking-[0.32em] text-rose mb-0.5">
                Catalogue
              </p>
              <p className="font-script text-[26px] text-charcoal leading-none">
                {dates.length} dates
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-charcoal hover:bg-rose/10 hover:text-rose transition-colors cursor-pointer text-[18px]"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>

          {/* Search */}
          <div className="px-5 py-4 border-b border-rose/10">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher (nom, ville…)"
              className="w-full px-4 py-2.5 border border-rose/20 rounded-xl text-[11px] font-medium tracking-[0.06em] text-charcoal bg-warm-white outline-none focus:border-rose transition-colors placeholder:text-muted/40 normal-case"
            />
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {filtered.length === 0 ? (
              <p className="text-[10px] tracking-[0.14em] text-muted text-center py-10 normal-case">
                Aucune date pour « {query} »
              </p>
            ) : (
              CATEGORIES.map((cat) => {
                const items = grouped.get(cat.value);
                if (!items || items.length === 0) return null;
                return (
                  <div key={cat.value} className="mb-6">
                    <p className="text-[9px] font-bold tracking-[0.28em] text-rose mb-2.5 flex items-center gap-1.5">
                      <span>{cat.emoji}</span>
                      <span>{cat.label}</span>
                      <span className="text-muted/60">· {items.length}</span>
                    </p>
                    <ul className="list-none space-y-0.5">
                      {items.map((d) => (
                        <li key={d.id}>
                          <a
                            href={`#${d.id}`}
                            onClick={() => setOpen(false)}
                            className="block py-2 px-2 -mx-2 rounded-lg text-[11px] tracking-[0.04em] text-charcoal hover:bg-rose/5 hover:text-rose transition-colors normal-case leading-[1.4]"
                          >
                            <span className="font-semibold">{d.title}</span>
                            <span className="block text-[9px] tracking-[0.14em] text-muted mt-0.5">
                              {d.city} · {d.price}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
