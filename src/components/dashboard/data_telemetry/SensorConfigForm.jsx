import '../../../styles/sensorProps.css';

export const SensorConfigForm = ({ sensorConfig, setSensorConfig }) => {
    const onSensorConfigChange = ({target: {value, name}}) => {
        setSensorConfig({
            ...sensorConfig,
            [name]: value
        })
    };
    
    return (
        <form className='sensor-props-form' action="">
            <label htmlFor="">Title</label>
            <input type="text" name="TITLE" id="title-prop" value={sensorConfig['TITLE']} onChange={onSensorConfigChange} />
            <label htmlFor="topic-prop">Topic</label>
            <input type="text" name="TOPIC" id="topic-prop" value={sensorConfig['TOPIC']} onChange={onSensorConfigChange} />
            <label htmlFor="color-prop-0">Measure Unit</label>
            <input type="text" name="MUNIT" id="munit-prop" value={sensorConfig['MUNIT']} onChange={onSensorConfigChange} />
            <label htmlFor="chart-type">Chart Type</label>
            <select className='chart-select' name="CTYPE" id="chart-type" onChange={onSensorConfigChange} >
                <option value="LINE">Line</option>
            </select>
            <label htmlFor="color-prop-0">Background Color</label>
            <div className="color-input">
                <input type='color' name="BGC" id="color-prop-0" value={sensorConfig['BGC']} onChange={onSensorConfigChange} />
                <p>{sensorConfig['BGC']}</p>
            </div>
            <label htmlFor="color-prop-1">Border Color</label>
            <div className="color-input">
                <input type='color' name="BRC" id="color-prop-1" value={sensorConfig['BRC']} onChange={onSensorConfigChange} />
                <p>{sensorConfig['BRC']}</p>
            </div>
        </form>
    )
}
