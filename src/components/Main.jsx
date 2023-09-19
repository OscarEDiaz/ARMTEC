import { useState } from "react";

import { Dashboard } from "./dashboard/Dashboard";
import { Login } from "./login/Login";

import '../styles/main.css';

export const Main = () => {
    return (
        <section className="main">
            <Dashboard />
            <Login />
        </section>
    )
}
