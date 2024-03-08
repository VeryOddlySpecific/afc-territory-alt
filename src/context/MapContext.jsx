import { createContext, useRef, useState } from '@wordpress/element'

const MapContext = createContext()

const MapProvider = (props) => {

    const [selectedSubregions, setSelectedSubregions] = useState([])
    const [regions, setRegions] = useState([])
    const [branches, setBranches] = useState([])

    const handleMapSave = () => {
        console.log('saving subregions')
        console.log('saving regions')
    }

    return (
        <MapContext.Provider value={{ 
            mapRef: useRef(),
            selectedSubregions,
            setSelectedSubregions,
            regions,
            setRegions,
            branches,
            setBranches,
            handleMapSave 
        }}>
            {props.children}
        </MapContext.Provider>
    )
}

export { MapProvider, MapContext }