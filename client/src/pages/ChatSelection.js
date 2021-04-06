import { Link } from 'react-router-dom'

function ChatSelection(){
    return(
        <>
    <div className="container-fluid d-flex justify-content-center align-items-center px-5">
        <div className="holder">
            <Link to='/publicChat' className="mental"><h3>Public</h3></Link>
            <Link to='/privateChat' className="physical"><h3>Private</h3></Link>
        </div>
    </div>
    </>
    )
}

export default ChatSelection