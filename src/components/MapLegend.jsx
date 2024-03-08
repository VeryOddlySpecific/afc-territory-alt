import { MapContext } from "../context/MapContext"
import { useContext } from '@wordpress/element'
import { Card, CardHeader, CardBody, Heading, Grid, Button } from '@wordpress/components'

const MapLegend = () => {

    const { branches, setBranches } = useContext(MapContext)

    const handleLegendAction = (event) => {
        setBranches(event.target.key)
    }

    return (
        <Card>
            <CardHeader>
                <Heading>Map Legend</Heading>
            </CardHeader>
            <CardBody>
                <Grid columns={7} gap={2}>
                {
                    branches.map((branch) => {
                        return (
                            <Button 
                                style={{backgroundColor: branch.color, color: 'white'}}
                                key={branch.id}
                                onClick={handleLegendAction}
                            >
                            {branch.name}
                            </Button>
                        )
                    })
                }
                </Grid>
            </CardBody>
        </Card>
    )
}

export default MapLegend