import Link from 'next/link';
import StatusBadge from './StatusBadge';

export default function GameCard({ game }) {
  if (!game) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Game Image */}
      <div className="relative w-full h-48 bg-gray-300 flex items-center justify-center">
        <div className="absolute top-2 right-2">
          <StatusBadge status={game.status} />
        </div>
        <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <span className="text-white text-4xl opacity-20">
            {game.title.charAt(0)}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">
          {game.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {game.description}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
            {game.genre}
          </span>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-semibold text-gray-800">
              {game.rating}
            </span>
          </div>
        </div>

        <Link
          href={`/games/${game.slug}`}
          className="w-full block text-center bg-primary text-white py-2 rounded font-semibold hover:bg-secondary transition-colors"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}
