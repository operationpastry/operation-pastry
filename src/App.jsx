import 'leaflet/dist/leaflet.css'
import { ThemeProvider } from './ThemeContext.jsx'
import MapView from './components/MapView.jsx'
import { useState } from 'react'

function App() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-background)' }}>
        <header 
          className="fixed inset-x-0 top-0 z-[3000] h-24 backdrop-blur-sm flex items-center justify-between px-6"
          style={{
            backgroundColor: 'var(--color-surface)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
            borderBottom: '1px solid var(--color-border-light)'
          }}
        >
          {/* Left side - empty for balance */}
          <div className="w-8"></div>
          
          {/* Center - main title */}
          <div className="flex flex-col items-center text-center leading-snug space-y-0.5">
            <h1
              className="text-2xl font-bold tracking-wide"
              style={{
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-heading)'
              }}
            >
              <span className="title-full">🥐 Operation Pastry 🥐</span>
              <span className="title-compact">Operation Pastry</span>
            </h1>
            <h2 
              className="text-sm font-normal"
              style={{
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-body)'
              }}
            >
              Life's too short for bad pastries
            </h2>
          </div>
          
          {/* Right side - info icon */}
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            style={{ color: 'var(--color-primary)' }}
            aria-label="About Operation Pastry"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </button>
        </header>

        <main className="flex-1 pt-24">
          <MapView />
        </main>

        {/* Info Modal */}
        {isInfoModalOpen && (
          <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4 bg-black/50">
            <div 
              className="max-w-md w-full rounded-2xl shadow-2xl p-6"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border-light)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 
                  className="text-xl font-semibold"
                  style={{
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  About Operation Pastry
                </h2>
                <button
                  onClick={() => setIsInfoModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4" style={{ color: 'var(--color-text-primary)' }}>
                <p className="text-sm leading-relaxed">
                  Welcome to <strong>Operation Pastry</strong> - your ultimate guide to discovering the best pastries in Wellington! 🥐
                </p>
                
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>Our Mission</h3>
                  <p className="text-sm leading-relaxed">
                    We're on a quest to find and review the most delicious pastries across the city. From flaky croissants to decadent danishes, we're documenting every bite to help you discover pastry perfection.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>The Reviewers</h3>
                  <p className="text-sm leading-relaxed">
                    <strong>Chloe</strong> and <strong>Josh</strong> are our dedicated pastry critics, sampling and rating pastries from cafes all over Wellington. Each pastry gets rated out of 10 with detailed tasting notes.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>How to Use</h3>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Click on map markers to see cafe details and pastry reviews</li>
                    <li>Use the filter to find specific pastry types or flavors</li>
                    <li>Search for pastries by name, flavor, or review keywords</li>
                    <li>View the list to sort cafes by ratings or proximity</li>
                  </ul>
                </div>
                
                <div className="pt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <p>Note: Some cafes may be closed but we keep their reviews for reference.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <footer className="p-4 text-center text-sm text-gray-500 border-t">
          Data © OpenStreetMap contributors
        </footer> */}
      </div>
    </ThemeProvider>
  )
}

export default App
