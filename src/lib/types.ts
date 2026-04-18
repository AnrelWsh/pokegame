export interface PokemonListItem {
  id: number;
  name: string;
  nameFr: string;
}

export interface PokemonSprite {
  front_default: string | null;
  other: {
    'official-artwork': {
      front_default: string | null;
    };
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: { name: string };
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprite;
  types: PokemonType[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  cries: {
    latest: string | null;
    legacy: string | null;
  };
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonSpecies {
  id: number;
  names: { language: { name: string }; name: string }[];
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }[];
  genera: { genus: string; language: { name: string } }[];
  color: { name: string };
  generation: { name: string };
}

export interface TypeDamageRelations {
  double_damage_from: { name: string; url: string }[];
  half_damage_from: { name: string; url: string }[];
  no_damage_from: { name: string; url: string }[];
}

export interface TypeDetails {
  name: string;
  damage_relations: TypeDamageRelations;
}

export interface MoveDetails {
  name: string;
  names: { language: { name: string }; name: string }[];
}
