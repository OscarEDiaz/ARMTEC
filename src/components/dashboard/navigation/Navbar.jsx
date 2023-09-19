import { useState } from 'react';
import { ReactComponent as Gear } from '../../../assets/svg/gear-solid.svg';

import '../../../styles/navbar.css';

export const Navbar = ({view, changeView}) => {

    return (
        <nav className="navbar">
            <ul className="navbar-items">
                <li className="main-title">ARM<br></br>TEC</li>
                <ul className="navbar-subitems-1">
                    <li onClick={() => changeView('DATA')} className={view === 'DATA' ? 'selected' : ''}>DATA</li>
                    <li onClick={() => changeView('MAP')} className={view === 'GPS' ? 'selected' : ''}>GPS</li>
                    <li onClick={() => changeView('MAP')} className={view === 'NAV' ? 'selected' : ''}>NAV</li>
                </ul>
                <ul className='navbar-subitems-2'>
                    <Gear className='gear' onClick={() => changeView('CONFIG')}/>
                </ul>
            </ul>
        </nav>
    )
}
