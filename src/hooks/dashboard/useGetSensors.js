import { useEffect, useState } from 'react';

import * as mqtt from 'mqtt'
import axios from 'axios';

export const useGetSensors = (refresh, setRefresh) => {
    const [components, setComponents] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSensors = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }

            const url = process.env.REACT_APP_BACKEND_URL;

            setIsUpdated(false);
            setIsLoading(true);
            const response = await axios.get(`http://127.0.0.1:5000/db/sensors/home?user_id=1`, config)
            setIsLoading(false);
            
            const { data } = response;
            
            const sensors = data.map(sensorConfig => {
                const [id, title, borderColor, topic, chartType, measureUnit, backgroundColor] = sensorConfig;
                console.log({id, title, borderColor, topic, chartType, measureUnit, backgroundColor});

                return {id, title, borderColor, topic, chartType, measureUnit, backgroundColor, payload: 0};
            });
            
            setComponents(sensors);
            setIsUpdated(true);
        } catch {
            console.log('error');
        }
    }

    useEffect(() => {
        if (!isLoading) {
            const options = {
                username: process.env.REACT_APP_MQTT_USERNAME,
                password: process.env.REACT_APP_MQTT_PASSWORD
            }
    
            const client = mqtt.connect('mqtts://e73fa1b672d243e88d4dcdba534d873f.s1.eu.hivemq.cloud:8884/mqtt', options)
    
            client.on('connect', () => {
                console.log('Connected')
                components.map(({topic}) => {
                    console.log('subscribed to ', topic)
                    client.subscribe(topic);
                })
            });
    
            client.on('message', (topic, message) => {
                const data = message.toString()
                const dataObj = JSON.parse(data)
    
                console.log(dataObj)
            
                const update = components.map(component => {
                    if (component.topic === topic)
                        component.payload = dataObj;

                    return component;
                })
    
                console.log('Updated components', update);
                setComponents(update);
            });
    
    
            return () => {
                client.end();
            }
        }
    }, [isLoading])

    useEffect(() => {
        if (refresh) {
            fetchSensors()
            setRefresh(false)
        }
    }, [refresh])
    
    useEffect(() => {
        fetchSensors()
    }, [])
    
    return [components, isLoading, isUpdated];
}
