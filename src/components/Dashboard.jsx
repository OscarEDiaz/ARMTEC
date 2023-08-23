import { DataComponent } from "./DataComponent"

import { useState } from "react"
import { MapView } from "./Map"

import '../styles/dashboard.css'
import { DataTelemetry } from "./DataTelemetry"

export const Dashboard = ({ currentView }) => {
    const [dataComponents, setDataComponents] = useState(['Preassure', 'Temperature', 'Light', 'Weight', 'Battery', 'GPS', 'Speed'])

    return (
        <section className="dashboard">
            {
                currentView === 'Data'
                    ? <DataTelemetry data={dataComponents} />
                    : <MapView />
            }
        </section>
    )
}
