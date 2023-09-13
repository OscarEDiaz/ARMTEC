import { useState, useEffect } from "react";

import { DataComponent } from "./DataComponent";

import '../../../styles/telemetry.css';

export const DataTelemetry = () => {
    const [dataComponents, setDataComponents] = useState(['Preassure', 'Temperature', 'Temperature2', 'Temperature3', 'hastemp', 'Light', 'Weight', 'Battery', 'GPS', 'Speed'])
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('');

    const onFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const searchWords = (key) => {
        const filteredData = [];

        dataComponents.forEach(word => {
            if (word.toLowerCase().includes(key.toLowerCase()))
                filteredData.push(word);
        });

        return filteredData;
    }

    useEffect(() => {
        const newData = searchWords(filter);
        setFilteredData(newData);
    }, [filter])

    return (
        <div className="telemetry-container">
            <div className="telemetry-navbar">
                <h1 className="telemetry-title">Data Telemetry</h1>
                <input className="telemetry-searchbar" placeholder="Buscar" value={filter} onChange={onFilterChange} type="text" />
            </div>
            <div className="telemetry-cards-container">
                {
                    filter === ''
                    ? dataComponents.map((title, index) => <DataComponent key={index} title={title.toUpperCase()} />)
                    : filteredData.map((title, index) => <DataComponent key={index} title={title.toUpperCase()} />)
                }
            </div>
        </div>
    )
}
