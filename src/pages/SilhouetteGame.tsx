import { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { GameShell } from '../components/GameShell';
import { getOfficialArtwork } from '../lib/utils';

const ZOOM_STEPS = [3.5, 2.8, 2.2, 1.7, 1.3, 1.0];

function SilhouetteContent() {
  const state = useGameState();
  const { pokemon, revealed, guessed } = state;
  const [zoomIndex, setZoomIndex] = useState(0);

  useEffect(() => {
    if (pokemon) setZoomIndex(0);
  }, [pokemon?.id]);

  const scale = ZOOM_STEPS[zoomIndex];
  const artwork = pokemon ? getOfficialArtwork(pokemon) : '';
  const isFullyZoomed = zoomIndex >= ZOOM_STEPS.length - 1;

  return (
    <GameShell title="Silhouette" icon="🌑" state={state}>
      <div className="flex flex-col items-center gap-4">
        <div className="overflow-hidden rounded-xl bg-white w-56 h-56 flex items-center justify-center shadow-lg">
          {pokemon && (
            <img
              src={artwork}
              alt="???"
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: revealed ? 'none' : 'brightness(0)',
              }}
              className="w-40 h-40 object-contain"
            />
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {ZOOM_STEPS.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i <= zoomIndex ? 'bg-yellow-400' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        {!revealed && !isFullyZoomed && (
          <button
            onClick={() => setZoomIndex((i) => Math.min(i + 1, ZOOM_STEPS.length - 1))}
            className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            🔍 Dézoomer
          </button>
        )}

        {!revealed && isFullyZoomed && (
          <p className="text-gray-600 text-sm">Zoom maximum atteint</p>
        )}

        {guessed && (
          <p className="text-green-400 font-semibold text-lg animate-bounce-in">
            🎉 Excellent !
          </p>
        )}
      </div>
    </GameShell>
  );
}

export function SilhouetteGame() {
  return <SilhouetteContent />;
}
