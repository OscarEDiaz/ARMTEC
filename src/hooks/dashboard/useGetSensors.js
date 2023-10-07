import { useEffect, useState, useRef } from 'react';
import * as mqtt from 'mqtt';
import axios from 'axios';

export const useGetSensors = (refresh, setRefresh) => {
    const [components, setComponents] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const mqttClientRef = useRef(null); // Utiliza useRef para mantener una referencia al cliente MQTT

    const fetchSensors = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            };

            const url = process.env.REACT_APP_BACKEND_URL;

            setIsUpdated(false);
            setIsLoading(true);
            const response = await axios.get(`http://127.0.0.1:5000/db/sensors/home?user_id=1`, config);

            const { data } = response;

            const sensors = data.map((sensorConfig) => {
                const [id, title, borderColor, topic, chartType, measureUnit, backgroundColor] = sensorConfig;

                return { id, title, borderColor, topic, chartType, measureUnit, backgroundColor, payload: 0 };
            });

            console.log(sensors)
            setComponents(sensors);
            setIsUpdated(true);
            setIsLoading(false);
        } catch {
            console.log('error');
        }
    };

    useEffect(() => {
        if (!isLoading) {
            const options = {
                username: process.env.REACT_APP_MQTT_USERNAME,
                password: process.env.REACT_APP_MQTT_PASSWORD,
            };

            if (!mqttClientRef.current) {
                // Crea el cliente MQTT si aún no existe
                const client = mqtt.connect('mqtts://e73fa1b672d243e88d4dcdba534d873f.s1.eu.hivemq.cloud:8884/mqtt', options);
                mqttClientRef.current = client;

                client.on('connect', () => {
                    console.log('connected');
                    console.log('from client ', components)
                });


                client.on('message', (topic, message) => {
                    const data = message.toString();
                    const dataObj = JSON.parse(data);

                    console.log(dataObj);

                    // Utiliza una función de actualización del estado para garantizar que uses la última versión de components
                    setComponents(prevComponents => {
                        return prevComponents.map((component) => {
                            if (component.topic === topic)
                                component.payload = dataObj;

                            return component;
                        });
                    });
                });
            }
        }

        return () => {
            if (mqttClientRef) {
                mqttClientRef.current.end();
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (refresh) {
            fetchSensors();
            setRefresh(false);
        }
    }, [refresh]);

    useEffect(() => {
        fetchSensors();
    }, []);

    return [components, isLoading, isUpdated];
};
