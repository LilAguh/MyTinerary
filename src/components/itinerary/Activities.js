import '../../styles/Activities.css'
import axios from "axios"
import { useEffect, useState } from 'react'
import Activity from './activities/Activity'

export default function Activities(props) {

    const id = props.data._id
    const [activities, setActivity] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/activities/itinerary/${id}`)
            .then(response => setActivity(response.data.response))
    }, [id])

    return (
        <div className='Activity' >
            {activities?.map(activities => <Activity key={activities._id} name={activities.name} data={activities} />)}
        </div>
    )
}