import { useState } from 'react';
import axios from 'axios';

import { SensorConfigForm } from './SensorConfigForm';

import '../../../styles/sensorProps.css';

export const SensorConfig = ({ isVisible, setIsVisible, refresh }) => {
    const [isLoading, setisLoading] = useState(false);
    const [sensorConfig, setSensorConfig] = useState({
        TITLE: '',
        TOPIC: '',
        MUNIT: '',
        CTYPE: 'LINE',
        BGC: '#ffffff',
        BRC: '#ffffff',
    });

    // When the save button is pressed save the sensor component to the database
    const addSensor = async () => {
        try {
            // Axios petition configuration
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
    
            // Sensor configuration obkect
            const data = sensorConfig;


            setisLoading(true)
            await axios.post(`http://127.0.0.1:5000/db/sensors/add?user_id=1`, data, config);
            setisLoading(false)
            setIsVisible(false)

            // When the object is correctly saved into the database, reset the object to the default configuration
            setSensorConfig({
                TITLE: '',
                TOPIC: '',
                MUNIT: '',
                CTYPE: 'LINE',
                BGC: '#ffffff',
                BRC: '#ffffff',
            });
            
            // Refresh the UI
            refresh(true)
        } catch(error) {
            console.log(error);
        }

    }

    return (
        <div className={`sensor-props ${isVisible ? 'show-sensor-props' : 'hide-sensor-props'}`}>
            <h1>Add New Sensor</h1>
            <SensorConfigForm sensorConfig={sensorConfig} setSensorConfig={setSensorConfig} />
            <button className='save-sensor-btn' onClick={addSensor} >ADD</button>
        </div>
    )
}
