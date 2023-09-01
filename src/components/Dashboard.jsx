import { DataTelemetry } from "./DataTelemetry"
import { MapView } from "./MapView"



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
