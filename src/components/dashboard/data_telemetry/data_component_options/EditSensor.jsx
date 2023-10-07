import { useState } from 'react';

import { ReactComponent as BackArrow } from '../../../../assets/svg/arrow-left-solid.svg';

import { SensorConfigForm } from '../SensorConfigForm';

export const EditSensor = ({ sensorData, isVisible, setIsVisible }) => {
    const [sensorConfig, setSensorConfig] = useState(sensorData);

    const test = () => {
        setIsVisible(false);
    };
    
    return (
        <div className={`edit-panel ${isVisible && 'show-edit'}`}>
            <div className="edit-panel-nav">
                <BackArrow  className='back-arrow' onClick={test} />
                <button className='save-config'>
                    Save                
                </button>
            </div>
            <div className="edit-panel-config">
                <SensorConfigForm sensorConfig={sensorConfig} setSensorConfig={setSensorConfig} />
            </div>
        </div>
    )
}
