"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type CoupleProfile } from "@/lib/profile";
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
  "Début de fréquentation",
  "Couple récent",
  "Relation longue",
  "Mariés / vie commune",
];

const OCCASIONS = [
  "Aucune occasion particulière",
  "Anniversaire de couple",
  "Anniversaire (personne)",
  "Saint-Valentin",
  "Surprise spontanée",
  "Reconnecter après période chargée",
];

const VIBES = ["Cozy", "Chic", "Romantique", "Fun", "Intime", "Premium"];

export function CoupleForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [temperament, setTemperament] = useState("");
  const [budget, setBudget] = useState(80);
  const [stage, setStage] = useState("");
  const [occasion, setOccasion] = useState("");
  const [vibe, setVibe] = useState("");
  const [likes, setLikes] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const profile: CoupleProfile = {
      type: "couple",
      name,
      nickname: nickname || undefined,
      interests,
      temperament: temperament || undefined,
      budget,
      relationshipStage: stage || undefined,
      occasion: occasion || undefined,
      vibe: vibe || undefined,
      likes: likes.length ? likes : undefined,
      dislikes: dislikes.length ? dislikes : undefined,
    };
    await persistProfile(profile);
    router.push("/dates");
  };

  return (
    <FormCard
      title="Parle-moi de"
      scriptWord="ta moitié"
      description="Eve va t'aider à créer des sorties vraiment adaptées à votre couple."
      onSubmit={handleSubmit}
    >
      <div>
        <FieldLabel>Son prénom *</FieldLabel>
        <TextInput value={name} onChange={setName} required placeholder="Marie, Alex, Sam..." />
      </div>

      <div>
        <FieldLabel>Surnom (optionnel)</FieldLabel>
        <TextInput value={nickname} onChange={setNickname} placeholder="Chouchou, Bébé d'amour..." />
      </div>

      <div>
        <FieldLabel hint="(plusieurs choix)">Ses passions</FieldLabel>
        <TagSelector options={INTERESTS} selected={interests} onChange={setInterests} />
      </div>

      <div>
        <FieldLabel>Son tempérament en couple</FieldLabel>
        <SingleSelect options={TEMPERAMENTS} value={temperament} onChange={setTemperament} />
      </div>

      <div>
        <FieldLabel>Stade de votre relation</FieldLabel>
        <SingleSelect options={STAGES} value={stage} onChange={setStage} />
      </div>

      <div>
        <FieldLabel>Occasion spéciale</FieldLabel>
        <SingleSelect options={OCCASIONS} value={occasion} onChange={setOccasion} />
      </div>

      <div>
        <FieldLabel>Ambiance recherchée</FieldLabel>
        <SingleSelect options={VIBES} value={vibe} onChange={setVibe} />
      </div>

      <div>
        <FieldLabel hint="(optionnel)">Ce qu&apos;iel adore</FieldLabel>
        <TagSelector
          options={["Restos cachés", "Surprises", "Plein air", "Cocktails", "Films cultes", "Shopping"]}
          selected={likes}
          onChange={setLikes}
        />
      </div>

      <div>
        <FieldLabel hint="(optionnel)">Ce qu&apos;iel évite</FieldLabel>
        <TagSelector
          options={["Foule", "Bruit", "Activités publiques", "Surprises", "Soirées tardives"]}
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
    </FormCard>
  );
}
