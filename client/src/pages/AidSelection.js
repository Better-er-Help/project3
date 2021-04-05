import { Link } from 'react-router-dom'
import './Aid.css'

function AidSelection(){
    return (
        <>
        <div className="container-fluid d-flex justify-content-center align-items-center px-5">
            <div className="holderAid">
                <Link to='/publicChat' className="cardSelection">Depression</Link>
                <Link to='/publicChat' className="cardSelection">Anxiety</Link>
                <Link to='/publicChat' className="cardSelection">Anger</Link>
                <Link to='/publicChat' className="cardSelection">Stress</Link>
                <Link to='/publicChat' className="cardSelection">Low Self-Esteem</Link>
                <Link to='/publicChat' className="cardSelection">Grief</Link>
            </div>
        </div>
        </>
    )
}

export default AidSelection