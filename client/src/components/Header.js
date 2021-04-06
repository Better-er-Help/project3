import React, { useState } from 'react';
import Nav from './header/Nav';
import { useStoreContext } from '../utils/GlobalStore'

function Header(props){

    const [{ opa }, dispatch] = useStoreContext();

function toggleNav(){
    opa === false ? dispatch({type:"NAV_OPEN"}) : dispatch({type:"NAV_CLOSE"});
}

        return (
            <header style={{background: opa ? 'rgba(0,0,0,0.4)' : '#555'}}>
                <Nav 
                    toggleMenu={props.toggleMenu}
                    closeNav={props.closeNav}
                    toggleOpa={toggleNav}
                />
          </header>
        )
}

export default Header