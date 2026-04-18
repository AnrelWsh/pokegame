import type { Pokemon, PokemonListItem, PokemonSpecies, TypeDetails, MoveDetails } from './types';

const BASE = 'https://pokeapi.co/api/v2';
const GRAPHQL = 'https://beta.pokeapi.co/graphql/v1beta';

const pokemonCache = new Map<number, Pokemon>();
const speciesCache = new Map<number, PokemonSpecies>();
const typeCache = new Map<string, TypeDetails>();
const moveCache = new Map<string, MoveDetails>();

let listCache: PokemonListItem[] | null = null;

// Fetch all French names in one GraphQL query
async function fetchAllFrenchNames(): Promise<Map<number, string>> {
  const query = `query {
    pokemon_v2_pokemonspeciesname(where: {language_id: {_eq: 5}}) {
      name
      pokemon_species_id
    }
  }`;

  try {
    const res = await fetch(GRAPHQL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    const map = new Map<number, string>();
    for (const item of data.data.pokemon_v2_pokemonspeciesname) {
      map.set(item.pokemon_species_id, item.name);
    }
    return map;
  } catch {
    return new Map();
  }
}

export async function fetchPokemonList(): Promise<PokemonListItem[]> {
  if (listCache) return listCache;

  const [listRes, frenchNames] = await Promise.all([
    fetch(`${BASE}/pokemon?limit=1025`).then((r) => r.json()),
    fetchAllFrenchNames(),
  ]);

  listCache = (listRes.results as { name: string; url: string }[])
    .map((p, i) => ({
      id: i + 1,
      name: p.name,
      nameFr: frenchNames.get(i + 1) || p.name,
    }))
    .filter((p) => p.id <= 809); // Gen 1-7 (jusqu'à Melmetal)

  return listCache;
}

export async function fetchPokemon(id: number): Promise<Pokemon> {
  if (pokemonCache.has(id)) return pokemonCache.get(id)!;
  const res = await fetch(`${BASE}/pokemon/${id}`);
  const data: Pokemon = await res.json();
  pokemonCache.set(id, data);
  return data;
}

export async function fetchPokemonSpecies(id: number): Promise<PokemonSpecies> {
  if (speciesCache.has(id)) return speciesCache.get(id)!;
  const res = await fetch(`${BASE}/pokemon-species/${id}`);
  const data: PokemonSpecies = await res.json();
  speciesCache.set(id, data);
  return data;
}

export async function fetchTypeDetails(typeName: string): Promise<TypeDetails> {
  if (typeCache.has(typeName)) return typeCache.get(typeName)!;
  const res = await fetch(`${BASE}/type/${typeName}`);
  const data: TypeDetails = await res.json();
  typeCache.set(typeName, data);
  return data;
}

export async function fetchMoveDetails(moveName: string): Promise<MoveDetails> {
  if (moveCache.has(moveName)) return moveCache.get(moveName)!;
  const res = await fetch(`${BASE}/move/${moveName}`);
  const data: MoveDetails = await res.json();
  moveCache.set(moveName, data);
  return data;
}

export function getFrenchMoveName(move: MoveDetails): string {
  return (
    move.names.find((n) => n.language.name === 'fr')?.name ||
    move.names.find((n) => n.language.name === 'en')?.name ||
    move.name
  );
}

export function getRandomFromList(list: PokemonListItem[]): PokemonListItem {
  return list[Math.floor(Math.random() * list.length)];
}
