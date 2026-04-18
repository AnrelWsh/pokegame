import { useEffect, useState } from 'react';
import { fetchPokemonList } from '../lib/api';
import type { PokemonListItem } from '../lib/types';

interface WrongGuessListProps {
  wrongIds: number[];
}

export function WrongGuessList({ wrongIds }: WrongGuessListProps) {
  const [list, setList] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    fetchPokemonList().then(setList);
  }, []);

  if (wrongIds.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {wrongIds.map((id) => {
        const item = list.find((p) => p.id === id);
        return (
          <div
            key={id}
            className="flex items-center gap-1.5 bg-gray-800 border border-red-900 rounded-lg px-2 py-1 text-sm text-red-400"
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt=""
              className="w-6 h-6 object-contain"
            />
            <span>{item?.nameFr || item?.name || `#${id}`}</span>
            <span>✗</span>
          </div>
        );
      })}
    </div>
  );
}
