export default function TestPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Add top padding to account for fixed header */}
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-playfair font-bold mb-8">Test Page</h1>
          <p className="text-lg mb-8">
            Testing the static header behavior and different layouts
          </p>

          {/* Add some content to enable scrolling */}
          <div className="space-y-8">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Section {i + 1}</h2>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
