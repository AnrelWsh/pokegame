import { useState } from 'react';
import { getFrenchFlavorTexts } from '../lib/utils';
import type { PokemonSpecies } from '../lib/types';

interface PokedexHintProps {
  species: PokemonSpecies;
}

export function PokedexHint({ species }: PokedexHintProps) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);

  const texts = getFrenchFlavorTexts(species);
  if (texts.length === 0) return null;

  return (
    <div className="mt-4 border-t border-gray-800 pt-4">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="text-sm text-blue-400 hover:text-blue-300 underline transition-colors"
        >
          💡 Voir un indice Pokédex
        </button>
      ) : (
        <div className="space-y-2">
          <span className="text-xs text-gray-600 uppercase tracking-widest font-semibold">
            Indice Pokédex
          </span>
          {texts.slice(0, count).map((text, i) => (
            <p key={i} className="text-gray-300 italic text-sm leading-relaxed">
              "{text}"
            </p>
          ))}
          {count < texts.length && (
            <button
              onClick={() => setCount((c) => c + 1)}
              className="text-xs text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              + Autre description ({texts.length - count} restante{texts.length - count > 1 ? 's' : ''})
            </button>
          )}
        </div>
      )}
    </div>
  );
}
