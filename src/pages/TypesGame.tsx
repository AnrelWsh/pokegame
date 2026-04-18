import { useGameState } from '../hooks/useGameState';
import { GameShell } from '../components/GameShell';
import { TypeBadge } from '../components/TypeBadge';

function TypesContent() {
  const state = useGameState();
  const { pokemon, guessed } = state;

  return (
    <GameShell title="Types" icon="⚡" state={state}>
      <div className="flex flex-col items-center gap-6">
        <p className="text-gray-500 text-sm">
          Devinez le Pokémon grâce à ses types.
        </p>

        {pokemon && (
          <div className="flex gap-3 flex-wrap justify-center">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} typeName={t.type.name} size="lg" />
            ))}
          </div>
        )}

        <p className="text-gray-600 text-xs text-center max-w-xs">
          Indice : beaucoup de Pokémon partagent les mêmes types, mais vous pouvez le trouver !
        </p>

        {guessed && (
          <p className="text-green-400 font-semibold animate-bounce-in">
            🎉 Bien joué !
          </p>
        )}
      </div>
    </GameShell>
  );
}

export function TypesGame() {
  return <TypesContent />;
}
