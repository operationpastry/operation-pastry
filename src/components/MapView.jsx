import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { cafes } from '../data/cafes.js'

// Fixed coordinates for the Xero office marker
const XERO_COORDINATES = [-41.29149210403766, 174.7797122557562]

// List of closed cafes that should appear in greyscale
const CLOSED_CAFES = ['Myrtle', 'Bordeaux Bakery', 'Dough Bakery', 'Jimmy J Takeaway Coffee']

function MapView() {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const openTooltipMarkerRef = useRef(null)
  const [selectedCafe, setSelectedCafe] = useState(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isListOpen, setIsListOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('rating') // 'rating' | 'proximity'
  const [isSortOpen, setIsSortOpen] = useState(false)
  
  // Audio
  const audioRef = useRef(null)
  
  // Filter states
  const [selectedPastryTypes, setSelectedPastryTypes] = useState([])
  const [selectedFlavors, setSelectedFlavors] = useState([])
  const [showUniqueOnly, setShowUniqueOnly] = useState(false)
  const [minRating, setMinRating] = useState(0)
  
  const selectedCafeRef = useRef(null)
  const isPanelOpenRef = useRef(false)
  const panelRef = useRef(null)
  const searchInputRef = useRef(null)
  const selectedMarkerRef = useRef(null)
  const normalIconRef = useRef(null)
  const selectedIconRef = useRef(null)
  const greyscaleIconRef = useRef(null)
  const greyscaleSelectedIconRef = useRef(null)
  const cafeNameToMarkerRef = useRef(new Map())
  const pendingCafeRef = useRef(null)
  
  const sortMenuRef = useRef(null)

  

  // Close custom sort menu on outside click / Escape
  useEffect(() => {
    if (!isSortOpen) return
    const onMouseDown = (e) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)) {
        setIsSortOpen(false)
      }
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsSortOpen(false)
    }
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isSortOpen])

  const sortOptions = [
    { value: 'rating', label: 'Overall Ranking' },
    { value: 'chloe', label: "Chloe's Favorites" },
    { value: 'josh', label: "Josh's Favorites" },
    { value: 'proximity', label: 'Proximity to Xero' },
    { value: 'alphabetical', label: 'Alphabetical' },
  ]

  const getSortLabel = (value) => sortOptions.find(o => o.value === value)?.label ?? 'Sort'

  

  // Extract all unique pastry types and flavors from the data
  const allPastryTypes = [...new Set(cafes.flatMap(cafe => 
    cafe.pastries.map(pastry => {
      const name = pastry.name.toLowerCase()
      if (name.includes('croissant')) return 'Croissant'
      if (name.includes('danish')) return 'Danish'
      if (name.includes('scroll') || name.includes('brioche')) return 'Scroll/Brioche'
      if (name.includes('cake') || name.includes('opera')) return 'Cake'
      if (name.includes('crumpet')) return 'Crumpet'
      if (name.includes('cronut') || name.includes('crookie')) return 'Cronut/Crookie'
      if (name.includes('cube')) return 'Cube Croissant'
      if (name.includes('swirl')) return 'Swirl'
      return 'Other'
    })
  ))]

  const allFlavors = [...new Set(cafes.flatMap(cafe => 
    cafe.pastries.flatMap(pastry => {
      const name = pastry.name.toLowerCase()
      const flavors = []
      if (name.includes('almond')) flavors.push('Almond')
      if (name.includes('chocolate')) flavors.push('Chocolate')
      if (name.includes('hazelnut')) flavors.push('Hazelnut')
      if (name.includes('cinnamon')) flavors.push('Cinnamon')
      if (name.includes('apple')) flavors.push('Apple')
      if (name.includes('strawberry')) flavors.push('Strawberry')
      if (name.includes('raspberry')) flavors.push('Raspberry')
      if (name.includes('boysenberry')) flavors.push('Boysenberry')
      if (name.includes('pear')) flavors.push('Pear')
      if (name.includes('plum')) flavors.push('Plum')
      if (name.includes('lemon')) flavors.push('Lemon')
      if (name.includes('passionfruit')) flavors.push('Passionfruit')
      if (name.includes('peach')) flavors.push('Peach')
      if (name.includes('pistachio')) flavors.push('Pistachio')
      if (name.includes('banoffee')) flavors.push('Banoffee')
      if (name.includes('oreo')) flavors.push('Oreo')
      if (name.includes('caramel') || name.includes('caramello')) flavors.push('Caramel')
      if (name.includes('tiramisu')) flavors.push('Tiramisu')
      if (name.includes('brown butter')) flavors.push('Brown Butter')
      if (name.includes('rhubarb')) flavors.push('Rhubarb')
      return flavors
    })
  ))]

  // Get unique pastries (pastries that only appear once across all cafes)
  const getUniquePastries = () => {
    const pastryCounts = {}
    cafes.forEach(cafe => {
      cafe.pastries.forEach(pastry => {
        pastryCounts[pastry.name] = (pastryCounts[pastry.name] || 0) + 1
      })
    })
    return Object.keys(pastryCounts).filter(name => pastryCounts[name] === 1)
  }

  const uniquePastries = getUniquePastries()

  // Filter cafes based on selected criteria
  const getFilteredCafes = () => {
    return cafes.filter(cafe => {
      // Check if cafe has any pastries that meet the filter criteria
      const hasMatchingPastries = cafe.pastries.some(pastry => {
        // Check pastry type filter
        if (selectedPastryTypes.length > 0) {
          const pastryType = getPastryType(pastry.name)
          if (!selectedPastryTypes.includes(pastryType)) return false
        }

        // Check flavor filter
        if (selectedFlavors.length > 0) {
          const pastryFlavors = getPastryFlavors(pastry.name)
          if (!selectedFlavors.some(flavor => pastryFlavors.includes(flavor))) return false
        }

        // Check unique pastry filter
        if (showUniqueOnly && !uniquePastries.includes(pastry.name)) return false

        // Check minimum rating filter
        const avgRating = (pastry.reviews.chloe.rating + pastry.reviews.josh.rating) / 2
        if (avgRating < minRating) return false

        return true
      })

      return hasMatchingPastries
    })
  }

  const getPastryType = (pastryName) => {
    const name = pastryName.toLowerCase()
    if (name.includes('croissant')) return 'Croissant'
    if (name.includes('danish')) return 'Danish'
    if (name.includes('scroll') || name.includes('brioche')) return 'Scroll/Brioche'
    if (name.includes('cake') || name.includes('opera')) return 'Cake'
    if (name.includes('crumpet')) return 'Crumpet'
    if (name.includes('cronut') || name.includes('crookie')) return 'Cronut/Crookie'
    if (name.includes('cube')) return 'Cube Croissant'
    if (name.includes('swirl')) return 'Swirl'
    return 'Other'
  }

  const getPastryFlavors = (pastryName) => {
    const name = pastryName.toLowerCase()
    const flavors = []
    if (name.includes('almond')) flavors.push('Almond')
    if (name.includes('chocolate')) flavors.push('Chocolate')
    if (name.includes('hazelnut')) flavors.push('Hazelnut')
    if (name.includes('cinnamon')) flavors.push('Cinnamon')
    if (name.includes('apple')) flavors.push('Apple')
    if (name.includes('strawberry')) flavors.push('Strawberry')
    if (name.includes('raspberry')) flavors.push('Raspberry')
    if (name.includes('boysenberry')) flavors.push('Boysenberry')
    if (name.includes('pear')) flavors.push('Pear')
    if (name.includes('plum')) flavors.push('Plum')
    if (name.includes('lemon')) flavors.push('Lemon')
    if (name.includes('passionfruit')) flavors.push('Passionfruit')
    if (name.includes('peach')) flavors.push('Peach')
    if (name.includes('pistachio')) flavors.push('Pistachio')
    if (name.includes('banoffee')) flavors.push('Banoffee')
    if (name.includes('oreo')) flavors.push('Oreo')
    if (name.includes('caramel') || name.includes('caramello')) flavors.push('Caramel')
    if (name.includes('tiramisu')) flavors.push('Tiramisu')
    if (name.includes('brown butter')) flavors.push('Brown Butter')
    if (name.includes('rhubarb')) flavors.push('Rhubarb')
    return flavors
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedPastryTypes([])
    setSelectedFlavors([])
    setShowUniqueOnly(false)
    setMinRating(0)
  }

  

  // Search functionality
  const getSearchResults = () => {
    if (!searchQuery.trim()) return []
    
    const query = searchQuery.toLowerCase().trim()
    const results = []
    
    cafes.forEach(cafe => {
      cafe.pastries.forEach(pastry => {
        const pastryName = pastry.name.toLowerCase()
        const chloeComment = pastry.reviews.chloe.comment.toLowerCase()
        const joshComment = pastry.reviews.josh.comment.toLowerCase()
        
        // Check if query matches pastry name or review comments
        if (pastryName.includes(query) || 
            chloeComment.includes(query) || 
            joshComment.includes(query)) {
          
          // Extract relevant quotes
          const chloeQuote = extractQuote(pastry.reviews.chloe.comment, query)
          const joshQuote = extractQuote(pastry.reviews.josh.comment, query)
          
          results.push({
            cafe: cafe.name,
            pastry: pastry.name,
            chloeRating: pastry.reviews.chloe.rating,
            joshRating: pastry.reviews.josh.rating,
            chloeQuote,
            joshQuote,
            chloeHasMatch: chloeComment.includes(query),
            joshHasMatch: joshComment.includes(query),
            isClosed: CLOSED_CAFES.includes(cafe.name),
            coordinates: cafe.coordinates
          })
        }
      })
    })
    
    // Sort by relevance (exact matches first, then by average rating)
    return results.sort((a, b) => {
      const aExactMatch = a.pastry.toLowerCase().includes(query) ? 1 : 0
      const bExactMatch = b.pastry.toLowerCase().includes(query) ? 1 : 0
      
      if (aExactMatch !== bExactMatch) return bExactMatch - aExactMatch
      
      const aAvg = (a.chloeRating + a.joshRating) / 2
      const bAvg = (b.chloeRating + b.joshRating) / 2
      return bAvg - aAvg
    })
  }

  // Highlight matching parts of text (case-insensitive)
  const highlightMatch = (text, query) => {
    if (!query || !query.trim()) return text
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    try {
      const regex = new RegExp(`(${escaped})`, 'ig')
      const parts = String(text).split(regex)
      return parts.map((part, idx) => (
        regex.test(part) ? (
          <strong key={`h-${idx}`}>{part}</strong>
        ) : (
          <span key={`t-${idx}`}>{part}</span>
        )
      ))
    } catch {
      return text
    }
  }

  // Helper function to extract relevant quote from review
  const extractQuote = (comment, query) => {
    const lowerComment = comment.toLowerCase()
    const lowerQuery = query.toLowerCase()
    
    if (!lowerComment.includes(lowerQuery)) return null
    
    const queryIndex = lowerComment.indexOf(lowerQuery)
    const startIndex = Math.max(0, queryIndex - 50)
    const endIndex = Math.min(comment.length, queryIndex + query.length + 50)
    
    let quote = comment.substring(startIndex, endIndex)
    
    // Add ellipsis if we're not at the beginning/end
    if (startIndex > 0) quote = '...' + quote
    if (endIndex < comment.length) quote = quote + '...'
    
    return quote
  }

  // Update marker visibility based on filters
  useEffect(() => {
    const filteredCafes = getFilteredCafes()

    markersRef.current.forEach(marker => {
      const cafeName = Array.from(cafeNameToMarkerRef.current.entries())
        .find(([name, m]) => m === marker)?.[0]
      
      if (cafeName) {
        if (filteredCafes.some(cafe => cafe.name === cafeName)) {
          marker.addTo(mapRef.current)
        } else {
          marker.remove()
        }
      }
    })
  }, [selectedPastryTypes, selectedFlavors, showUniqueOnly, minRating])

  useEffect(() => {
    selectedCafeRef.current = selectedCafe
  }, [selectedCafe])

  useEffect(() => {
    isPanelOpenRef.current = isPanelOpen
  }, [isPanelOpen])

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return

    const center = [-41.28664, 174.77557]
    const zoom = 15

    const map = L.map(mapContainerRef.current).setView(center, zoom)
    mapRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap, &copy; CARTO', maxZoom: 19
    }).addTo(map)

    // Croissant icons (normal and selected)
    const normalIcon = L.divIcon({
      html: '<div class="emoji-ico" style="font-size:28px; line-height:1">🥐</div>',
      className: 'emoji-pin',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    })
    const selectedIcon = L.divIcon({
      html: '<div class="emoji-ico" style="font-size:42px; line-height:1">🥐</div>',
      className: 'emoji-pin emoji-pin-selected',
      iconSize: [42, 42],
      iconAnchor: [21, 21],
    })
    
    // Greyscale icons for closed cafes
    const greyscaleIcon = L.divIcon({
      html: '<div class="emoji-ico" style="font-size:28px; line-height:1; filter: grayscale(100%); opacity: 0.6;">🥐</div>',
      className: 'emoji-pin emoji-pin-greyscale',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    })
    const greyscaleSelectedIcon = L.divIcon({
      html: '<div class="emoji-ico" style="font-size:42px; line-height:1; filter: grayscale(100%); opacity: 0.8;">🥐</div>',
      className: 'emoji-pin emoji-pin-selected emoji-pin-greyscale',
      iconSize: [42, 42],
      iconAnchor: [21, 21],
    })
    
    normalIconRef.current = normalIcon
    selectedIconRef.current = selectedIcon
    greyscaleIconRef.current = greyscaleIcon
    greyscaleSelectedIconRef.current = greyscaleSelectedIcon

    // Add cafe markers with click handlers
    markersRef.current = cafes.map((cafe) => {
      const isClosed = CLOSED_CAFES.includes(cafe.name)
      const defaultIcon = isClosed ? greyscaleIconRef.current : normalIconRef.current
      const selectedIconForCafe = isClosed ? greyscaleSelectedIconRef.current : selectedIconRef.current
      
      const marker = L.marker(cafe.coordinates, { icon: defaultIcon, riseOnHover: true }).addTo(map)
      cafeNameToMarkerRef.current.set(cafe.name, marker)
      
      // Add "(Closed)" to tooltip for closed cafes
      const tooltipText = isClosed ? `${cafe.name} (Closed)` : cafe.name
      marker.bindTooltip(tooltipText, {
        direction: 'top',
        offset: [0, -12],
        className: 'cafe-tooltip',
        opacity: 1,
        sticky: false,
        interactive: true,
      })
      
      marker.on('click', () => {
        if (openTooltipMarkerRef.current && openTooltipMarkerRef.current !== marker) {
          openTooltipMarkerRef.current.closeTooltip()
        }
        marker.openTooltip()
        openTooltipMarkerRef.current = marker
        // Toggle panel if clicking the same marker again
        const current = selectedCafeRef.current
        if (current && current.name === cafe.name && isPanelOpenRef.current) {
          setIsPanelOpen(false)
        } else {
          // If panel already open, perform a swap animation: slide out, then slide in with new cafe
          if (isPanelOpenRef.current) {
            // Immediately reset the current marker icon and set the new one
            if (selectedMarkerRef.current) {
              const currentCafeName = Array.from(cafeNameToMarkerRef.current.entries())
                .find(([name, m]) => m === selectedMarkerRef.current)?.[0]
              const isCurrentClosed = CLOSED_CAFES.includes(currentCafeName)
              const resetIcon = isCurrentClosed ? greyscaleIconRef.current : normalIconRef.current
              selectedMarkerRef.current.setIcon(resetIcon)
            }
            // Set the new marker as selected immediately
            const isNewClosed = CLOSED_CAFES.includes(cafe.name)
            const newSelectedIcon = isNewClosed ? greyscaleSelectedIconRef.current : selectedIconRef.current
            marker.setIcon(newSelectedIcon)
            selectedMarkerRef.current = marker
            
            pendingCafeRef.current = cafe
            setIsPanelOpen(false)
          } else {
            // Panel closed: immediately select and open
            if (selectedMarkerRef.current) {
              // Reset to appropriate default icon based on cafe status
              const currentCafeName = Array.from(cafeNameToMarkerRef.current.entries())
                .find(([name, m]) => m === selectedMarkerRef.current)?.[0]
              const isCurrentClosed = CLOSED_CAFES.includes(currentCafeName)
              const resetIcon = isCurrentClosed ? greyscaleIconRef.current : normalIconRef.current
              selectedMarkerRef.current.setIcon(resetIcon)
            }
            if (selectedIconForCafe) {
              marker.setIcon(selectedIconForCafe)
              selectedMarkerRef.current = marker
            }
            setSelectedCafe(cafe)
          }
        }
      })
      return marker
    })

    // Initialize audio
  audioRef.current = new Audio('operation-pastry.mp3')
    audioRef.current.loop = true
    
    // Add a clickable Xero office marker with audio functionality
    const xeroIcon = L.icon({
  iconUrl: 'xero_office.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      className: 'xero-pin',
    })
    const xeroCoordinates = XERO_COORDINATES
    const xeroMarker = L.marker(xeroCoordinates, {
      icon: xeroIcon,
      riseOnHover: true,
      zIndexOffset: 1000,
    }).addTo(map)
    
    // Make Xero marker clickable for audio toggle (use audio element state to avoid stale closures)
    xeroMarker.on('click', () => {
      const audio = audioRef.current
      if (!audio) return
      if (audio.paused) {
        audio.play().catch(() => {})
      } else {
        audio.pause()
      }
      // No separate status marker; pin remains the Xero logo
    })
    
    xeroMarker.bindTooltip('Xero office', {
      direction: 'top',
      offset: [0, -12],
      className: 'cafe-tooltip',
      opacity: 1,
      sticky: false,
      interactive: false,
    })

    const handleMapClick = () => {
      if (openTooltipMarkerRef.current) {
        openTooltipMarkerRef.current.closeTooltip()
        openTooltipMarkerRef.current = null
      }
    }
    map.on('click', handleMapClick)

    // Ensure the map properly sizes itself after mount
    setTimeout(() => {
      map.invalidateSize()
    }, 0)

    return () => {
      // Remove markers and map on cleanup
      map.off('click', handleMapClick)
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []
      map.remove()
      mapRef.current = null
      
      // Clean up audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // When a cafe is selected, open the panel on the next frame to animate from bottom
  useEffect(() => {
    if (selectedCafe) {
      requestAnimationFrame(() => setIsPanelOpen(true))
    }
  }, [selectedCafe])

  // When panel is open with a selection, center the selected marker within the visible map area
  useEffect(() => {
    const map = mapRef.current
    if (!map || !selectedCafe || !isPanelOpen) return
    const panelHeight = panelRef.current?.offsetHeight ?? 200
    const size = map.getSize()
    const markerPoint = map.latLngToContainerPoint(selectedCafe.coordinates)
    const centerPoint = map.latLngToContainerPoint(map.getCenter())
    // target vertical center is the midpoint of the visible area (map height minus panel)
    const visibleHeight = Math.max(0, size.y - panelHeight)
    const targetY = visibleHeight / 2
    const deltaY = markerPoint.y - targetY
    if (Math.abs(deltaY) > 1) {
      const newCenterPoint = centerPoint.add([0, deltaY])
      const newCenterLatLng = map.containerPointToLatLng(newCenterPoint)
      map.panTo(newCenterLatLng, { animate: true })
    }
  }, [selectedCafe, isPanelOpen])

  // Compute average rating for each cafe (ignoring zeros)
  const cafesWithAverages = getFilteredCafes().map((cafe) => {
    const chloeRatings = cafe.pastries
      .map((p) => p.reviews.chloe.rating)
      .filter((r) => typeof r === 'number' && r > 0)
    const joshRatings = cafe.pastries
      .map((p) => p.reviews.josh.rating)
      .filter((r) => typeof r === 'number' && r > 0)
    
    const chloeAverage = chloeRatings.length > 0 ? chloeRatings.reduce((a, b) => a + b, 0) / chloeRatings.length : 0
    const joshAverage = joshRatings.length > 0 ? joshRatings.reduce((a, b) => a + b, 0) / joshRatings.length : 0
    
    const allRatings = [...chloeRatings, ...joshRatings]
    const averageRating = allRatings.length > 0 ? allRatings.reduce((a, b) => a + b, 0) / allRatings.length : 0
    
    return { ...cafe, averageRating, chloeAverage, joshAverage }
  })

  function toRadians(deg) {
    return (deg * Math.PI) / 180
  }

  function distanceMeters(a, b) {
    const R = 6371000
    const [lat1, lon1] = a
    const [lat2, lon2] = b
    const dLat = toRadians(lat2 - lat1)
    const dLon = toRadians(lon2 - lon1)
    const sLat1 = toRadians(lat1)
    const sLat2 = toRadians(lat2)
    const aa = Math.sin(dLat / 2) ** 2 + Math.cos(sLat1) * Math.cos(sLat2) * Math.sin(dLon / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa))
    return R * c
  }

  const sortedCafes = [...cafesWithAverages].sort((a, b) => {
    if (sortBy === 'proximity') {
      const da = distanceMeters(a.coordinates, XERO_COORDINATES)
      const db = distanceMeters(b.coordinates, XERO_COORDINATES)
      return da - db
    }
    if (sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name)
    }
    if (sortBy === 'chloe') {
      if (b.chloeAverage !== a.chloeAverage) return b.chloeAverage - a.chloeAverage
      return a.name.localeCompare(b.name)
    }
    if (sortBy === 'josh') {
      if (b.joshAverage !== a.joshAverage) return b.joshAverage - a.joshAverage
      return a.name.localeCompare(b.name)
    }
    // Default: overall rating
    if (b.averageRating !== a.averageRating) return b.averageRating - a.averageRating
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="relative w-full">
      {/* Top-right action buttons */}
      <div className="absolute right-4 top-4 z-[1800] flex gap-2">
        {/* Search button */}
        <button
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-white"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border-medium)',
            color: 'var(--color-text-primary)',
            boxShadow: 'var(--shadow-sm)'
          }}
          onClick={() => {
            // Close bottom panel if open
            if (isPanelOpen) {
              setIsPanelOpen(false)
              if (openTooltipMarkerRef.current) {
                openTooltipMarkerRef.current.closeTooltip()
                openTooltipMarkerRef.current = null
              }
              // Reset selected marker icon
              if (selectedMarkerRef.current) {
                const currentCafeName = Array.from(cafeNameToMarkerRef.current.entries())
                  .find(([name, m]) => m === selectedMarkerRef.current)?.[0]
                const isCurrentClosed = CLOSED_CAFES.includes(currentCafeName)
                const resetIcon = isCurrentClosed ? greyscaleIconRef.current : normalIconRef.current
                selectedMarkerRef.current.setIcon(resetIcon)
                selectedMarkerRef.current = null
              }
              setSelectedCafe(null)
              // Wait for slide-out animation to complete before opening search panel
              setTimeout(() => setIsSearchOpen(true), 150)
            } else {
              setIsSearchOpen(true)
            }
          }}
          aria-label="Search pastries"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </button>
        
        {/* Filter button */}
        <button
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-white"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border-medium)',
            color: 'var(--color-text-primary)',
            boxShadow: 'var(--shadow-sm)'
          }}
          onClick={() => {
            // Close bottom panel if open
            if (isPanelOpen) {
              setIsPanelOpen(false)
              if (openTooltipMarkerRef.current) {
                openTooltipMarkerRef.current.closeTooltip()
                openTooltipMarkerRef.current = null
              }
              // Reset selected marker icon
              if (selectedMarkerRef.current) {
                const currentCafeName = Array.from(cafeNameToMarkerRef.current.entries())
                  .find(([name, m]) => m === selectedMarkerRef.current)?.[0]
                const isCurrentClosed = CLOSED_CAFES.includes(currentCafeName)
                const resetIcon = isCurrentClosed ? greyscaleIconRef.current : normalIconRef.current
                selectedMarkerRef.current.setIcon(resetIcon)
                selectedMarkerRef.current = null
              }
              setSelectedCafe(null)
              // Wait for slide-out animation to complete before opening filter panel
              setTimeout(() => setIsFilterOpen(true), 150)
            } else {
              setIsFilterOpen(true)
            }
          }}
          aria-label="Filter markers"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </button>
        
        {/* View list button */}
        <button
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-white"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border-medium)',
            color: 'var(--color-text-primary)',
            boxShadow: 'var(--shadow-sm)'
          }}
          onClick={() => {
            // Close bottom panel if open
            if (isPanelOpen) {
              setIsPanelOpen(false)
              if (openTooltipMarkerRef.current) {
                openTooltipMarkerRef.current.closeTooltip()
                openTooltipMarkerRef.current = null
              }
              // Reset selected marker icon
              if (selectedMarkerRef.current) {
                const currentCafeName = Array.from(cafeNameToMarkerRef.current.entries())
                  .find(([name, m]) => m === selectedMarkerRef.current)?.[0]
                const isCurrentClosed = CLOSED_CAFES.includes(currentCafeName)
                const resetIcon = isCurrentClosed ? greyscaleIconRef.current : normalIconRef.current
                selectedMarkerRef.current.setIcon(resetIcon)
                selectedMarkerRef.current = null
              }
              setSelectedCafe(null)
              // Wait for slide-out animation to complete before opening side panel
              setTimeout(() => setIsListOpen(true), 150)
            } else {
              setIsListOpen(true)
            }
          }}
          aria-label="View list"
        >
          View list
        </button>
      </div>

      <div
        ref={mapContainerRef}
        className="w-full"
        style={{ height: 'calc(100vh - 6rem)', width: '100%' }}
      />

      {/* Right-side list panel */}
      <div
        className={`fixed right-0 bottom-0 top-24 z-[1900] w-full max-w-md transform transition-transform duration-300 ease-out side-panel ${isListOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isListOpen}
      >
        <div 
          className="flex h-full flex-col shadow-xl ring-1"
          style={{
            backgroundColor: 'var(--color-surface)',
            boxShadow: 'var(--shadow-lg)',
            borderColor: 'var(--color-border-light)'
          }}
        >
          <div 
            className="flex items-center justify-between border-b px-4 py-3"
            style={{ borderColor: 'var(--color-border-light)' }}
          >
            <h2 
              className="text-lg font-semibold"
              style={{ 
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-heading)'
              }}
            >
              Cafes
            </h2>
                          <div className="flex items-center gap-3">
                <label 
                  className="text-sm hide-under-390"
                  htmlFor="sortBy"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Sort by:
                </label>
                <div className="relative" ref={sortMenuRef}>
                  <button
                    type="button"
                    className="inline-flex items-center justify-between rounded-md border px-2 py-1 text-sm w-40 no-translate-hover"
                    style={{
                      backgroundColor: 'var(--color-background)',
                      borderColor: 'var(--color-border-medium)',
                      color: 'var(--color-text-primary)'
                    }}
                    onClick={() => setIsSortOpen((v) => !v)}
                    aria-haspopup="listbox"
                    aria-expanded={isSortOpen}
                    aria-controls="sortByListbox"
                  >
                    <span className="truncate">{getSortLabel(sortBy)}</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-text-secondary)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isSortOpen && (
                    <ul
                      id="sortByListbox"
                      role="listbox"
                      className="absolute z-[2000] mt-1 w-40 rounded-md border shadow-lg"
                      style={{
                        top: '100%',
                        left: 0,
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border-light)'
                      }}
                    >
                      {sortOptions.map((opt) => (
                        <li
                          key={opt.value}
                          role="option"
                          aria-selected={sortBy === opt.value}
                          className="px-3 py-1.5 cursor-pointer text-sm hover:bg-gray-50"
                          style={{ color: 'var(--color-text-primary)' }}
                          onClick={() => {
                            setSortBy(opt.value)
                            setIsSortOpen(false)
                          }}
                        >
                          {opt.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              <button
                className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
                style={{
                  backgroundColor: 'var(--color-background)',
                  borderColor: 'var(--color-border-medium)',
                  color: 'var(--color-text-secondary)'
                }}
                onClick={() => setIsListOpen(false)}
                aria-label="Close list"
              >
                ×
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-1 gap-3">
              {sortedCafes.map((cafe) => {
                const distance = distanceMeters(cafe.coordinates, XERO_COORDINATES)
                return (
                  <button
                    key={cafe.name}
                    type="button"
                    className="text-left rounded-lg border p-3 shadow-sm list-item"
                    style={{
                      backgroundColor: CLOSED_CAFES.includes(cafe.name) 
                        ? 'var(--color-surface)' 
                        : 'var(--color-background)',
                      borderColor: CLOSED_CAFES.includes(cafe.name)
                        ? 'var(--color-border-medium)'
                        : 'var(--color-border-light)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                    onClick={() => {
                      const marker = cafeNameToMarkerRef.current.get(cafe.name)
                      if (marker) {
                        if (openTooltipMarkerRef.current && openTooltipMarkerRef.current !== marker) {
                          openTooltipMarkerRef.current.closeTooltip()
                        }
                        // If panel already open, use the swap animation flow; otherwise select immediately
                        const current = selectedCafeRef.current
                        if (isPanelOpenRef.current) {
                          pendingCafeRef.current = cafe
                          setIsPanelOpen(false)
                        } else {
                          if (selectedMarkerRef.current) {
                            // Reset to appropriate default icon based on cafe status
                            const currentCafeName = Array.from(cafeNameToMarkerRef.current.entries())
                              .find(([name, m]) => m === selectedMarkerRef.current)?.[0]
                            const isCurrentClosed = CLOSED_CAFES.includes(currentCafeName)
                            const resetIcon = isCurrentClosed ? greyscaleIconRef.current : normalIconRef.current
                            selectedMarkerRef.current.setIcon(resetIcon)
                          }
                          if (selectedIconRef.current) {
                            const isClosed = CLOSED_CAFES.includes(cafe.name)
                            const selectedIconForCafe = isClosed ? greyscaleSelectedIconRef.current : selectedIconRef.current
                            marker.setIcon(selectedIconForCafe)
                            selectedMarkerRef.current = marker
                          }
                          setSelectedCafe(cafe)
                        }
                        if (marker.openTooltip) {
                          marker.openTooltip()
                          openTooltipMarkerRef.current = marker
                        }
                      } else {
                        // Fallback: just select cafe
                        setSelectedCafe(cafe)
                      }
                      setIsListOpen(false)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div 
                          className="text-base font-medium"
                          style={{ 
                            color: CLOSED_CAFES.includes(cafe.name) 
                              ? 'var(--color-text-muted)' 
                              : 'var(--color-text-primary)'
                          }}
                        >
                          {cafe.name}
                          {CLOSED_CAFES.includes(cafe.name) && (
                            <span 
                              className="ml-2 text-xs"
                              style={{ color: 'var(--color-text-muted)' }}
                            >
                              (Closed)
                            </span>
                          )}
                        </div>
                        <div 
                          className="text-xs"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {sortBy === 'chloe' && `Chloe's rating: ${cafe.chloeAverage.toFixed(1)}/10`}
                          {sortBy === 'josh' && `Josh's rating: ${cafe.joshAverage.toFixed(1)}/10`}
                          {(sortBy === 'rating' || sortBy === 'proximity' || sortBy === 'alphabetical') && `Avg rating: ${cafe.averageRating.toFixed(1)}/10`}
                        </div>
                      </div>
                      <div 
                        className="text-xs whitespace-nowrap"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {Math.round(distance)} m
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Click-outside overlay for the list panel */}
      {isListOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-24 z-[1850] bg-black/20"
          onClick={() => setIsListOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Right-side filter panel */}
      <div
        className={`fixed right-0 bottom-0 top-24 z-[1900] w-full max-w-md transform transition-transform duration-300 ease-out side-panel ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isFilterOpen}
      >
        <div 
          className="flex h-full flex-col shadow-xl ring-1"
          style={{
            backgroundColor: 'var(--color-surface)',
            boxShadow: 'var(--shadow-lg)',
            borderColor: 'var(--color-border-light)'
          }}
        >
          <div 
            className="flex items-center justify-between border-b px-4 py-3"
            style={{ borderColor: 'var(--color-border-light)' }}
          >
            <h2 
              className="text-lg font-semibold"
              style={{ 
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-heading)'
              }}
            >
              Filter Markers
            </h2>
            <button
              className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
              style={{
                backgroundColor: 'var(--color-background)',
                borderColor: 'var(--color-border-medium)',
                color: 'var(--color-text-secondary)'
              }}
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close filter"
            >
              ×
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {/* Pastry Types */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Pastry Types</h3>
                <div className="grid grid-cols-2 gap-2">
                  {allPastryTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedPastryTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPastryTypes([...selectedPastryTypes, type])
                          } else {
                            setSelectedPastryTypes(selectedPastryTypes.filter(t => t !== type))
                          }
                        }}
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Flavors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Flavors</h3>
                <div className="grid grid-cols-2 gap-2">
                  {allFlavors.map((flavor) => (
                    <label key={flavor} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedFlavors.includes(flavor)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFlavors([...selectedFlavors, flavor])
                          } else {
                            setSelectedFlavors(selectedFlavors.filter(f => f !== flavor))
                          }
                        }}
                      />
                      <span className="ml-2 text-sm text-gray-700">{flavor}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Unique Pastries Only */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={showUniqueOnly}
                    onChange={(e) => setShowUniqueOnly(e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700">Show unique pastries only</span>
                </label>
                {showUniqueOnly && (
                  <p className="mt-1 text-xs text-gray-500">
                    Only show cafes with pastries that appear nowhere else
                  </p>
                )}
              </div>

              {/* Minimum Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Minimum Average Rating: {minRating}/10
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>

              {/* Active Filters Summary */}
              {(selectedPastryTypes.length > 0 || selectedFlavors.length > 0 || showUniqueOnly || minRating > 0) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Active Filters:</h4>
                  <div className="space-y-1">
                    {selectedPastryTypes.length > 0 && (
                      <p className="text-xs text-blue-700">
                        Types: {selectedPastryTypes.join(', ')}
                      </p>
                    )}
                    {selectedFlavors.length > 0 && (
                      <p className="text-xs text-blue-700">
                        Flavors: {selectedFlavors.join(', ')}
                      </p>
                    )}
                    {showUniqueOnly && (
                      <p className="text-xs text-blue-700">Unique pastries only</p>
                    )}
                    {minRating > 0 && (
                      <p className="text-xs text-blue-700">Min rating: {minRating}/10</p>
                    )}
                  </div>
                </div>
              )}

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Click-outside overlay for the filter panel */}
      {isFilterOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-24 z-[1850] bg-black/20"
          onClick={() => setIsFilterOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Right-side search panel */}
      <div
        className={`fixed right-0 bottom-0 top-24 z-[1900] w-full max-w-md transform transition-transform duration-300 ease-out side-panel ${isSearchOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isSearchOpen}
      >
        <div 
          className="flex h-full flex-col shadow-xl ring-1"
          style={{
            backgroundColor: 'var(--color-surface)',
            boxShadow: 'var(--shadow-lg)',
            borderColor: 'var(--color-border-light)'
          }}
        >
          <div 
            className="flex items-center justify-between border-b px-4 py-3"
            style={{ borderColor: 'var(--color-border-light)' }}
          >
            <h2 
              className="text-lg font-semibold"
              style={{ 
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-heading)'
              }}
            >
              Search Pastries
            </h2>
            <button
              className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
              style={{
                backgroundColor: 'var(--color-background)',
                borderColor: 'var(--color-border-medium)',
                color: 'var(--color-text-secondary)'
              }}
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
            >
              ×
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Search input */}
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search pastries, flavors, or review comments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border pl-3 pr-9 py-2 text-sm focus:outline-none focus:ring-1"
                  style={{
                    backgroundColor: 'var(--color-background)',
                    borderColor: 'var(--color-border-medium)',
                    color: 'var(--color-text-primary)',
                    '--tw-placeholder-opacity': '1'
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 my-auto h-6 w-6 flex items-center justify-center rounded hover:bg-gray-100"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onClick={() => {
                      setSearchQuery('')
                      if (searchInputRef.current) searchInputRef.current.focus()
                    }}
                    aria-label="Clear search"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10l-4.95-4.95L5.05 3.636 10 8.586z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Search results */}
              {searchQuery.trim() && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Results ({getSearchResults().length})
                  </h3>
                  <div className="space-y-3">
                    {getSearchResults().map((result, index) => (
                      <div
                        key={`${result.cafe}-${result.pastry}-${index}`}
                        className={`rounded-lg border p-3 list-item ${
                          result.isClosed 
                            ? 'border-gray-300 bg-gray-50' 
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className={`text-sm font-medium ${
                              result.isClosed ? 'text-gray-500' : 'text-gray-900'
                            }`}>
                              {highlightMatch(result.pastry, searchQuery)}
                              {result.isClosed && (
                                <span className="ml-2 text-xs text-gray-400">(Closed)</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {highlightMatch(result.cafe, searchQuery)}
                            </div>
                            <div className="flex gap-4 mt-2 text-xs">
                              <div>
                                <span className="font-medium text-gray-700">Chloe:</span> {result.chloeRating}/10
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Josh:</span> {result.joshRating}/10
                              </div>
                            </div>
                            <div className="mt-2 space-y-1">
                              {result.chloeHasMatch && result.chloeQuote && (
                                <div className="text-xs text-gray-600">
                                  <span className="font-medium">Chloe:</span> "{highlightMatch(result.chloeQuote, searchQuery)}"
                                </div>
                              )}
                              {result.joshHasMatch && result.joshQuote && (
                                <div className="text-xs text-gray-600">
                                  <span className="font-medium">Josh:</span> "{highlightMatch(result.joshQuote, searchQuery)}"
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              // Find the cafe and select it
                              const cafe = cafes.find(c => c.name === result.cafe)
                              if (cafe) {
                                const marker = cafeNameToMarkerRef.current.get(cafe.name)
                                if (marker) {
                                  if (openTooltipMarkerRef.current && openTooltipMarkerRef.current !== marker) {
                                    openTooltipMarkerRef.current.closeTooltip()
                                  }
                                  marker.openTooltip()
                                  openTooltipMarkerRef.current = marker
                                  
                                  // Select the cafe
                                  if (selectedMarkerRef.current) {
                                    const currentCafeName = Array.from(cafeNameToMarkerRef.current.entries())
                                      .find(([name, m]) => m === selectedMarkerRef.current)?.[0]
                                    const isCurrentClosed = CLOSED_CAFES.includes(currentCafeName)
                                    const resetIcon = isCurrentClosed ? greyscaleIconRef.current : normalIconRef.current
                                    selectedMarkerRef.current.setIcon(resetIcon)
                                  }
                                  
                                  const isClosed = CLOSED_CAFES.includes(cafe.name)
                                  const selectedIconForCafe = isClosed ? greyscaleSelectedIconRef.current : selectedIconRef.current
                                  marker.setIcon(selectedIconForCafe)
                                  selectedMarkerRef.current = marker
                                  
                                  setSelectedCafe(cafe)
                                  setIsSearchOpen(false)
                                }
                              }
                            }}
                            className="ml-2 rounded-md bg-[var(--color-primary)] px-2 py-1 text-xs font-medium text-white hover:bg-[#7c7ceb]"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {getSearchResults().length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No pastries found matching "{searchQuery}"</p>
                      <p className="text-xs mt-1">Try searching for flavors, pastry types, or review keywords</p>
                    </div>
                  )}
                </div>
              )}

              {/* Search tips */}
              {!searchQuery.trim() && (
                <div className="text-center py-8 text-gray-500">
                  <p className="font-medium mb-2">Search Tips:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Search by pastry name (e.g., "croissant", "danish")</li>
                    <li>• Search by flavor (e.g., "almond", "chocolate")</li>
                    <li>• Search by review keywords (e.g., "flaky", "sweet")</li>
                    <li>• Search by texture (e.g., "soft", "crunchy")</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click-outside overlay for the search panel */}
      {isSearchOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-24 z-[1850] bg-black/20"
          onClick={() => setIsSearchOpen(false)}
          aria-hidden="true"
        />
      )}

      

      {selectedCafe && (
          <div
          className={`fixed inset-x-0 bottom-0 z-[2000] transform transition-transform duration-300 ease-out top-24 sm:top-auto ${isPanelOpen ? 'translate-y-0' : 'translate-y-full'}`}
          onTransitionEnd={() => {
            if (!isPanelOpen) {
              // Closing completed. If we have a pending cafe, swap content and reopen; otherwise fully close.
              if (pendingCafeRef.current) {
                const nextCafe = pendingCafeRef.current
                pendingCafeRef.current = null
                // The marker icon is already set correctly from the click handler
                setSelectedCafe(nextCafe)
                requestAnimationFrame(() => setIsPanelOpen(true))
              } else {
                // Fully close
                if (selectedMarkerRef.current) {
                  const currentCafeName = Array.from(cafeNameToMarkerRef.current.entries())
                    .find(([name, m]) => m === selectedMarkerRef.current)?.[0]
                  const isCurrentClosed = CLOSED_CAFES.includes(currentCafeName)
                  const resetIcon = isCurrentClosed ? greyscaleIconRef.current : normalIconRef.current
                  selectedMarkerRef.current.setIcon(resetIcon)
                  selectedMarkerRef.current = null
                }
                setSelectedCafe(null)
              }
            }
          }}
        >
                  <div 
          ref={panelRef} 
          className="w-full rounded-t-2xl shadow-xl ring-1 pt-0 px-4 pb-4 sm:pt-0 sm:px-6 sm:pb-6 bottom-panel h-full sm:h-auto overflow-y-auto"
          style={{
            backgroundColor: 'var(--color-surface)',
            boxShadow: 'var(--shadow-lg)',
            borderColor: 'var(--color-border-light)'
          }}
        >
            <div 
              className="sticky top-0 z-[1] flex items-start justify-between gap-4 border-b pb-3 pt-4 sm:pt-6"
              style={{ borderColor: 'var(--color-border-light)', backgroundColor: 'var(--color-surface)' }}
            >
              <div>
                <h2 
                  className="text-xl font-semibold"
                  style={{ 
                    color: CLOSED_CAFES.includes(selectedCafe.name) 
                      ? 'var(--color-text-muted)' 
                      : 'var(--color-primary)',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  {selectedCafe.name}
                  {CLOSED_CAFES.includes(selectedCafe.name) && (
                    <span 
                      className="ml-2 text-sm"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      (Closed)
                    </span>
                  )}
                </h2>
                <a
                  href={selectedCafe.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:underline break-all"
                  style={{ 
                    color: CLOSED_CAFES.includes(selectedCafe.name) 
                      ? 'var(--color-text-muted)' 
                      : '#7c7ceb'
                  }}
                >
                  {selectedCafe.website}
                  <span className="icon-external" aria-hidden="true"></span>
                </a>
              </div>
              <button
                className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50"
                style={{
                  backgroundColor: 'var(--color-background)',
                  borderColor: 'var(--color-border-medium)',
                  color: 'var(--color-text-secondary)',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onClick={() => {
                  setIsPanelOpen(false)
                  if (openTooltipMarkerRef.current) {
                    openTooltipMarkerRef.current.closeTooltip()
                    openTooltipMarkerRef.current = null
                  }
                }}
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {selectedCafe.pastries.map((pastry, index) => (
                                  <div
                    key={`${selectedCafe.name}-${pastry.name}-${index}`}
                    className="rounded-lg border p-4 shadow-sm"
                    style={{
                      backgroundColor: 'var(--color-background)',
                      borderColor: 'var(--color-border-light)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div 
                      className="text-base font-medium"
                      style={{ 
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-heading)'
                      }}
                    >
                      {pastry.name}
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-3">
                      <div 
                        className="text-sm"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        <div className="font-semibold">Chloe</div>
                        <div className="mt-0.5">Rating: <span className="font-medium">{pastry.reviews.chloe.rating}/10</span></div>
                        <div 
                          className="mt-1"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {pastry.reviews.chloe.comment}
                        </div>
                      </div>
                      <div 
                        className="text-sm"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        <div className="font-semibold">Josh</div>
                        <div className="mt-0.5">Rating: <span className="font-medium">{pastry.reviews.josh.rating}/10</span></div>
                        <div 
                          className="mt-1"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {pastry.reviews.josh.comment}
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapView


