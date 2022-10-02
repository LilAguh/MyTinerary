import axios from "axios"
import { useState } from "react"
import api from "../api"
import '../styles/ActivityAnditinerary.css'


export default function NewActivity(props) {
    let idItinerary = props.id
    const [activity, setActivity] = useState({
        name: "",
        photo: "",
        itinerary: "",
    })

    const captureData = (event) => {
        const { name, value } = event.target
        setActivity({ ...activity, [name]: value })
    }

    const saveData = (event) => {
        event.preventDefault()
        console.log(activity)

        const newActivity = {
            name: activity.name,
            photo: activity.photo,
            itinerary: idItinerary,
        }

        axios.post(api + `/activities/`, newActivity)
            .then(response => console.log(response))
    }

    return (
        <div className="form-conatiner">
            <h2>NewActivity</h2>
            <form onSubmit={saveData} className="form">
                <input onChange={captureData} placeholder='Name' name='name' className='input' />
                <input onChange={captureData} placeholder='Photo Url' name='photo' className='input' />
                <button className='button'>Send</button>
            </form>
        </div>
    )
}

