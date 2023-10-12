import { useState } from "react";

import { DataComponent } from "./DataComponent";
import { SensorConfig } from "./SensorConfig";

import { useGetSensors } from "../../../hooks/dashboard/useGetSensors";

import '../../../styles/telemetry.css';
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";

export const DataTelemetry = () => {
    // MQTT DATA STATES
    const [refresh, setRefresh] = useState(false);
    const {components, setComponents, isFetching} = useGetSensors(refresh, setRefresh);

    const [isLoadingCards, setIsLoadingCards] = useState(true);
    const [cardsData, setCardsData] = useState([]);
    
    // SEARCH BAR STATES
    const [filter, setFilter] = useState('');

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

    useEffect(() => {
        if (!isFetching) {
            console.log('Components: ', components)
            setCardsData(components);
            setIsLoadingCards(false);
        }
    }, [isFetching, components])


    useEffect(() => {
        console.log('Global cards data: ', JSON.parse(JSON.stringify(cardsData)))
    }, [cardsData])

    return (      
        <div className="telemetry-container" onClick={handleTelemetryContainerPressed} >
            <div className="telemetry-navbar" onClick={handleTelemetryContainerPressed} >
                <h1 className="telemetry-title">Data Telemetry</h1>
                <input className="telemetry-searchbar" placeholder="Buscar" value={filter} onChange={onFilterChange} type="text" />
            </div>
            <div className="telemetry-cards-container" onClick={handleTelemetryContainerPressed} >
                {
                    isLoadingCards 
                    ? <h1>LOADING</h1>
                    : components.map((component, index) => {
                        if (component.title.toLowerCase().includes(filter.toLowerCase()))
                            return <DataComponent 
                                key={component.id}
                                neighboursData={cardsData}
                                registerMeasure={setCardsData}
                                currentIndex={index}
                                id={component.id}
                                title={component.title}
                                topic={component.topic}
                                borderColor={component.borderColor}
                                chartType={component.chartType} 
                                measureUnit={component.measureUnit} 
                                backgroundColor={component.backgroundColor}
                                payload={component.payload}
                                refresh={setRefresh}
                            />
                        else
                            return null
                    })
                }
            </div>
            <SensorConfig isVisible={showConfiguration} setIsVisible={setShowConfiguration} refresh={setRefresh} />
            <button className="add-sensor-btn" onClick={handleAddSensorPressed}>
                {/* Replace with icon */}
                +
            </button>
        </div>
    )
}
