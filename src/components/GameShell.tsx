import { Link } from 'react-router-dom';
import { PokemonInput } from './PokemonInput';
import { ResultPanel } from './ResultPanel';
import { WrongGuessList } from './WrongGuessList';
import { PokedexHint } from './PokedexHint';
import type { GameState } from '../hooks/useGameState';

interface GameShellProps {
  title: string;
  icon: string;
  state: GameState;
  children: React.ReactNode;
  hideInput?: boolean;
  hidePokedexHint?: boolean;
}

export function GameShell({ title, icon, state, children, hideInput, hidePokedexHint }: GameShellProps) {
  const { pokemon, species, loading, error, guessed, revealed, wrongGuesses, handleGuess, abandon, nextPokemon } =
    state;

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={nextPokemon} className="btn-primary">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="text-gray-500 hover:text-white text-sm transition-colors">
          ← Accueil
        </Link>
        <span className="text-gray-700">|</span>
        <h1 className="text-xl font-bold">
          {icon} {title}
        </h1>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-yellow-400 rounded-full animate-spin" />
          <p className="text-gray-500">Chargement…</p>
        </div>
      ) : (
        <>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
            {children}
            {!hidePokedexHint && !revealed && species && pokemon && (
              <PokedexHint key={pokemon.id} species={species} />
            )}
          </div>

          {!revealed && !hideInput && (
            <>
              <div className="flex flex-col items-center gap-3">
                <PokemonInput
                  onGuess={(id) => handleGuess(id)}
                  disabled={guessed}
                  excludeIds={wrongGuesses}
                />
                <button
                  onClick={abandon}
                  className="text-gray-600 hover:text-gray-400 text-sm underline transition-colors"
                >
                  Abandonner
                </button>
              </div>
              <WrongGuessList wrongIds={wrongGuesses} />
            </>
          )}

          {revealed && pokemon && species && (
            <div className="mt-6">
              <ResultPanel
                pokemon={pokemon}
                species={species}
                guessed={guessed}
                onNext={nextPokemon}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
