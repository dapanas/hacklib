import { getVideoGameById } from "@/lib/data";
import { getAvailability } from "@/lib/availability";
import { buildCreateLoanURL } from "@/lib/github";
import { getCurrentUsername } from "@/lib/auth";
import StatusBadge from "@/components/StatusBadge";
import Nickname from "@/components/Nickname";

export const revalidate = 60;

export default async function VideoGamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let videoGame;
  let availability: { available: boolean; borrower?: string; until?: string; status?: string } = { available: true };
  let error = null;
  
  try {
    videoGame = await getVideoGameById(decodeURIComponent(id));
    availability = await getAvailability(videoGame.id);
  } catch (err) {
    console.error('Error loading video game:', err);
    error = err instanceof Error ? err.message : 'Failed to load video game';
  }
  
  const currentUsername = await getCurrentUsername();

  // Prepare loan request data
  const org = process.env.NEXT_PUBLIC_GH_ORG!;
  const repo = process.env.NEXT_PUBLIC_GH_REPO!;
  const branch = process.env.NEXT_PUBLIC_GH_PR_BRANCH || 'main';
  const borrower = currentUsername || process.env.NEXT_PUBLIC_DEFAULT_BORROWER || "your-github";
  const requestedAt = new Date().toISOString().slice(0, 10);
  const until = new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString().slice(0, 10); // +21d
  const year = requestedAt.slice(0, 4);
  
  // Only build loan URL if video game was loaded successfully
  let createUrl = '';
  if (videoGame) {
    createUrl = buildCreateLoanURL({
      org, 
      repo,
      branch,
      year,
      owner: videoGame.owner,
      bookId: videoGame.id,
      borrower,
      requestedAt,
      until,
      itemType: 'videogame'
    });
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="glass-card p-12 max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-danger-100 to-danger-200 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-danger-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Video game not found</h3>
              <p className="text-gray-600 mb-6">
                {error}. The video game may not exist or there might be a configuration issue.
              </p>
              <a 
                href="/videogames" 
                className="btn-primary"
              >
                Back to Video Games
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Format platform(s)
  const formatPlatform = (platform: string | string[]) => {
    if (Array.isArray(platform)) {
      return platform.join(', ');
    }
    return platform;
  };

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <a 
            href="/videogames" 
            className="link-primary text-sm font-medium mb-6 inline-flex items-center gap-2 hover:gap-3 transition-all duration-200"
          >
            <span>←</span>
            Back to Video Games
          </a>
        </div>
        
        {/* Video Game Header */}
        <div className="glass-card p-8 mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {videoGame.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                  Owner: <Nickname username={videoGame.owner} />
                </span>
              </div>
            </div>
            <div className="lg:flex-shrink-0">
              <StatusBadge 
                status={availability.available ? 'available' : 'borrowed'} 
                borrower={availability.borrower}
                until={availability.until}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Game Details */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 animate-slide-up">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Game Details</h2>
              
              <div className="space-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-2">Game ID</dt>
                  <dd className="font-mono text-sm bg-gray-100 px-4 py-3 rounded-lg border">
                    {videoGame.id}
                  </dd>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-2">Platform</dt>
                    <dd className="text-lg font-medium">{formatPlatform(videoGame.platform)}</dd>
                  </div>
                  
                  {videoGame.year && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-2">Year</dt>
                      <dd className="text-lg font-medium">{videoGame.year}</dd>
                    </div>
                  )}
                  
                  {videoGame.players && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-2">Players</dt>
                      <dd className="text-lg font-medium">{videoGame.players}</dd>
                    </div>
                  )}
                  
                  {videoGame.multiplayer !== undefined && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-2">Multiplayer</dt>
                      <dd className="text-lg font-medium">{videoGame.multiplayer ? 'Yes' : 'No'}</dd>
                    </div>
                  )}
                </div>
                
                {videoGame.genre && videoGame.genre.length > 0 && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-3">Genres</dt>
                    <dd>
                      <div className="flex flex-wrap gap-2">
                        {videoGame.genre.map((genre: string) => (
                          <span 
                            key={genre}
                            className="tag"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                )}
                
                {videoGame.notes && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-3">Notes</dt>
                    <dd className="bg-gray-50/50 rounded-lg p-4">
                      <p className="text-gray-900 italic">
                        "{videoGame.notes}"
                      </p>
                    </dd>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Request Loan Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24 animate-scale-in">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Request Loan</h3>
              
              {availability.available ? (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Click the button below to create a loan request via GitHub Pull Request.
                  </p>
                  
                  <a 
                    href={createUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center block"
                  >
                    Request Loan
                  </a>
                  
                  <div className="bg-gray-50/50 rounded-lg p-4 space-y-2">
                    <div className="text-xs text-gray-600">
                      <strong>Request details:</strong>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>• Borrower: <Nickname username={borrower} className="text-xs" /></p>
                      <p>• Due date: {until}</p>
                      <p>• Owner <Nickname username={videoGame.owner} className="text-xs" /> will review</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600">
                    This video game is currently not available for loan.
                  </p>
                  
                  <div className="bg-danger-50/50 border border-danger-200 rounded-lg p-4">
                    <p className="text-sm text-danger-700 font-medium mb-2">
                      Currently borrowed by:
                    </p>
                    <p className="text-sm text-danger-600">
                      <Nickname username={availability.borrower!} className="text-danger-600 hover:text-danger-700" />
                    </p>
                    {availability.until && (
                      <p className="text-xs text-danger-500 mt-1">
                        Due: {availability.until}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
