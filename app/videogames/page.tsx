import { getAllVideoGames } from "@/lib/data";
import { getAvailability } from "@/lib/availability";
import VideoGameCard from "@/components/VideoGameCard";

export const revalidate = 60;

export default async function VideoGamesPage() {
  const videoGames = await getAllVideoGames();
  
  // Get availability for each video game
  const videoGamesWithAvailability = await Promise.all(
    videoGames.map(async (videoGame) => ({
      ...videoGame,
      availability: await getAvailability(videoGame.id)
    }))
  );

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Video Games 🎮</h1>
          <p className="text-gray-600">
            Discover video games available for loan from our community library.
          </p>
        </div>
        
        {/* Video Games Grid */}
        {videoGamesWithAvailability.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoGamesWithAvailability.map((videoGame) => (
              <div key={videoGame.id} className="h-full">
                <VideoGameCard 
                  videoGame={videoGame}
                  availability={videoGame.availability}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="glass-card p-12 max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎮</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No video games yet</h3>
              <p className="text-gray-600 mb-6">
                No video games have been added to the library yet. Check back later!
              </p>
              <a 
                href="/" 
                className="btn-primary"
              >
                Back to Home
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
