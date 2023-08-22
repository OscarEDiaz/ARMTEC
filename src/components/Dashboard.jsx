import { DataComponent } from "./DataComponent"

import '../styles/dashboard.css'
import { useState } from "react"

export const Dashboard = () => {
    const [dataComponents, setDataComponents] = useState(['Preassure', 'Temperature', 'Light', 'Weight', 'Battery', 'GPS', 'Speed'])


    return (
        <section className="dashboard">
            <h1 className="dashboard-title">Data Telemetry</h1>
            <div className="dashboard-cards-container">
                {dataComponents.map(title => <DataComponent title={title.toUpperCase()} />)}
            </div>
        </section>
    )
}
