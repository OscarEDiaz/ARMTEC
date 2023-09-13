import { useState } from 'react';

import '../../../styles/navbar.css';

export const Navbar = ({view, changeView}) => {
    const [isSelected, setIsSelected] = useState(view);

    return (
        <nav className="navbar">
            <ul className="navbar-items">
                <li className="main-title">ARM<br></br>TEC</li>
                <ul className="navbar-subitems-1">
                    <li onClick={() => changeView('Data')} className={view === 'Data' ? 'selected' : ''}>Data</li>
                    <li onClick={() => changeView('GPS')} className={view === 'GPS' ? 'selected' : ''}>GPS</li>
                    <li onClick={() => changeView('NAV')} className={view === 'NAV' ? 'selected' : ''}>NAV</li>
                </ul>
            </ul>
        </nav>
    )
}
