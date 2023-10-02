import '../../../styles/sensorProps.css';

export const SensorConfig = ({isVisible}) => {
    return (
        <div className={`sensor-props ${isVisible ? 'show' : 'hide'}`}>
            <h1>Add new sensor</h1>
            <form className='sensor-props-form' action="">
                <label htmlFor="">Title</label>
                <input type="text" name="" id="title-prop" />
                <label htmlFor="topic-prop">Topic</label>
                <input type="text" name="" id="topic-prop" />
                <label htmlFor="color-prop">Color</label>
                <input type="color" name="" id="color-prop" />
            </form>
        </div>
    )
}
