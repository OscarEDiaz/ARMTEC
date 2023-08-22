import { useState } from "react";
import { Dashboard } from "./Dashboard";
import { Navbar } from "./Navbar"

export const Main = () => {
    const [view, setView] = useState('Data');

    return (
        <section className="main">
            <Navbar changeView={setView} />
            <Dashboard currentView={view} />
        </section>
    )
}
