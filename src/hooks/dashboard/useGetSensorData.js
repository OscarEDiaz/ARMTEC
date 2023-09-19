import { useEffect, useState } from "react"
import * as mqtt from 'mqtt'



export const useGetSensorData = () => {
    // Here the data comes from the DB
    // Add to the props the userID
    const [sensorsData, setSensorsData] = useState([]);

    useEffect(() => {
        const options = {
            username: process.env.REACT_APP_MQTT_USERNAME,
            password: process.env.REACT_APP_MQTT_PASSWORD
        }

        const client = mqtt.connect('mqtts://e73fa1b672d243e88d4dcdba534d873f.s1.eu.hivemq.cloud:8884/mqtt', options)

        client.on('connect', () => {
            client.subscribe('Preassure');
            client.subscribe('Voltage');
            client.subscribe('Temperature');
        });


        client.on('message', (topic, message) => {
            const data = message.toString()
            const dataObj = JSON.parse(data)

            setSensorsData([topic, dataObj])
        });


        return () => {
            client.end();
        }
    }, [])
    

    return sensorsData;
}
