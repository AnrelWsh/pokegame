import { Link, useLocation } from 'react-router-dom';

const GAMES = [
  { path: '/silhouette', label: 'Silhouette', icon: '🌑' },
  { path: '/pokedex', label: 'Pokédex', icon: '📖' },
  { path: '/types', label: 'Types', icon: '⚡' },
  { path: '/faiblesses', label: 'Faiblesses', icon: '🛡️' },
  { path: '/cri', label: 'Cri', icon: '🔊' },
  { path: '/stats', label: 'Stats', icon: '📊' },
  { path: '/capacites', label: 'Capacités', icon: '💥' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-xl shrink-0">
            <span className="text-2xl">⚡</span>
            <span className="text-yellow-400">Poké</span>
            <span className="text-white">Game</span>
          </Link>

          <nav className="flex items-center gap-1 flex-wrap">
            {GAMES.map((g) => (
              <Link
                key={g.path}
                to={g.path}
                title={g.label}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === g.path
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span>{g.icon}</span>
                <span className="hidden sm:inline">{g.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">{children}</main>

      <footer className="text-center text-gray-700 text-xs py-4 border-t border-gray-900">
        Données : <a href="https://pokeapi.co" className="hover:text-gray-500 underline" target="_blank" rel="noopener noreferrer">PokéAPI</a>
        {' · '}
        Pokémon © Nintendo / Game Freak
      </footer>
    </div>
  );
}
