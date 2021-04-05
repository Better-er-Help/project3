import './Homepage.css'
import { Link } from 'react-router-dom'

function Homepage(){
    return (
    <>
    <div className="container-fluid d-flex justify-content-center align-items-center px-5">
        <div className="holder">
            <Link to='/selection' className="mental"><h3>Mental</h3></Link>
            <Link to='/physical' className="physical"><h3>Physical</h3></Link>
        </div>
    </div>
    </>
    )
}

export default Homepage