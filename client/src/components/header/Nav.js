import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Login from '../Login/login'

export class Nav extends Component {
    state= {
        toggle: false
    }
    menuToggle = () => {
        this.setState({toggle: !this.state.toggle})
    }

    render() {
        const {toggle} = this.state;
        return (
            <div className="ulContainer">
                <ul className={toggle ? "toggle": ""}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to='/publicChat'>Chat</Link></li>
                    <li><Link to="/emergency">Emergency</Link></li>
                    <li><Login/></li>
                    <li className="close">X</li>
                </ul>
                <div className="menu" onClick={this.menuToggle}>Menu</div>
            </div>
        )
    }
}

export default Nav
