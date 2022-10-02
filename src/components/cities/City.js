import "../../styles/PrintCity.css"
import { Link as LinkRouter } from 'react-router-dom'

export default function City(props) {
    let cities = props.data

    return (
        <>
            <LinkRouter className="PrintCity-link" to={`/city/${cities._id}`} >
                <div className="PrintCity-container">
                    <div className="PrintCity-Card">
                        <img className="PrintCity-img" src={cities.photo} alt={cities.city} />
                        <p className="PrintCity-name">{cities.city}</p>
                        <p className="PrintCity-p">{cities.information}</p>
                    </div>
                </div>
            </LinkRouter>
        </>
    )
}
