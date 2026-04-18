import { getOfficialArtwork, getFrenchName, getGenerationLabel } from '../lib/utils';
import { TypeBadge } from './TypeBadge';
import type { Pokemon, PokemonSpecies } from '../lib/types';

interface ResultPanelProps {
  pokemon: Pokemon;
  species: PokemonSpecies;
  guessed: boolean;
  onNext: () => void;
}

export function ResultPanel({ pokemon, species, guessed, onNext }: ResultPanelProps) {
  const frenchName = getFrenchName(species);
  const artwork = getOfficialArtwork(pokemon);

  return (
    <div className="animate-bounce-in bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center max-w-sm mx-auto">
      {guessed ? (
        <div className="text-2xl font-bold text-green-400 mb-3">🎉 Bravo !</div>
      ) : (
        <div className="text-lg font-semibold text-gray-400 mb-3">C'était…</div>
      )}

      <img
        src={artwork}
        alt={frenchName}
        className="w-40 h-40 object-contain mx-auto"
      />

      <h2 className="text-2xl font-bold text-white mt-2">{frenchName}</h2>
      <p className="text-gray-400 text-sm mb-3">#{String(pokemon.id).padStart(4, '0')}</p>

      <div className="flex justify-center gap-2 mb-4">
        {pokemon.types.map((t) => (
          <TypeBadge key={t.type.name} typeName={t.type.name} />
        ))}
      </div>

      <p className="text-gray-500 text-xs mb-4">{getGenerationLabel(species.generation.name)}</p>

      <button
        onClick={onNext}
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-6 rounded-xl transition-colors"
      >
        Pokémon suivant →
      </button>
    </div>
  );
}
