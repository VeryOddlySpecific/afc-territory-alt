import { MapContext } from "../context/MapContext"
import { useContext } from '@wordpress/element'
import { Card, CardHeader, CardBody, Heading, ButtonGroup, Button, ToggleControl, SelectControl, CardDivider, TextControl } from '@wordpress/components'

const SubregionData = () => {

    const { selectedSubregions, setSelectedSubregions, handleMapSave } = useContext(MapContext)

    const handleSubregionAction = (event) => {
        var eventProp = event.target.id
        var eventData = event.target.type === "checkbox" ? event.target.checked : event.target.value

        setSelectedSubregions(selectedSubregions.map(subregion => {
            return {
                ...subregion,
                [eventProp]: eventData
            }
        }))
    }

    return (
        <Card>
            <CardHeader>
                <Heading>Subregion Data</Heading>
            </CardHeader>
            <CardBody>
                <ButtonGroup>
                    <Button 
                        isPrimary
                        onClick={handleMapSave}
                    >Save Map</Button>
                </ButtonGroup>
                <ToggleControl 
                    id="active"
                    label="Activate Subregions"
                    checked={selectedSubregions.every(subregion => subregion.active)}
                    onChange={handleSubregionAction}
                />
                <SelectControl 
                    id="branch"
                    label="Select Branch"
                    options={branchOptions}
                    onChange={handleSubregionAction}
                    value={selectedSubregions.every(subregion => subregion.branch)}
                />
                <CardDivider />
                <Heading level={4}>Selected Subregions:</Heading>
                <ul>
                    {
                        selectedSubregions.map((subregion) => {
                            return (
                                <li key={subregion.id}><Heading level={5}>{subregion.name}</Heading></li>
                            )
                        })
                    }
                </ul>
                <CardDivider />
                <Heading level={4}>Subregion Restrictions:</Heading>
                <ToggleControl 
                    id="restricted"
                    label="Restrict Subregions"
                    checked={selectedSubregions.every(subregion => subregion.restricted)}
                    onChange={handleSubregionAction}
                />
                <TextControl 
                    id="restrictionReason"
                    label="Reason for Restriction"
                    value={selectedSubregions.every(subregion => subregion.restrictionReason)}
                    onChange={handleSubregionAction}
                />
            </CardBody>
        </Card>
    )

}

export default SubregionData