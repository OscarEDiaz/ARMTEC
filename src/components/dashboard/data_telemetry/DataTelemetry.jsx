import { useState } from "react";
import { DataComponent } from "./DataComponent";
import { useGetSensorData } from "../../../hooks/dashboard/useGetSensorData";

import '../../../styles/telemetry.css';

export const DataTelemetry = () => {
    const [topic, payload] = useGetSensorData();
    const [filter, setFilter] = useState('');
    const [componentsData, setComponentsData] = useState([
        {
            sensor: 'Preassure',
            measure: 'pascal',
            chartType: 'Line'
        },
        {
            sensor: 'Temperature',
            measure: 'C',
            chartType: 'Line'
        },
        {
            sensor: 'Voltage',
            measure: 'V',
            chartType: 'Line'
        }
    ]);
    
    const onFilterChange = (event) => {
        setFilter(event.target.value);
    }

    return (
        <div className="telemetry-container">
            <div className="telemetry-navbar">
                <h1 className="telemetry-title">Data Telemetry</h1>
                <input className="telemetry-searchbar" placeholder="Buscar" value={filter} onChange={onFilterChange} type="text" />
            </div>
            <div className="telemetry-cards-container">
                {
                    componentsData.map((component) => {
                        if (component.sensor.toLowerCase().includes(filter.toLowerCase()))
                            return <DataComponent 
                                key={component.sensor} 
                                title={component.sensor.toUpperCase()}
                                sensor={component.sensor}
                                measure={component.measure.toUpperCase()} 
                                chartType={component.chartType} 
                                payload={topic === component.sensor ? payload : null}   
                            />
                        else
                            return null
                    })
                }
            </div>
        </div>
    )
}
