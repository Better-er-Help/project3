import { Link } from 'react-router-dom'
import './Aid.css'

function AidSelection(){
    return (
        <>
        <div className="containerAid">
            <div className="holderAid">
                <Link to='/privateChat' className="cardSelection">Depression</Link>
                <Link to='/privateChat' className="cardSelection">Anxiety</Link>
                <Link to='/privateChat' className="cardSelection">Anger</Link>
                <Link to='/privateChat' className="cardSelection">Stress</Link>
                <Link to='/privateChat' className="cardSelection">Low Self-Esteem</Link>
                <Link to='/privateChat' className="cardSelection">Grief</Link>
            </div>
        </div>
        </>
    )
}

export default AidSelection