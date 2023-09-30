import { useState } from "react";
import { DataComponent } from "./DataComponent";
import { useGetSensorData } from "../../../hooks/dashboard/useGetSensorData";
import { SensorConfig } from "./SensorConfig";

import '../../../styles/telemetry.css';

export const DataTelemetry = () => {
    // MQTT DATA STATES
    const [topic, payload] = useGetSensorData();
    
    // SEARCH BAR STATES
    const [filter, setFilter] = useState('');

    // COMPONENTS DATA FROM DB STATES
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

    // ADD SENSOR INTERFACE STATES
    const [showConfiguration, setShowConfiguration] = useState(false);
    
    // Handle filter change on search bar
    const onFilterChange = (event) => {
        setFilter(event.target.value);
    }

    // Handle add sensor button pressing
    const handleAddSensorPressed = () => {
        setShowConfiguration(!showConfiguration)
    }

    // Hide add sensor interface if the user clicks everywhere but the configuration panel
    const handleTelemetryContainerPressed = (e) => {
        if (e.target === e.currentTarget) {
            showConfiguration && setShowConfiguration(!showConfiguration);
        }
    }

    return (      
        <div className="telemetry-container" onClick={handleTelemetryContainerPressed} >
            <div className="telemetry-navbar">
                <h1 className="telemetry-title">Data Telemetry</h1>
                <input className="telemetry-searchbar" placeholder="Buscar" value={filter} onChange={onFilterChange} type="text" />
            </div>
            <div className="telemetry-cards-container" >
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
            <SensorConfig isVisible={showConfiguration} />
            <button className="add-sensor-btn" onClick={handleAddSensorPressed}>
                {/* Replace with icon */}
                +
            </button>
        </div>
    )
}
