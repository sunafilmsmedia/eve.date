"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  type CoupleProfile,
  type PartnerGender,
  getPartnerPronoun,
} from "@/lib/profile";
import { persistProfile } from "./persistProfile";
import {
  FieldLabel,
  TextInput,
  TagSelector,
  SingleSelect,
  Slider,
  FormCard,
} from "./Fields";

const INTERESTS = [
  "Vin & Gastronomie",
  "Plein air & Nature",
  "Art & Culture",
  "Sport & Aventure",
  "Cinéma & Théâtre",
  "Musique & Concerts",
  "Cuisine & Brunchs",
  "Spa & Détente",
  "Mode & Shopping",
  "Voyages",
  "Cocktails & Mixologie",
  "Jeux de société",
];

const TEMPERAMENTS = [
  "Romantique",
  "Aventurier·ère",
  "Casanier·ère",
  "Festif·ve",
  "Calme & introspectif·ve",
];

const STAGES = [
  "Début de fréquentation (0-3 mois)",
  "Couple récent (3-9 mois)",
  "Couple installé (9 mois – 2 ans)",
  "Relation longue (2-5 ans)",
  "Relation très longue (5+ ans)",
  "Mariés / vie commune",
];

const VIBES = ["Cozy", "Chic", "Romantique", "Fun", "Intime", "Premium"];

const GENDER_OPTIONS: { value: PartnerGender; label: string }[] = [
  { value: "woman", label: "Une femme" },
  { value: "man", label: "Un homme" },
];

export function CoupleForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [partnerGender, setPartnerGender] = useState<PartnerGender | "">("");
  const [interests, setInterests] = useState<string[]>([]);
  const [temperament, setTemperament] = useState("");
  const [budget, setBudget] = useState(80);
  const [stage, setStage] = useState("");
  const [vibe, setVibe] = useState("");
  const [likes, setLikes] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);

  const pronoun = getPartnerPronoun(partnerGender || undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const profile: CoupleProfile = {
      type: "couple",
      name,
      partnerGender: partnerGender || undefined,
      interests,
      temperament: temperament || undefined,
      budget,
      relationshipStage: stage || undefined,
      vibe: vibe || undefined,
      likes: likes.length ? likes : undefined,
      dislikes: dislikes.length ? dislikes : undefined,
    };
    await persistProfile(profile);
    router.push("/dates");
  };

  const gateOpen = partnerGender !== "";

  return (
    <FormCard
      title="Parle-moi de"
      scriptWord="ta moitié"
      description="Eve va t'aider à créer des sorties vraiment adaptées à votre couple."
      onSubmit={handleSubmit}
      submitDisabled={!gateOpen}
      submitHint="Choisis d'abord si ta moitié est une femme ou un homme."
    >
      <div>
        <FieldLabel>Ta moitié est *</FieldLabel>
        <SingleSelect
          options={GENDER_OPTIONS.map((g) => g.label)}
          value={
            partnerGender
              ? GENDER_OPTIONS.find((g) => g.value === partnerGender)?.label ?? ""
              : ""
          }
          onChange={(label) => {
            const match = GENDER_OPTIONS.find((g) => g.label === label);
            setPartnerGender(match ? match.value : "");
          }}
        />
      </div>

      {!gateOpen && (
        <div className="bg-light-gold/30 border border-gold/30 rounded-[18px] p-5 text-center">
          <p className="font-script text-[26px] text-deep-rose leading-none mb-1.5">
            un instant
          </p>
          <p className="text-[10px] tracking-[0.14em] text-muted leading-[1.7] normal-case">
            Fais ce choix pour qu&apos;Eve adapte tout le reste (elle / il, ses passions, ses surnoms, tout ça).
          </p>
        </div>
      )}

      {gateOpen && (
        <>
      <div>
        <FieldLabel>Son prénom *</FieldLabel>
        <TextInput
          value={name}
          onChange={setName}
          required
          placeholder="Marie, Alex, Sam…"
        />
      </div>

      <div>
        <FieldLabel hint="(plusieurs choix)">Ses passions</FieldLabel>
        <TagSelector options={INTERESTS} selected={interests} onChange={setInterests} />
      </div>

      <div>
        <FieldLabel>Son tempérament en couple</FieldLabel>
        <SingleSelect
          options={TEMPERAMENTS}
          value={temperament}
          onChange={setTemperament}
          allowCustom
          customPlaceholder="Comment tu le/la décrirais ?"
        />
      </div>

      <div>
        <FieldLabel>Stade de votre relation</FieldLabel>
        <SingleSelect
          options={STAGES}
          value={stage}
          onChange={setStage}
          allowCustom
          customPlaceholder="Décris votre situation…"
        />
      </div>

      <div>
        <FieldLabel>Ambiance recherchée</FieldLabel>
        <SingleSelect
          options={VIBES}
          value={vibe}
          onChange={setVibe}
          allowCustom
          customPlaceholder="Ambiance sur mesure…"
        />
      </div>

      <div>
        <FieldLabel hint="(optionnel)">Ce qu&apos;{pronoun} adore</FieldLabel>
        <TagSelector
          options={[
            "Restos cachés",
            "Surprises",
            "Plein air",
            "Cocktails",
            "Films cultes",
            "Shopping",
          ]}
          selected={likes}
          onChange={setLikes}
        />
      </div>

      <div>
        <FieldLabel hint="(optionnel)">Ce qu&apos;{pronoun} évite</FieldLabel>
        <TagSelector
          options={[
            "Foule",
            "Bruit",
            "Activités publiques",
            "Surprises",
            "Soirées tardives",
          ]}
          selected={dislikes}
          onChange={setDislikes}
        />
      </div>

      <div>
        <FieldLabel>Budget moyen par sortie</FieldLabel>
        <Slider
          min={30}
          max={300}
          step={10}
          value={budget}
          onChange={setBudget}
          format={(v) => `$${v}`}
        />
      </div>
        </>
      )}
    </FormCard>
  );
}
