import { createRoot } from '@wordpress/element'

import App from './layout/MapProvider'

const mapContainer = document.getElementById('afc-territory-admin')

if (mapContainer) {
    createRoot(mapContainer).render(<App />)
}