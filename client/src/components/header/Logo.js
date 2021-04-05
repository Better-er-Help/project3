import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import paws from '../imgs/paws.jpg'

export class Logo extends Component {
    render() {

        return (
            <div className="logo">
                <Link to='/'><img src={paws} alt="logo"/></Link>
            </div>
        )
    }
}

export default Logo