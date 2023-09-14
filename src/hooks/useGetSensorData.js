import { useEffect, useState } from "react"
import mqtt from "precompiled-mqtt";


export const useGetSensorData = () => {
    const [sensorsData, setSensorsData] = useState([]);

    useEffect(() => {
        const options = {
            username: process.env.REACT_APP_MQTT_USER,
            password: process.env.REACT_APP_MQTT_PASSWORD
        }

        const client = mqtt.connect('mqtt://e73fa1b672d243e88d4dcdba534d873f.s1.eu.hivemq.cloud:8884/mqtt', options);

        console.log(client)

        client.on('connect', () => {
            console.log("CONNECTED to broker");
        });


        // client.subscribe('test/data');

        // client.on('message', (topic, message) => {
        //     setSensorsData([topic, message])
        // });

        return () => {
            client.end();
        }
    }, [])
    

    return sensorsData;
}
