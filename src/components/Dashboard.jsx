import { useState } from "react"
import { MapView } from "./MapView"

import { DataTelemetry } from "./DataTelemetry"

import '../styles/dashboard.css'

export const Dashboard = ({ currentView }) => {
    return (
        <section className="dashboard">
            {
                currentView === 'Data'
                    ? <DataTelemetry />
                    : <MapView />
            }
        </section>
    )
}
