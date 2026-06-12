"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type FriendsProfile, type City } from "@/lib/profile";
import { persistProfile } from "./persistProfile";
import {
  FieldLabel,
  TextInput,
  TagSelector,
  SingleSelect,
  Slider,
  FormCard,
} from "./Fields";

const CITIES: City[] = ["Montréal", "Laval", "Brossard", "Magog", "Autre"];

const TIMES = [
  "Matin",
  "Après-midi",
  "Soirée",
  "Nuit",
  "Journée complète",
];

const VIBES = [
  "Chill",
  "Festif",
  "Aventure",
  "Cozy",
  "Sportif",
  "Culturel",
  "Gastronomique",
];

const SETTING = ["Intérieur", "Extérieur", "Les deux"];

const ACTIVITIES = [
  "Brunch",
  "Resto",
  "Bar / Cocktails",
  "Jeux / Bowling / Karting",
  "Plein air / Randonnée",
  "Spectacle",
  "Soirée à domicile",
  "Roadtrip",
  "Sport / Activité physique",
  "Soirée jeux de société",
];

const AVOID = [
  "Trop sportif",
  "Trop loin",
  "Trop cher",
  "Soirée tardive",
  "Endroits trop bruyants",
  "Activités intellos",
];

export function FriendsForm() {
  const router = useRouter();
  const [numberOfPeople, setNumberOfPeople] = useState(5);
  const [occasion, setOccasion] = useState("");
  const [budgetPerPerson, setBudgetPerPerson] = useState(50);
  const [city, setCity] = useState<City>("Montréal");
  const [maxDistance, setMaxDistance] = useState(30);
  const [time, setTime] = useState("");
  const [vibe, setVibe] = useState("");
  const [energyLevel, setEnergyLevel] = useState(3);
  const [indoorOrOutdoor, setIndoorOrOutdoor] = useState("");
  const [preferredActivities, setPreferredActivities] = useState<string[]>([]);
  const [avoidActivities, setAvoidActivities] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const profile: FriendsProfile = {
      type: "friends",
      numberOfPeople,
      occasion: occasion || undefined,
      budgetPerPerson,
      city,
      maxDistance,
      time: time || undefined,
      vibe: vibe || undefined,
      energyLevel: ["Très calme", "Calme", "Équilibré", "Énergique", "Très énergique"][
        energyLevel - 1
      ],
      indoorOrOutdoor: indoorOrOutdoor || undefined,
      preferredActivities,
      avoidActivities: avoidActivities.length ? avoidActivities : undefined,
    };
    await persistProfile(profile);
    router.push("/dates");
  };

  return (
    <FormCard
      title="Parle-moi de"
      scriptWord="ton groupe"
      description="Eve adapte les recommandations à la taille du groupe, au budget commun et au type de vibe que tu cherches."
      onSubmit={handleSubmit}
    >
      <div>
        <FieldLabel>Nombre de personnes</FieldLabel>
        <Slider
          min={3}
          max={15}
          step={1}
          value={numberOfPeople}
          onChange={setNumberOfPeople}
          format={(v) => `${v}`}
        />
      </div>

      <div>
        <FieldLabel hint="(optionnel)">Occasion</FieldLabel>
        <TextInput
          value={occasion}
          onChange={setOccasion}
          placeholder="Anniversaire, retrouvailles, juste pour le fun..."
        />
      </div>

      <div>
        <FieldLabel>Budget par personne</FieldLabel>
        <Slider
          min={20}
          max={200}
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
        <FieldLabel>Moment de la sortie</FieldLabel>
        <SingleSelect options={TIMES} value={time} onChange={setTime} />
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
        <FieldLabel>Intérieur ou extérieur</FieldLabel>
        <SingleSelect
          options={SETTING}
          value={indoorOrOutdoor}
          onChange={setIndoorOrOutdoor}
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
