import '../../../styles/sensorProps.css';

export const SensorConfig = ({isVisible}) => {
    return (
        <div className={`sensor-props ${isVisible ? 'show' : 'hide'}`}>
            <h1>Add new sensor</h1>
            <form className='sensor-props-form' action="">
                <label htmlFor="">Sensor Name</label>
                <input type="text" name="" id="" />
                <label htmlFor="">Color</label>
                <input type="color" name="" id="" />
                <label htmlFor="">Topic</label>
                <input type="text" name="" id="" />
            </form>
        </div>
    )
}
