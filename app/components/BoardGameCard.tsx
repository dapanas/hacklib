import StatusBadge from './StatusBadge';
import Nickname from './Nickname';

interface BoardGameCardProps {
  boardGame: {
    id: string;
    title: string;
    min_players: number;
    max_players: number;
    duration_minutes?: number;
    complexity?: string;
    tags?: string[];
    notes?: string;
    owner: string;
  };
  availability: {
    available: boolean;
    borrower?: string;
    until?: string;
    status?: string;
  };
  onRequestLoan?: () => void;
}

export default function BoardGameCard({ boardGame, availability, onRequestLoan }: BoardGameCardProps) {
  // Determine accent color based on availability
  const accentColor = availability.available 
    ? 'bg-success-500' 
    : 'bg-danger-500';
  
  // Determine status text
  const statusText = availability.available ? 'Available' : 'Borrowed';

  // Format player count
  const playerCount = boardGame.min_players === boardGame.max_players 
    ? `${boardGame.min_players}`
    : `${boardGame.min_players}-${boardGame.max_players}`;

  // Format duration
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 h-full flex flex-col group hover:scale-[1.02] shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in overflow-hidden">
      {/* Status Accent Strip - extends to card edge */}
      <div className={`absolute -left-px -top-px -bottom-px w-1 ${accentColor} rounded-l-2xl`}></div>
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-700 transition-colors duration-200 mb-3 leading-tight">
          <a 
            href={`/boardgame/${encodeURIComponent(boardGame.id)}`}
            className="hover:text-primary-700 transition-colors duration-200"
          >
            {boardGame.title}
          </a>
        </h3>
        
        {/* Game Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 text-amber-500">👥</span>
              {playerCount} players
            </span>
            {boardGame.duration_minutes && (
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 text-amber-500">⏱️</span>
                {formatDuration(boardGame.duration_minutes)}
              </span>
            )}
          </div>
          
          {boardGame.complexity && (
            <div className="flex items-center gap-1 text-sm">
              <span className="w-4 h-4 text-amber-500">🧩</span>
              <span className="capitalize text-gray-600">{boardGame.complexity} complexity</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="mt-auto">
        {/* Owner */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
          <Nickname username={boardGame.owner} className="text-sm" />
        </div>
        
        {/* Bottom Row: Status and View Details */}
        <div className="flex items-center justify-between">
          {/* Status Text */}
          <span className={`text-sm font-medium ${availability.available ? 'text-success-600' : 'text-danger-600'}`}>
            {statusText}
          </span>
          
          {/* View Details Link */}
          <a 
            href={`/boardgame/${encodeURIComponent(boardGame.id)}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            View details
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
