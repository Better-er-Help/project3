import { SettingsPowerSharp } from '@material-ui/icons';
import React, { useState } from 'react';
import Logo from './header/Logo'
import Nav from './header/Nav';

function Header(props){

    const [opa, setOpa] = useState(false)

function toggleNav(){
    opa === false ? setOpa(true) : setOpa(false)
}
        return (
            <header style={{background: opa ? 'rgba(0,0,0,0.4)' : '#555'}}>
                <Logo />
                <Nav 
                    toggleMenu={props.toggleMenu}
                    toggleOpa={toggleNav}
                />
          </header>
        )
}

export default Header