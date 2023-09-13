import { useEffect, useState } from "react"
import mqtt from "mqtt";

export const useGetSensorData = () => {
    const [sensorsData, setSensorsData] = useState([]);
    
    useEffect(() => {
        const client = mqtt.connect('e73fa1b672d243e88d4dcdba534d873f.s1.eu.hivemq.cloud');
        
        client.subscribe('test/data');

        client.on('message', (topic, message) => {
            setSensorsData([topic, message])
        });

        client.loop_forever()

        return () => {
            client.end();
        }
    }, [])
    

    return sensorsData;
}
