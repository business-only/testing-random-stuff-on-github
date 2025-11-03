// Map initialization and management
let map, marker;

// Initialize map
function initMap() {
    const mapElement = document.getElementById('map');
    
    if (!mapElement || typeof L === 'undefined') {
        console.error('Map element or Leaflet library not found');
        return;
    }
    
    try {
        // Initialize map centered on Riba Mahmoud coordinates
        map = L.map('map').setView([35.8298286, 10.6366956], 17);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Add marker
        marker = L.marker([35.8298286, 10.6366956]).addTo(map);
        
        // Initial popup
        updateMapPopup();
        marker.openPopup();
        
        // Remove loading state
        mapElement.classList.remove('loading');
    } catch (error) {
        console.error('Error initializing map:', error);
        if (mapElement) {
            mapElement.classList.remove('loading');
        }
    }
}

// Update map popup - French only
function updateMapPopup() {
    if (!marker) return;
    
    const popupContent = '<b>Laboratoire Riba Mahmoud</b><br>Immeuble Gloulou (1er étage)<br>Rue 22 Janvier 1952<br>En face du lycée de garçons<br>Sousse, Tunisie';
    
    marker.bindPopup(popupContent);
}

// Wait for both Leaflet and DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Wait a bit for Leaflet to load
        setTimeout(initMap, 500);
    });
} else {
    // DOM already loaded
    setTimeout(initMap, 500);
}
