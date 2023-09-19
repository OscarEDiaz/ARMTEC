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

    return (
        <div className="config-container">
            <h1 className='config-header'>Configuration</h1>
            <div className="mqtt-config-options">
                <form action="" method="post">
                    
                </form>
            </div>
        </div>
    )
}
