import type { Pokemon, PokemonSpecies, TypeDetails } from './types';

export const TYPE_NAMES_FR: Record<string, string> = {
  normal: 'Normal',
  fire: 'Feu',
  water: 'Eau',
  electric: 'Électrik',
  grass: 'Plante',
  ice: 'Glace',
  fighting: 'Combat',
  poison: 'Poison',
  ground: 'Sol',
  flying: 'Vol',
  psychic: 'Psy',
  bug: 'Insecte',
  rock: 'Roche',
  ghost: 'Spectre',
  dragon: 'Dragon',
  dark: 'Ténèbres',
  steel: 'Acier',
  fairy: 'Fée',
};

export const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export const STAT_NAMES_FR: Record<string, string> = {
  hp: 'PV',
  attack: 'Attaque',
  defense: 'Défense',
  'special-attack': 'Att. Spé.',
  'special-defense': 'Déf. Spé.',
  speed: 'Vitesse',
};

export const STAT_COLORS = (value: number): string => {
  if (value >= 100) return '#22c55e';
  if (value >= 70) return '#84cc16';
  if (value >= 50) return '#eab308';
  if (value >= 30) return '#f97316';
  return '#ef4444';
};

export function getFrenchName(species: PokemonSpecies): string {
  return (
    species.names.find((n) => n.language.name === 'fr')?.name ||
    species.names.find((n) => n.language.name === 'en')?.name ||
    ''
  );
}

export function getFrenchGenus(species: PokemonSpecies): string {
  return (
    species.genera.find((g) => g.language.name === 'fr')?.genus ||
    species.genera.find((g) => g.language.name === 'en')?.genus ||
    ''
  );
}

export function getFrenchFlavorTexts(species: PokemonSpecies): string[] {
  const texts = species.flavor_text_entries
    .filter((e) => e.language.name === 'fr')
    .map((e) => e.flavor_text.replace(/\f|\n/g, ' ').replace(/\s+/g, ' ').trim());
  // Deduplicate
  return [...new Set(texts)];
}

export function calculateWeaknesses(
  typeDetailsArray: TypeDetails[]
): Map<string, number> {
  const multipliers = new Map<string, number>();

  for (const typeData of typeDetailsArray) {
    for (const t of typeData.damage_relations.double_damage_from) {
      multipliers.set(t.name, (multipliers.get(t.name) ?? 1) * 2);
    }
    for (const t of typeData.damage_relations.half_damage_from) {
      multipliers.set(t.name, (multipliers.get(t.name) ?? 1) * 0.5);
    }
    for (const t of typeData.damage_relations.no_damage_from) {
      multipliers.set(t.name, 0);
    }
  }

  return multipliers;
}

export function getOfficialArtwork(pokemon: Pokemon): string {
  return (
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
  );
}

export function normalizeString(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function getGenerationLabel(generationName: string): string {
  const map: Record<string, string> = {
    'generation-i': 'Génération I',
    'generation-ii': 'Génération II',
    'generation-iii': 'Génération III',
    'generation-iv': 'Génération IV',
    'generation-v': 'Génération V',
    'generation-vi': 'Génération VI',
    'generation-vii': 'Génération VII',
    'generation-viii': 'Génération VIII',
    'generation-ix': 'Génération IX',
  };
  return map[generationName] || generationName;
}
