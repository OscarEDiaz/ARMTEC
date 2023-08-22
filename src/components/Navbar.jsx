import '../styles/navbar.css'

export const Navbar = ({changeView}) => {


    return (
        <nav className="navbar">
            <ul className="navbar-items">
                <li className="main-title">ARMTEC</li>
                <ul className="navbar-subitems-1">
                    <li onClick={() => changeView('Data')}>Data</li>
                    <li onClick={() => changeView('GPS')}>GPS</li>
                </ul>
            </ul>
        </nav>
    )
}
