import { useState, useEffect } from "react";
import { DataComponent } from "./DataComponent";
import { useGetSensorData } from "../../../hooks/useGetSensorData";


import '../../../styles/telemetry.css';

export const DataTelemetry = () => {
    const sensorData = useGetSensorData();
    const [dataComponents, setDataComponents] = useState([
        {
            sensor: 'Preassure',
            chartType: 'Line'
        },
        {
            sensor: 'Temperature',
            chartType: 'Line'
        },
        {
            sensor: 'Battery',
            chartType: 'Line'
        },
        {
            sensor: 'Speed',
            chartType: 'Line'
        }
    ]);
    
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('');

    const onFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const searchWords = (key) => {
        const filteredData = [];

        dataComponents.forEach(word => {
            if (word.sensor.toLowerCase().includes(key.toLowerCase()))
                filteredData.push(word);
        });

        return filteredData;
    }

    useEffect(() => {
        const newData = searchWords(filter);
        setFilteredData(newData);
    }, [filter])

    useEffect(() => {

    })

    return (
        <div className="telemetry-container">
            <div className="telemetry-navbar">
                <h1 className="telemetry-title">Data Telemetry</h1>
                <input className="telemetry-searchbar" placeholder="Buscar" value={filter} onChange={onFilterChange} type="text" />
            </div>
            <div className="telemetry-cards-container">
                {
                    filter === ''
                    ? dataComponents.map((title, index) => <DataComponent key={index} title={title.sensor.toUpperCase()} />)
                    : filteredData.map((title, index) => <DataComponent key={index} title={title.sensor.toUpperCase()} />)
                }
            </div>
        </div>
    )
}
