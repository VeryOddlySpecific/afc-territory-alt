import { MapContext } from "../context/MapContext"
import { useContext } from '@wordpress/element'
import { Card, CardHeader, CardBody, Heading, Grid, ToggleControl } from '@wordpress/components'

const RegionSelector = () => {

    const { regions, setRegions } = useContext(MapContext)

    const handleRegionAction = (event) => {
        var eventProp = event.target.id
        var eventData = event.target.type === "checkbox" ? event.target.checked : event.target.value

        setRegions(regions.map(region => {
            return {
                ...region,
                [eventProp]: eventData
            }
        }))
    }

    return (
        <Card>
            <CardHeader>
                <Heading>Region Selector</Heading>
            </CardHeader>
            <CardBody>
                <Grid columns={6} gap={2}>
                {
                    regions.map((region) => {
                        return (
                            <ToggleControl
                                key={region.fips}
                                label={region.name}
                                checked={region.active}
                                onChange={handleRegionAction}
                            />
                        )
                    })
                }
                </Grid>
            </CardBody>
        </Card>
    )
}

export default RegionSelector