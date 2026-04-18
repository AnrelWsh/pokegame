import { useRef, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { GameShell } from '../components/GameShell';

function CryContent() {
  const state = useGameState();
  const { pokemon, guessed, revealed } = state;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(false);

  const cryUrl = pokemon?.cries?.latest || pokemon?.cries?.legacy;

  const playCry = () => {
    if (!audioRef.current || !cryUrl) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setPlaying(true);
    setPlayed(true);
  };

  return (
    <GameShell title="Cri" icon="🔊" state={state}>
      <div className="flex flex-col items-center gap-6">
        <p className="text-gray-500 text-sm text-center">
          Écoutez le cri de ce Pokémon et devinez de qui il s'agit.
        </p>

        {cryUrl ? (
          <>
            <audio
              ref={audioRef}
              src={cryUrl}
              onEnded={() => setPlaying(false)}
              onError={() => setPlaying(false)}
            />

            <button
              onClick={playCry}
              disabled={playing}
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg ${
                playing
                  ? 'bg-yellow-400 scale-95 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-600 hover:scale-105 cursor-pointer'
              }`}
            >
              {playing ? (
                <div className="flex gap-1 items-end h-8">
                  {[3, 5, 4, 6, 3].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-black rounded-full animate-pulse"
                      style={{
                        height: `${h * 4}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <span className="text-4xl">🔊</span>
              )}
            </button>

            {!played && (
              <p className="text-gray-600 text-sm">Cliquez pour écouter</p>
            )}
            {played && !guessed && !revealed && (
              <p className="text-gray-500 text-sm">Vous pouvez réécouter autant que vous voulez</p>
            )}
          </>
        ) : (
          <div className="text-gray-500 text-sm">Cri non disponible pour ce Pokémon</div>
        )}

        {guessed && (
          <p className="text-green-400 font-semibold animate-bounce-in">
            🎉 Vous avez reconnu son cri !
          </p>
        )}
      </div>
    </GameShell>
  );
}

export function CryGame() {
  return <CryContent />;
}
