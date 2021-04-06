import { Link } from 'react-router-dom'

function ChatSelection(){
    return(
        <>
    <div className="containerCards">
        <div className="holder">
            <Link to='/publicChat' className="mental"><h3>Public</h3></Link>
            <Link to='/privateChat' className="physical"><h3>Private</h3></Link>
        </div>
    </div>
    </>
    )
}

export default ChatSelection