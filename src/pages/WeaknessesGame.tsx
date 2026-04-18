import { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { GameShell } from '../components/GameShell';
import { TypeBadge } from '../components/TypeBadge';
import { fetchTypeDetails } from '../lib/api';
import { calculateWeaknesses } from '../lib/utils';
import type { TypeDetails } from '../lib/types';

function WeaknessesContent() {
  const state = useGameState();
  const { pokemon, guessed } = state;
  const [weaknesses, setWeaknesses] = useState<Map<string, number>>(new Map());
  const [loadingWeaknesses, setLoadingWeaknesses] = useState(false);

  useEffect(() => {
    if (!pokemon) return;
    setWeaknesses(new Map());
    setLoadingWeaknesses(true);

    Promise.all(pokemon.types.map((t) => fetchTypeDetails(t.type.name)))
      .then((details: TypeDetails[]) => {
        setWeaknesses(calculateWeaknesses(details));
      })
      .finally(() => setLoadingWeaknesses(false));
  }, [pokemon?.id]);

  const weakEntries = [...weaknesses.entries()]
    .filter(([, mult]) => mult > 1)
    .sort(([, a], [, b]) => b - a);

  const resistEntries = [...weaknesses.entries()]
    .filter(([, mult]) => mult < 1 && mult > 0)
    .sort(([, a], [, b]) => a - b);

  const immuneEntries = [...weaknesses.entries()].filter(([, mult]) => mult === 0);

  return (
    <GameShell title="Faiblesses" icon="🛡️" state={state}>
      <div className="space-y-5">
        <p className="text-gray-500 text-sm">
          Devinez le Pokémon grâce à ses faiblesses et résistances.
        </p>

        {loadingWeaknesses && (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-gray-700 border-t-yellow-400 rounded-full animate-spin" />
          </div>
        )}

        {!loadingWeaknesses && weakEntries.length > 0 && (
          <div>
            <h3 className="text-red-400 font-semibold text-sm mb-2">
              Faible contre
            </h3>
            <div className="flex flex-wrap gap-2">
              {weakEntries.map(([type, mult]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <TypeBadge typeName={type} />
                  {mult === 4 && (
                    <span className="text-red-400 text-xs font-bold">×4</span>
                  )}
                  {mult === 2 && (
                    <span className="text-red-400 text-xs">×2</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!loadingWeaknesses && resistEntries.length > 0 && (
          <div>
            <h3 className="text-green-400 font-semibold text-sm mb-2">
              Résiste à
            </h3>
            <div className="flex flex-wrap gap-2">
              {resistEntries.map(([type, mult]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <TypeBadge typeName={type} />
                  <span className="text-green-400 text-xs">
                    {mult === 0.25 ? '×¼' : '×½'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loadingWeaknesses && immuneEntries.length > 0 && (
          <div>
            <h3 className="text-gray-400 font-semibold text-sm mb-2">
              Immunisé contre
            </h3>
            <div className="flex flex-wrap gap-2">
              {immuneEntries.map(([type]) => (
                <TypeBadge key={type} typeName={type} />
              ))}
            </div>
          </div>
        )}

        {guessed && (
          <p className="text-green-400 font-semibold animate-bounce-in">
            🎉 Bravo, c'est bien lui !
          </p>
        )}
      </div>
    </GameShell>
  );
}

export function WeaknessesGame() {
  return <WeaknessesContent />;
}
