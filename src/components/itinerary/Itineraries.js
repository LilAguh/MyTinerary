import '../../styles/Itinerary.css'
import Itinerary from './itineraries/Itinerary'
import { useGetItinerariesQuery } from '../../features/itinerariesApi'


export default function Itineraries(props) {

    const id = props.data._id

    const { data: itineraries } = useGetItinerariesQuery(id)

    return (
        <div className="Itinerary">
            {itineraries?.map(itineraries => <Itinerary key={itineraries._id} name={itineraries.name} data={itineraries} />)}
        </div>
    )
}
