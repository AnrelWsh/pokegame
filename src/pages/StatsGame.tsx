import { useGameState } from '../hooks/useGameState';
import { GameShell } from '../components/GameShell';
import { STAT_NAMES_FR, STAT_COLORS } from '../lib/utils';

function StatBar({ name, value }: { name: string; value: number }) {
  const pct = Math.min((value / 255) * 100, 100);
  const color = STAT_COLORS(value);

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400 text-sm w-20 text-right shrink-0">{name}</span>
      <div className="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-white text-sm font-mono w-8 shrink-0">{value}</span>
    </div>
  );
}

function StatsContent() {
  const state = useGameState();
  const { pokemon, guessed } = state;

  return (
    <GameShell title="Statistiques" icon="📊" state={state}>
      <div className="space-y-4">
        <p className="text-gray-500 text-sm mb-4">
          Devinez le Pokémon grâce à ses statistiques de base.
        </p>

        {pokemon && (
          <>
            <div className="space-y-3">
              {pokemon.stats.map((s) => (
                <StatBar
                  key={s.stat.name}
                  name={STAT_NAMES_FR[s.stat.name] || s.stat.name}
                  value={s.base_stat}
                />
              ))}
            </div>

            <div className="flex justify-between pt-3 border-t border-gray-700 text-sm">
              <span className="text-gray-500">Total</span>
              <span className="text-white font-bold">
                {pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0)}
              </span>
            </div>
          </>
        )}

        {guessed && (
          <p className="text-green-400 font-semibold animate-bounce-in mt-2">
            🎉 Vous l'avez identifié !
          </p>
        )}
      </div>
    </GameShell>
  );
}

export function StatsGame() {
  return <StatsContent />;
}
