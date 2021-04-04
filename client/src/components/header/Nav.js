import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Login from '../Login/login'

function Nav(props){

    const [menu, menuToggle] = useState(false)

    function toggleNav(){
        menu === false ? menuToggle(true) : menuToggle(false)
        props.toggleMenu()
        props.toggleOpa()
    }

    return (
        <div className="ulContainer">
            <ul style={{width: menu ? '250px' : '0'}}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to='/publicChat'>Chat</Link></li>
                <li><Link to="/emergency">Emergency</Link></li>
                <li><Login/></li>
                <li className="close" onClick={toggleNav}>X</li>
            </ul>
            <div className="menu" onClick={toggleNav}>Menu</div>
        </div>
    )
}

export default Nav
