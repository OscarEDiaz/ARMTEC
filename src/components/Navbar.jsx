import '../styles/navbar.css'

export const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-items">
                <li className="main-title">ARMTEC</li>
                <ul className="navbar-subitems-1">
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </ul>
        </nav>
    )
}
