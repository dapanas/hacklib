import { getAllElectronics } from "@/lib/data";
import { getAvailability } from "@/lib/availability";
import ElectronicsCard from "@/components/ElectronicsCard";

export const revalidate = 60;

export default async function ElectronicsPage() {
  const electronics = await getAllElectronics();
  
  // Get availability for each electronic component
  const electronicsWithAvailability = await Promise.all(
    electronics.map(async (electronic) => ({
      ...electronic,
      availability: await getAvailability(electronic.id)
    }))
  );

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Electronics 🔌</h1>
          <p className="text-gray-600">
            Discover electronic components and development boards available for loan from our community library.
          </p>
        </div>
        
        {/* Electronics Grid */}
        {electronicsWithAvailability.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {electronicsWithAvailability.map((electronic) => (
              <div key={electronic.id} className="h-full">
                <ElectronicsCard 
                  electronics={electronic}
                  availability={electronic.availability}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="glass-card p-12 max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔌</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No electronics yet</h3>
              <p className="text-gray-600 mb-6">
                No electronic components have been added to the library yet. Check back later!
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
