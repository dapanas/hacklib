import { Users, Calendar, Gamepad2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import Nickname from './Nickname';

interface VideoGameCardProps {
  videoGame: {
    id: string;
    title: string;
    platform: string | string[];
    genre?: string[];
    year?: number;
    players?: string;
    multiplayer?: boolean;
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

export default function VideoGameCard({ videoGame, availability, onRequestLoan }: VideoGameCardProps) {
  // Determine accent color based on availability
  const accentColor = availability.available 
    ? 'bg-success-500' 
    : 'bg-danger-500';
  
  // Determine status text
  const statusText = availability.available ? 'Available' : 'Borrowed';

  // Format platform(s)
  const formatPlatform = (platform: string | string[]) => {
    if (Array.isArray(platform)) {
      return platform.length > 2 ? `${platform[0]}, ${platform[1]}, +${platform.length - 2} more` : platform.join(', ');
    }
    return platform;
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
            href={`/videogame/${encodeURIComponent(videoGame.id)}`}
            className="hover:text-primary-700 transition-colors duration-200"
          >
            {videoGame.title}
          </a>
        </h3>
        
        {/* Game Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Gamepad2 className="w-4 h-4 text-purple-500" />
            <span className="line-clamp-1">{formatPlatform(videoGame.platform)}</span>
          </div>
          
          {videoGame.year && (
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span className="text-gray-600">{videoGame.year}</span>
            </div>
          )}
          
          {videoGame.players && (
            <div className="flex items-center gap-1 text-sm">
              <Users className="w-4 h-4 text-purple-500" />
              <span className="text-gray-600">{videoGame.players} players</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="mt-auto">
        {/* Owner */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
          <Nickname username={videoGame.owner} className="text-sm" />
        </div>
        
        {/* Bottom Row: Status and View Details */}
        <div className="flex items-center justify-between">
          {/* Status Text */}
          <span className={`text-sm font-medium ${availability.available ? 'text-success-600' : 'text-danger-600'}`}>
            {statusText}
          </span>
          
          {/* View Details Link */}
          <a 
            href={`/videogame/${encodeURIComponent(videoGame.id)}`}
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
