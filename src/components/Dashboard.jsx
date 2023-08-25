import { useState } from "react"
import { MapView } from "./Map"

import { DataTelemetry } from "./DataTelemetry"

import '../styles/dashboard.css'

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
