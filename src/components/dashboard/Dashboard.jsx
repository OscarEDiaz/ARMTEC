import { DataTelemetry } from './data_telemetry/DataTelemetry';
import { MapView } from './map/MapView';

import '../../styles/dashboard.css';
import { Test } from './data_telemetry/Test';

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