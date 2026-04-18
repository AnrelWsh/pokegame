import { useState, useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { GameShell } from '../components/GameShell';
import { getOfficialArtwork } from '../lib/utils';

const ZOOM_STEPS = [3.5, 2.8, 2.2, 1.7, 1.3, 1.0];
const ZOOM_INTERVAL_MS = 4000;

function SilhouetteContent() {
  const state = useGameState();
  const { pokemon, revealed, guessed } = state;
  const [zoomIndex, setZoomIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ZOOM_INTERVAL_MS / 1000);

  // Reset zoom when pokemon changes
  useEffect(() => {
    if (!pokemon) return;
    setZoomIndex(0);
    setTimeLeft(ZOOM_INTERVAL_MS / 1000);
  }, [pokemon?.id]);

  // Auto zoom-out
  useEffect(() => {
    if (revealed || !pokemon) return;
    if (zoomIndex >= ZOOM_STEPS.length - 1) return;

    setTimeLeft(ZOOM_INTERVAL_MS / 1000);
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) return ZOOM_INTERVAL_MS / 1000;
        return t - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      setZoomIndex((i) => Math.min(i + 1, ZOOM_STEPS.length - 1));
    }, ZOOM_INTERVAL_MS);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [zoomIndex, revealed, pokemon?.id]);

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

        <div className="flex items-center gap-3 text-sm text-gray-500">
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
          {!isFullyZoomed && !revealed && (
            <span>Prochain indice dans {timeLeft}s</span>
          )}
          {isFullyZoomed && !revealed && (
            <span className="text-gray-600">Silhouette complète</span>
          )}
        </div>

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
