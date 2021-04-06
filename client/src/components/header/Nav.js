import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Login from '../Login/login'
import paws from '../imgs/paws.jpg'

function Nav(props){

    const [menu, menuToggle] = useState(false)

    function toggleNav(){
        menu === false ? menuToggle(true) : menuToggle(false)
        props.toggleMenu()
        props.toggleOpa()
    }
    function closeNav(){
        menuToggle(false)
        props.closeMenu()
        props.closeOpa()
    }

    return (
        <>
        <div onMouseOut={closeNav}>
            <div className="logo">
                <Link to='/' onClick={closeNav}><img src={paws} alt="logo"/></Link>
            </div>
            <div className="ulContainer">
                <ul style={{width: menu ? '250px' : null}}>
                    <li><Link to="/about" onClick={closeNav}>About Us</Link></li>
                    <li><Link to='/chatselection' onClick={closeNav}>Chat</Link></li>
                    <li><Link to="/emergency" onClick={closeNav}>Emergency</Link></li>
                    <li><Login toggleNav={closeNav}/></li>
                    <li className="close" onClick={closeNav}>X</li>
                </ul>
                <div className="menu" onClick={toggleNav}>Menu</div>
            </div>
        </div>    
        </>
    )
}

export default Nav
