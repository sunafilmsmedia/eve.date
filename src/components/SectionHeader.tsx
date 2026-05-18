import { Script } from "./Script";

type SectionHeaderProps = {
  label: string;
  title: React.ReactNode;
  desc?: string;
  variant?: "light" | "dark";
};

export function SectionHeader({ label, title, desc, variant = "light" }: SectionHeaderProps) {
  const labelColor = variant === "dark" ? "text-gold" : "text-rose";
  const titleColor = variant === "dark" ? "text-cream" : "text-charcoal";
  const descColor = variant === "dark" ? "text-cream/55" : "text-muted";

  return (
    <>
      <p
        className={`fade-in text-center text-[10px] font-bold tracking-[0.32em] ${labelColor} mb-5`}
      >
        {label}
      </p>
      <h2
        className={`fade-in text-center font-sans text-[28px] sm:text-[36px] md:text-[44px] font-extrabold leading-[1.15] tracking-[0.02em] ${titleColor} mb-5`}
      >
        {title}
      </h2>
      {desc && (
        <p
          className={`fade-in text-center text-[12px] tracking-[0.16em] ${descColor} max-w-[580px] mx-auto mb-[72px] leading-[1.9]`}
        >
          {desc}
        </p>
      )}
    </>
  );
}

export { Script };
