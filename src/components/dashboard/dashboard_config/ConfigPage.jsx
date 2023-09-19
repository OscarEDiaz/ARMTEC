import { useState } from 'react';
import '../../../styles/dashboardConfig.css';

export const ConfigPage = () => {
    // To retrieve from DB
    const [mqttConfig, setMqttConfig] = useState({
        MQTTURL: '',
        PORT: '',
        USER: '',
        PASSWORD: '',
    });

    const onMqttConfigChange = ({target: {value, name}}) => {
        setMqttConfig({
            ...mqttConfig,
            [ name ]: value
        })
    }

    const onTestButtonPressed = () => {
        
    }

    const onSaveButtonPressed = () => {

    }

    return (
        <div className="config-container">
            <h1 className='config-header'>Configuration</h1>
            <div className="config-options">
                <h className="general-header" >MQTT Configuration</h>
                <form className="mqtt-config" action="" method="post">
                    <label htmlFor="mqttUrl">MQTT URL</label>
                    <input className='general-input' onChange={onMqttConfigChange} type="url" name="MQTTURL" id="mqttUrl" value={mqttConfig['MQTTURL']} />
                    <label htmlFor="mqttPort">Port</label>
                    <input className='general-input' onChange={onMqttConfigChange} type="text" name="PORT" id="mqttPort" value={mqttConfig['PORT']} />
                    <label htmlFor="mqttUsername">Username</label>
                    <input className='general-input' onChange={onMqttConfigChange} type="text" name="USER" id="mqttUsername" value={mqttConfig['USER']} />
                    <label htmlFor="mqttPassword">Password</label>
                    <input className='general-input' onChange={onMqttConfigChange} type="password" name="PASSWORD" id="mqttPassword" value={mqttConfig['PASSWORD']} />
                    <div className="mqtt-config-btns">
                        <input type="button" value="Test Configuration" />
                        <input type="button" value="Save Configuration" />
                    </div>
                </form>
            </div>
        </div>
    )
}
