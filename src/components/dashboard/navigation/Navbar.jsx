import { Gear } from './Gear';

import '../../../styles/navbar.css';

export const Navbar = ({view, changeView}) => {
    return (
        <nav className="navbar">
            <ul className="navbar-items">
                <li className="main-title">ARM<br></br>TEC</li>
                <ul className="navbar-subitems-1">
                    <li onClick={() => changeView('DATA')} className={view === 'DATA' ? 'selected' : ''}>DATA</li>
                    <li onClick={() => changeView('MAP')} className={view === 'MAP' ? 'selected' : ''}>GPS</li>
                    <li onClick={() => changeView('MAP')} className={view === 'MAP' ? 'selected' : ''}>NAV</li>
                </ul>
                <ul className='navbar-subitems-2'>
                    <Gear changeView={changeView} />
                </ul>
            </ul>
        </nav>
    )
}
