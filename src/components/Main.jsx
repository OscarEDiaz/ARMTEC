import { useState } from "react";

import { Dashboard } from "./dashboard/Dashboard";
import { Navbar } from "./dashboard/Navbar";
import { Login } from "./login/Login";

import '../styles/main.css';

export const Main = () => {
    const [view, setView] = useState('Data');

    return (
        <section className="main">
            <Navbar view={view} changeView={setView} />
            <Dashboard currentView={view} />
            <Login />
        </section>
    )
}
