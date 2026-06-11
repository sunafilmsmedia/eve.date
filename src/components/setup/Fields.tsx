"use client";

type FieldLabelProps = {
  children: React.ReactNode;
  hint?: string;
};

export function FieldLabel({ children, hint }: FieldLabelProps) {
  return (
    <label className="block text-[10px] font-bold tracking-[0.22em] text-muted mb-3">
      {children}
      {hint && (
        <span className="text-rose ml-2 tracking-normal lowercase font-normal">
          {hint}
        </span>
      )}
    </label>
  );
}

type TextInputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "number";
};

export function TextInput({
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder={placeholder}
      className="w-full px-5 py-3.5 border-[1.5px] border-rose/20 rounded-xl text-[12px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40"
    />
  );
}

type ChipProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function Chip({ active, onClick, children }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[10px] font-bold tracking-[0.14em] px-4 py-2.5 rounded-full border-[1.5px] transition-all ${
        active
          ? "bg-rose text-white border-rose"
          : "bg-cream text-muted border-rose/20 hover:border-rose hover:text-rose"
      }`}
    >
      {children}
    </button>
  );
}

type TagSelectorProps = {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export function TagSelector({ options, selected, onChange }: TagSelectorProps) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Chip key={opt} active={selected.includes(opt)} onClick={() => toggle(opt)}>
          {opt}
        </Chip>
      ))}
    </div>
  );
}

type SingleSelectProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export function SingleSelect({ options, value, onChange }: SingleSelectProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Chip
          key={opt}
          active={value === opt}
          onClick={() => onChange(value === opt ? "" : opt)}
        >
          {opt}
        </Chip>
      ))}
    </div>
  );
}

type SliderProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
};

export function Slider({ min, max, step, value, onChange, format }: SliderProps) {
  const display = format ? format(value) : String(value);
  return (
    <div className="flex items-center gap-5">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-rose"
      />
      <span className="font-script text-[36px] text-rose leading-none min-w-[110px] text-right">
        {display}
      </span>
    </div>
  );
}

type FormCardProps = {
  title: string;
  scriptWord: string;
  description: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
};

export function FormCard({
  title,
  scriptWord,
  description,
  children,
  onSubmit,
  submitLabel = "Créer le profil →",
}: FormCardProps) {
  return (
    <>
      <h1 className="font-sans text-[24px] sm:text-[34px] font-extrabold tracking-[0.02em] text-charcoal mb-2 leading-[1.15]">
        {title}
      </h1>
      <p className="font-script text-[52px] sm:text-[72px] text-rose mb-4 leading-[0.9]">
        {scriptWord}
      </p>
      <p className="text-[11px] tracking-[0.16em] text-muted mb-10 leading-[1.8] max-w-lg">
        {description}
      </p>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-8 bg-warm-white border border-rose/15 rounded-[24px] p-7 sm:p-12"
      >
        {children}

        <button
          type="submit"
          className="w-full bg-rose text-white py-4 rounded-full text-[11px] font-bold tracking-[0.22em] hover:bg-deep-rose hover:-translate-y-0.5 transition-all cursor-pointer mt-2"
        >
          {submitLabel}
        </button>
      </form>
    </>
  );
}
