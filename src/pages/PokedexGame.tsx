import { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { GameShell } from '../components/GameShell';
import { getFrenchFlavorTexts, getFrenchGenus } from '../lib/utils';

function PokedexContent() {
  const state = useGameState();
  const { species, guessed, revealed } = state;
  const [revealedCount, setRevealedCount] = useState(1);

  useEffect(() => {
    if (species) setRevealedCount(1);
  }, [species?.id]);

  const allTexts = species ? getFrenchFlavorTexts(species) : [];
  const visibleTexts = allTexts.slice(0, revealedCount);
  const genus = species ? getFrenchGenus(species) : '';
  const canRevealMore = revealedCount < allTexts.length && !revealed;

  return (
    <GameShell title="Description Pokédex" icon="📖" state={state} hidePokedexHint>
      <div className="space-y-3">
        <p className="text-gray-500 text-sm mb-4">
          Devinez le Pokémon grâce à ses descriptions du Pokédex.
        </p>

        {genus && (
          <div className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-300 mb-3">
            {genus}
          </div>
        )}

        <div className="space-y-3">
          {visibleTexts.map((text, i) => (
            <div
              key={i}
              className={`bg-gray-800 rounded-xl p-4 border-l-4 border-red-600 animate-fade-in`}
            >
              <p className="text-gray-200 leading-relaxed italic">"{text}"</p>
            </div>
          ))}
        </div>

        {!revealed && canRevealMore && !guessed && (
          <button
            onClick={() => setRevealedCount((c) => c + 1)}
            className="mt-3 text-sm text-blue-400 hover:text-blue-300 underline transition-colors"
          >
            + Voir une autre description ({allTexts.length - revealedCount} restante
            {allTexts.length - revealedCount > 1 ? 's' : ''})
          </button>
        )}

        {!revealed && !canRevealMore && !guessed && allTexts.length > 0 && (
          <p className="text-gray-600 text-sm mt-2">
            Toutes les descriptions révélées.
          </p>
        )}

        {guessed && (
          <p className="text-green-400 font-semibold mt-4 animate-bounce-in">
            🎉 Bravo, vous avez trouvé !
          </p>
        )}
      </div>
    </GameShell>
  );
}

export function PokedexGame() {
  return <PokedexContent />;
}
