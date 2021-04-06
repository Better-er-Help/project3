import React, { useState } from 'react';
import Nav from './header/Nav';

function Header(props){

    const [opa, setOpa] = useState(false)

function toggleNav(){
    opa === false ? setOpa(true) : setOpa(false)
}
function closeOpa(){
    setOpa(false)
}
        return (
            <header style={{background: opa ? 'rgba(0,0,0,0.4)' : '#555'}}>
                <Nav 
                    toggleMenu={props.toggleMenu}
                    closeMenu={props.closeMenu}
                    toggleOpa={toggleNav}
                    closeOpa={closeOpa}
                />
          </header>
        )
}

export default Header