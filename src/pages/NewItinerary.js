import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { usePostItineraryMutation } from '../features/itinerariesApi'
import NewActivity from '../components/NewActivity'
import '../styles/ActivityAnditinerary.css'

export default function NewItinerary() {

  let { id } = useParams()

  let userId = useSelector(state => state.userr.id)

  let stateInicial = {
    name: "",
    user: "",
    city: "",
    price: "",
    duration: "",
  }

  const [itinerary, setItinerary] = useState(stateInicial)
  const [idItinerary, setIdItineray] = useState("")

  const [postItinerary] = usePostItineraryMutation()

  const captureData = (event) => {
    const { name, value } = event.target
    setItinerary({ ...itinerary, [name]: value })
  }

  const saveData = (event) => {
    event.preventDefault();

    const newitinerary = {
      name: itinerary.name,
      user: userId,
      city: id,
      price: itinerary.price,
      duration: itinerary.duration,
    }

    postItinerary(newitinerary)
      .then(response => setIdItineray(response.data.response._id))

  }


  return (
    <div className=''>
      <div className='form-conatiner'>
        <h1>New Itinerary</h1>
        <form onSubmit={saveData} className="form">
          <input onChange={captureData} placeholder='Name' name='name' className='input' />
          <input onChange={captureData} placeholder='Price' name='price' className='input' />
          <input onChange={captureData} placeholder='Duration' name='duration' className='input' />
          <button className='button'>Send</button>
        </form>
      </div>
      <NewActivity id={idItinerary} />
    </div>
  )
}
