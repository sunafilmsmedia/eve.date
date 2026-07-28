"use client";

import { useState } from "react";

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
  allowCustom?: boolean;
  customPlaceholder?: string;
};

export function SingleSelect({
  options,
  value,
  onChange,
  allowCustom,
  customPlaceholder,
}: SingleSelectProps) {
  // Custom mode = the current value is a free-typed string (not in the preset list),
  // OR the user has explicitly clicked "Autre..." but not yet typed anything.
  const derivedCustom = !!allowCustom && value !== "" && !options.includes(value);
  const [customMode, setCustomMode] = useState(derivedCustom);
  const isCustom = customMode || derivedCustom;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <Chip
            key={opt}
            active={value === opt && !isCustom}
            onClick={() => {
              setCustomMode(false);
              onChange(value === opt ? "" : opt);
            }}
          >
            {opt}
          </Chip>
        ))}
        {allowCustom && (
          <Chip
            active={isCustom}
            onClick={() => {
              if (isCustom) {
                setCustomMode(false);
                onChange("");
              } else {
                setCustomMode(true);
                if (options.includes(value)) onChange("");
              }
            }}
          >
            Autre…
          </Chip>
        )}
      </div>
      {isCustom && (
        <input
          type="text"
          autoFocus
          placeholder={customPlaceholder ?? "Précise…"}
          value={options.includes(value) ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-5 py-3 border-[1.5px] border-rose/30 rounded-xl text-[12px] font-medium tracking-[0.1em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/40"
        />
      )}
    </div>
  );
}

// Multi-tag input: type + Enter or comma to add a tag; Backspace on empty
// input removes the last tag. Paste "a, b, c" splits into 3 tags at once.
type TagInputProps = {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
};

export function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const [draft, setDraft] = useState("");

  const commit = (raw: string) => {
    const parts = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!parts.length) return;
    const next = [...value];
    for (const p of parts) if (!next.includes(p)) next.push(p);
    onChange(next);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v.includes(",")) {
      commit(v);
      setDraft("");
    } else {
      setDraft(v);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit(draft);
      setDraft("");
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center border-[1.5px] border-rose/20 rounded-xl px-3 py-2.5 bg-cream focus-within:border-rose transition-colors min-h-[52px]">
      {value.map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          className="inline-flex items-center gap-2 bg-rose/10 text-deep-rose text-[10px] font-bold tracking-[0.1em] px-3 py-1.5 rounded-full normal-case"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="text-rose/50 hover:text-rose leading-none cursor-pointer text-[14px]"
            aria-label={`Retirer ${tag}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={draft}
        onChange={handleChange}
        onKeyDown={handleKey}
        onBlur={() => {
          if (draft) {
            commit(draft);
            setDraft("");
          }
        }}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[140px] px-2 py-1.5 text-[12px] font-medium tracking-[0.1em] text-charcoal bg-transparent outline-none placeholder:text-muted/40"
      />
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
  submitDisabled?: boolean;
  submitHint?: string;
};

export function FormCard({
  title,
  scriptWord,
  description,
  children,
  onSubmit,
  submitLabel = "Créer le profil →",
  submitDisabled = false,
  submitHint,
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

        <div className="mt-2">
          <button
            type="submit"
            disabled={submitDisabled}
            className={`w-full py-4 rounded-full text-[11px] font-bold tracking-[0.22em] transition-all ${
              submitDisabled
                ? "bg-rose/30 text-white/70 cursor-not-allowed"
                : "bg-rose text-white hover:bg-deep-rose hover:-translate-y-0.5 cursor-pointer"
            }`}
          >
            {submitLabel}
          </button>
          {submitDisabled && submitHint && (
            <p className="text-[10px] tracking-[0.14em] text-muted mt-3 text-center normal-case">
              {submitHint}
            </p>
          )}
        </div>
      </form>
    </>
  );
}
