import { DataTelemetry } from './data_telemetry/DataTelemetry';
import { Navbar } from './navigation/Navbar';
import { MapView } from './map/MapView';

import { useState } from 'react';

import '../../styles/dashboard.css';
import { ConfigPage } from './dashboard_config/ConfigPage';

export const Dashboard = () => {
    const [view, setView] = useState('DATA');

    const views = {
        DATA: <DataTelemetry />,
        MAP: <MapView /> ,
        CONFIG: <ConfigPage />
    }

    return (
        <section className="dashboard">
            <Navbar view={view} changeView={setView} />
            { views[view] }
        </section>
    )
}