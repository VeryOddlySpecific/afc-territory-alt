import { useContext, useEffect } from '@wordpress/element'
import { MapContext } from '../context/MapContext'

const MapDisplay = () => {

    const { mapRef } = useContext(MapContext)

    const setupMap = async () => {
        const overpassQuery = `[out:json][timeout:25];
            area["name"="Nebraska"]->.searchArea;
            relation["boundary"="administrative"]["admin_level"="6"](area.searchArea);
            (._;>;);
            out;`
        
        fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: overpassQuery
        })
        .then(response => response.json())
        .then(data => {
            const features  = []
            const nodes     = data.elements.filter(element => element.type === 'node')
            const ways      = data.elements.filter(element => element.type === 'way')
            const relations = data.elements.filter(element => element.type === 'relation')
            
            relations.forEach(relation => {
                let boundaryCoords = []

                relation.members.forEach(member => {
                    if (member.type === 'way') {
                        let wayObj = ways.find(way => way.id === member.ref)

                        if (wayObj) {
                            wayObj.nodes.forEach(nodeId => {
                                let nodeObj = nodes.find(node => node.id === nodeId)

                                if (nodeObj) {
                                    let coordinates = [nodeObj.lat, nodeObj.lon]
                                    boundaryCoords.push(coordinates)
                                }
                            })
                        }
                    }
                })

                // coord check for closed polygon
                if (boundaryCoords[0] !== boundaryCoords[boundaryCoords.length - 1]) {
                    boundaryCoords.push(boundaryCoords[0])
                }

                
                let newPolygon = turf.polygon([boundaryCoords], relation.tags)
                features.push(newPolygon)
            })

            let newCollection   = turf.featureCollection(features)
            console.log(newCollection)

            let newLayer        = L.geoJSON(newCollection)
            console.log(newLayer)

            newLayer.addTo(mapRef.current)
        })
    }

    useEffect(() => {
        mapRef.current = L.map('admin-map-display', {
            center: [39.8283, -98.5795],
            zoom: 4,
            maxBounds: [
                [49.3843, -66.8859],
                [24.3963, -124.8489]
            ]
        })

        L.tileLayer('https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=GXUO6RDrkZ9BfFwKsVIr', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            maxZoom: 19,
        }).addTo(mapRef.current);        

        setupMap()

        
    }, [])

    
    return (
        <div id="admin-map-display" style={{ height: '750px' }}></div>
    )
}

export default MapDisplay