import { DataTelemetry } from './data_telemetry/DataTelemetry';
import { MapView } from './map/MapView';

import '../../styles/dashboard.css';

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