import { Link } from 'react-router-dom';

const GAMES = [
  {
    path: '/silhouette',
    icon: '🌑',
    title: 'Silhouette',
    description: 'Devinez le Pokémon grâce à son ombre. Il dézoome progressivement… soyez rapide !',
    color: 'from-gray-800 to-gray-900',
    border: 'hover:border-gray-500',
  },
  {
    path: '/pokedex',
    icon: '📖',
    title: 'Description Pokédex',
    description: "Un extrait du Pokédex vous est révélé. Saurez-vous identifier le Pokémon ?",
    color: 'from-red-950 to-gray-900',
    border: 'hover:border-red-700',
  },
  {
    path: '/types',
    icon: '⚡',
    title: 'Types',
    description: 'Seuls les types du Pokémon vous sont donnés. À vous de deviner !',
    color: 'from-yellow-950 to-gray-900',
    border: 'hover:border-yellow-600',
  },
  {
    path: '/faiblesses',
    icon: '🛡️',
    title: 'Faiblesses',
    description: "Quels types lui font doublement mal ? Trouvez le Pokémon grâce à ses faiblesses.",
    color: 'from-blue-950 to-gray-900',
    border: 'hover:border-blue-600',
  },
  {
    path: '/cri',
    icon: '🔊',
    title: 'Cri',
    description: 'Écoutez le cri du Pokémon et devinez qui se cache derrière ce son !',
    color: 'from-purple-950 to-gray-900',
    border: 'hover:border-purple-600',
  },
  {
    path: '/stats',
    icon: '📊',
    title: 'Statistiques',
    description: 'PV, Attaque, Défense… les stats de base sont affichées. Qui possède ce profil ?',
    color: 'from-green-950 to-gray-900',
    border: 'hover:border-green-600',
  },
  {
    path: '/capacites',
    icon: '💥',
    title: 'Capacités',
    description: "4 capacités que ce Pokémon peut apprendre vous sont révélées. À vous de jouer !",
    color: 'from-orange-950 to-gray-900',
    border: 'hover:border-orange-600',
  },
];

export function Home() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-3">
          <span className="text-yellow-400">Poké</span>Game
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          7 mini-jeux pour tester vos connaissances Pokémon. Parties illimitées !
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GAMES.map((game) => (
          <Link
            key={game.path}
            to={game.path}
            className={`group relative bg-gradient-to-br ${game.color} border border-gray-800 ${game.border} rounded-2xl p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40 block`}
          >
            <div className="text-4xl mb-3">{game.icon}</div>
            <h2 className="text-lg font-bold text-white mb-2">{game.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{game.description}</p>
            <div className="mt-4 text-yellow-400 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">
              Jouer →
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12 text-gray-700 text-sm">
        <p>Tous les Pokémon des générations I à IX · Noms en français</p>
      </div>
    </div>
  );
}
