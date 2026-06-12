"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type CasualDatingProfile } from "@/lib/profile";
import { persistProfile } from "./persistProfile";
import {
  FieldLabel,
  TagSelector,
  SingleSelect,
  Slider,
  FormCard,
} from "./Fields";

const DURATIONS = [
  "Moins d'une semaine",
  "1-2 semaines",
  "Quelques semaines",
  "1 mois et plus",
];

const COMFORT_LEVELS = [
  "Pas encore à l'aise",
  "Plutôt à l'aise",
  "Très à l'aise",
];

const GOALS = [
  "Faire connaissance",
  "Voir si ça clique",
  "Créer un moment fun",
  "Aller plus loin doucement",
];

const KNOWN_INTERESTS = [
  "Vin & Gastronomie",
  "Plein air & Nature",
  "Art & Culture",
  "Sport",
  "Cinéma",
  "Musique",
  "Cuisine",
  "Cocktails",
  "Jeux & Soirées casual",
];

const AVOID = [
  "Activités trop intimes",
  "Soirées tardives",
  "Endroits bondés",
  "Resto trop chic",
  "Surprises publiques",
];

export function CasualForm() {
  const router = useRouter();
  const [conversationDuration, setConversationDuration] = useState("");
  const [datesCompleted, setDatesCompleted] = useState(1);
  const [comfortLevel, setComfortLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [knownInterests, setKnownInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState(60);
  const [avoidActivities, setAvoidActivities] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const profile: CasualDatingProfile = {
      type: "casual_dating",
      conversationDuration: conversationDuration || undefined,
      datesCompleted,
      comfortLevel: comfortLevel || undefined,
      goal: goal || undefined,
      knownInterests,
      budget,
      avoidActivities: avoidActivities.length ? avoidActivities : undefined,
    };
    await persistProfile(profile);
    router.push("/dates");
  };

  return (
    <FormCard
      title="Parle-moi de"
      scriptWord="ta nouvelle rencontre"
      description="Eve évite les ambiances trop intenses ou intimes si vous vous découvrez encore."
      onSubmit={handleSubmit}
    >
      <div>
        <FieldLabel>Depuis combien de temps vous vous parlez</FieldLabel>
        <SingleSelect
          options={DURATIONS}
          value={conversationDuration}
          onChange={setConversationDuration}
        />
      </div>

      <div>
        <FieldLabel>Combien de dates vous avez déjà faits</FieldLabel>
        <Slider
          min={0}
          max={10}
          step={1}
          value={datesCompleted}
          onChange={setDatesCompleted}
          format={(v) => (v >= 10 ? "10+" : String(v))}
        />
      </div>

      <div>
        <FieldLabel>Niveau de confort actuel</FieldLabel>
        <SingleSelect
          options={COMFORT_LEVELS}
          value={comfortLevel}
          onChange={setComfortLevel}
        />
      </div>

      <div>
        <FieldLabel>Objectif de la sortie</FieldLabel>
        <SingleSelect options={GOALS} value={goal} onChange={setGoal} />
      </div>

      <div>
        <FieldLabel hint="(ce que tu sais d'iel)">Passions ou intérêts connus</FieldLabel>
        <TagSelector
          options={KNOWN_INTERESTS}
          selected={knownInterests}
          onChange={setKnownInterests}
        />
      </div>

      <div>
        <FieldLabel>Budget moyen par sortie</FieldLabel>
        <Slider
          min={20}
          max={200}
          step={10}
          value={budget}
          onChange={setBudget}
          format={(v) => `$${v}`}
        />
      </div>

      <div>
        <FieldLabel hint="(optionnel)">Activités à éviter</FieldLabel>
        <TagSelector
          options={AVOID}
          selected={avoidActivities}
          onChange={setAvoidActivities}
        />
      </div>
    </FormCard>
  );
}
