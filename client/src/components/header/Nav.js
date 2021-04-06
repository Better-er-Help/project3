import React from 'react';
import {Link} from 'react-router-dom';
import Login from '../Login/login'
import paws from '../imgs/paws.jpg'
import { useStoreContext } from '../../utils/GlobalStore'

function Nav(props){

    const [{nav}, dispatch] = useStoreContext()

    function toggleNav(){
        nav === false ? dispatch({type:"NAV_OPEN"}) : dispatch({type:"NAV_CLOSE"})
        props.toggleMenu()
        props.toggleOpa()
    }
    function closeNav(){
        props.closeNav()
    }

    return (
        <>
        <div className="headerclose" style={{display: nav ? 'block' : 'none'}} onClick={closeNav}></div>
            <div className="logo">
                <Link to='/' onClick={closeNav}><img src={paws} alt="logo"/></Link>
            </div>
            <div className="ulContainer">
                <ul style={{width: nav ? '250px' : null}}>
                    <li><Link to="/about" onClick={closeNav}>About Us</Link></li>
                    <li><Link to='/chatselection' onClick={closeNav}>Chat</Link></li>
                    <li><Link to="/emergency" onClick={closeNav}>Emergency</Link></li>
                    <li><Login toggleNav={closeNav}/></li>
                    <li className="close" onClick={closeNav}>X</li>
                </ul>
                <div className="menu" onClick={toggleNav}>Menu</div>
            </div>
        </>
    )
}

export default Nav
