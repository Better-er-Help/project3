import React, { Component } from 'react';
import Home from './section/Home';
import Emergency from './section/Emergency';
import About from './section/About';
import {BrowserRouter as Route, Router} from 'react-router-dom';

export class Section extends Component {
    render() {
        return (
            <section>
                    <Route path ="/" component={Home} />
                    <Route path ="/Emergency" component={Emergency} />
                    <Route path ="/About" component={About} />
            </section>
        )
    }
}

export default Section
