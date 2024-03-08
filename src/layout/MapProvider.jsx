import { MapProvider } from '../context/MapContext';
import Layout from './Layout';

function App() {
    console.log('App')
    return (
        <MapProvider>
            <Layout />
        </MapProvider>
    );
}

export default App;