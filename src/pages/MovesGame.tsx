import { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { GameShell } from '../components/GameShell';
import { fetchMoveDetails, getFrenchMoveName } from '../lib/api';

const MOVES_TO_SHOW = 4;

function MovesContent() {
  const state = useGameState();
  const { pokemon, guessed } = state;
  const [moveNames, setMoveNames] = useState<string[]>([]);
  const [loadingMoves, setLoadingMoves] = useState(false);

  useEffect(() => {
    if (!pokemon) return;
    setMoveNames([]);
    setLoadingMoves(true);

    // Pick moves learned by level-up first, then any moves
    const levelUpMoves = pokemon.moves.filter((m) =>
      m.version_group_details.some((d) => d.move_learn_method.name === 'level-up' && d.level_learned_at > 1)
    );
    const pool = levelUpMoves.length >= MOVES_TO_SHOW ? levelUpMoves : pokemon.moves;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, MOVES_TO_SHOW);

    Promise.all(picked.map((m) => fetchMoveDetails(m.move.name)))
      .then((details) => setMoveNames(details.map(getFrenchMoveName)))
      .finally(() => setLoadingMoves(false));
  }, [pokemon?.id]);

  return (
    <GameShell title="Capacités" icon="💥" state={state}>
      <div className="space-y-4">
        <p className="text-gray-500 text-sm">
          Ce Pokémon peut apprendre ces {MOVES_TO_SHOW} capacités. Lequel est-ce ?
        </p>

        {loadingMoves && (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-gray-700 border-t-yellow-400 rounded-full animate-spin" />
          </div>
        )}

        {!loadingMoves && moveNames.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {moveNames.map((name, i) => (
              <div
                key={i}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-center"
              >
                <span className="text-orange-300 font-semibold">{name}</span>
              </div>
            ))}
          </div>
        )}

        {guessed && (
          <p className="text-green-400 font-semibold animate-bounce-in">
            🎉 Vous connaissez bien ses capacités !
          </p>
        )}
      </div>
    </GameShell>
  );
}

export function MovesGame() {
  return <MovesContent />;
}
