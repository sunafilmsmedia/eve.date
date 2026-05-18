import { SectionHeader, Script } from "./SectionHeader";

const CATEGORIES = [
  { emoji: "🌹", title: "1ères dates", count: "24 idées · Montréal +", featured: true },
  { emoji: "💍", title: "Anniversaire", count: "18 idées · 4 villes" },
  { emoji: "🎂", title: "Birthday", count: "16 idées · Toutes villes" },
  { emoji: "❄️", title: "Hiver", count: "12 idées · Québec" },
  { emoji: "🌿", title: "Nature", count: "20 idées · Région +" },
  { emoji: "🍷", title: "Gastronomie", count: "15 idées · Montréal" },
];

export function Categories() {
  return (
    <section id="categories" className="bg-charcoal px-6 py-[120px]">
      <SectionHeader
        label="Catégories"
        title={
          <>
            Pour chaque <Script className="text-gold text-[48px] sm:text-[64px] md:text-[80px] inline-block leading-[0.9] my-1">occasion</Script>
          </>
        }
        desc="Des listes curées pour chaque moment important."
        variant="dark"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 max-w-[1020px] mx-auto">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className={`fade-in relative overflow-hidden text-center px-6 py-[34px] rounded-[18px] cursor-pointer transition-all hover:-translate-y-[3px] hover:bg-gold/10 hover:border-gold border ${
              cat.featured
                ? "bg-rose/15 border-rose"
                : "bg-white/5 border-gold/20"
            }`}
          >
            {cat.featured && (
              <div className="absolute top-3.5 right-3.5 bg-rose text-white text-[8px] font-extrabold tracking-[0.2em] px-2.5 py-1 rounded-full">
                Populaire
              </div>
            )}
            <span className="block text-[30px] mb-3.5">{cat.emoji}</span>
            <div className="font-script text-[26px] text-cream mb-2.5 leading-none">
              {cat.title}
            </div>
            <div className="text-[9px] font-semibold tracking-[0.2em] text-cream/45">
              {cat.count}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
