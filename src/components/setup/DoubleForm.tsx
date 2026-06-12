"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  type DoubleDateProfile,
  type City,
} from "@/lib/profile";
import { persistProfile } from "./persistProfile";
import {
  FieldLabel,
  TagSelector,
  SingleSelect,
  Slider,
  FormCard,
} from "./Fields";

const RELATIONSHIPS = [
  "Amis longue date",
  "Nouveau couple ami",
  "Couples qui se connaissent peu",
  "Mix amis & couples",
];

const CITIES: City[] = ["Montréal", "Laval", "Brossard", "Magog", "Autre"];

const VIBES = [
  "Décontracté",
  "Fun & festif",
  "Chic & raffiné",
  "Cozy & intime",
  "Aventureux",
];

const ACTIVITIES = [
  "Resto à partager",
  "Cocktail bar",
  "Jeux & bowling",
  "Brunch tardif",
  "Sortie plein air",
  "Spectacle / comédie",
  "Visite culturelle",
  "Soirée à domicile",
];

const AVOID = [
  "Activités gênantes",
  "Trop d'attente",
  "Endroits bruyants",
  "Activités intimes",
  "Trop sportif",
];

export function DoubleForm() {
  const router = useRouter();
  const [numberOfPeople, setNumberOfPeople] = useState(4);
  const [relationshipTypes, setRelationshipTypes] = useState("");
  const [budgetPerPerson, setBudgetPerPerson] = useState(70);
  const [city, setCity] = useState<City>("Montréal");
  const [maxDistance, setMaxDistance] = useState(30);
  const [vibe, setVibe] = useState("");
  const [energyLevel, setEnergyLevel] = useState(3);
  const [preferredActivities, setPreferredActivities] = useState<string[]>([]);
  const [avoidActivities, setAvoidActivities] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const profile: DoubleDateProfile = {
      type: "double_date",
      numberOfPeople,
      relationshipTypes: relationshipTypes || undefined,
      budgetPerPerson,
      city,
      maxDistance,
      vibe: vibe || undefined,
      energyLevel: ["Très calme", "Calme", "Équilibré", "Énergique", "Très énergique"][
        energyLevel - 1
      ],
      preferredActivities,
      avoidActivities: avoidActivities.length ? avoidActivities : undefined,
    };
    await persistProfile(profile);
    router.push("/dates");
  };

  return (
    <FormCard
      title="Parle-moi de"
      scriptWord="votre quatuor"
      description="Eve favorise des activités où on peut parler, rire et éviter les malaises."
      onSubmit={handleSubmit}
    >
      <div>
        <FieldLabel>Nombre de personnes</FieldLabel>
        <Slider
          min={4}
          max={6}
          step={1}
          value={numberOfPeople}
          onChange={setNumberOfPeople}
          format={(v) => `${v}`}
        />
      </div>

      <div>
        <FieldLabel>Type de relation entre les personnes</FieldLabel>
        <SingleSelect
          options={RELATIONSHIPS}
          value={relationshipTypes}
          onChange={setRelationshipTypes}
        />
      </div>

      <div>
        <FieldLabel>Budget par personne</FieldLabel>
        <Slider
          min={20}
          max={250}
          step={10}
          value={budgetPerPerson}
          onChange={setBudgetPerPerson}
          format={(v) => `$${v}`}
        />
      </div>

      <div>
        <FieldLabel>Ville ou zone</FieldLabel>
        <SingleSelect options={CITIES} value={city} onChange={(v) => setCity(v as City)} />
      </div>

      <div>
        <FieldLabel>Distance maximale</FieldLabel>
        <Slider
          min={5}
          max={100}
          step={5}
          value={maxDistance}
          onChange={setMaxDistance}
          format={(v) => `${v} km`}
        />
      </div>

      <div>
        <FieldLabel>Ambiance recherchée</FieldLabel>
        <SingleSelect options={VIBES} value={vibe} onChange={setVibe} />
      </div>

      <div>
        <FieldLabel>Niveau d&apos;énergie</FieldLabel>
        <Slider
          min={1}
          max={5}
          step={1}
          value={energyLevel}
          onChange={setEnergyLevel}
          format={(v) =>
            ["Très calme", "Calme", "Équilibré", "Énergique", "Très énergique"][v - 1]
          }
        />
      </div>

      <div>
        <FieldLabel hint="(plusieurs choix)">Activités préférées</FieldLabel>
        <TagSelector
          options={ACTIVITIES}
          selected={preferredActivities}
          onChange={setPreferredActivities}
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
