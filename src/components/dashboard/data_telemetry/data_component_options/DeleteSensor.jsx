import axios from 'axios';


export const DeleteSensor = ({ cardID, isVisible, setIsVisible, refresh }) => {
    const handleCancelPressed = () => {
        setIsVisible(false);
    }

    const deleteSensor = async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }

            const data = {id}

            const response = await axios.post(`http://127.0.0.1:5000/db/sensors/remove?user_id=1`, data, config);

            console.log('SUccesful post: ', response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeletePressed = () => {
        setIsVisible(false);

        deleteSensor(cardID);
        refresh(true);
    }


    const handleBlurredContainerPressed = (e) => {
        if (e.target === e.currentTarget) {
            setIsVisible(false);
        }
    }

    return (
        <div className={`blurred-container ${isVisible ? 'show' : 'hide'}`} onClick={handleBlurredContainerPressed} >
            <div className="alert-container">
                <div className="alert-text">
                    <p>Are you sure you want to delete this component?</p>
                </div>
                <div className="alert-opts">
                    <button className="opt cancel" onClick={handleCancelPressed} >Cancel</button>
                    <button className="opt delete" onClick={handleDeletePressed} >Yes, delete it</button>
                </div>
            </div>
        </div>
    )
}
