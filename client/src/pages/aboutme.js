import imgFile from '../components/imgs/AwesomeFace.png'
import './aboutme.css'
import { Link } from 'react-router-dom'

function Aboutme() {
    return (
        <div className="container text-center bg-gray" style={{background: 'black', color: 'white', }}>

            <div className="row about-boxes">

                <div id="our-mission" style={{marginTop:'25px'}}>
                    <div className="col-sm-offset-3 center">
                        <p>
                            Take a paws! We're here with experienced professionals that are here to help :)
                        </p>
                    </div>
                </div>
            </div>

            <div className="row about-boxes">
                <div className="col-sm-12">
                    <div className="container">
                        <h2 style={{fontSize:'40px'}}>Our Mission</h2>
                        <div className="row justify-content-center">
                            <div className="col-sm-8 col-sm-offset-2">
                                <p className="center">
                                    "In this era of isolation Paws will keep you connected with your well-being.
                                    Paws makes it easy to access trained, licensed and experienced professionals
                                    to chat with at your convenience. Alternitavely, public chat is accessible with anonymous support!"
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row justify-content-center about-boxes">
                        <div className="col-sm-12">
                            <div id="our-success-stories">
                                
                                <div className="row justify-content-center text-center">
                                        <div className="col-md-8">
                                            <div className="success-story">
                                                <img src={imgFile} />
                                               
                                                <div>
                                                    <Link to='/publicChat'>Chat</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default Aboutme