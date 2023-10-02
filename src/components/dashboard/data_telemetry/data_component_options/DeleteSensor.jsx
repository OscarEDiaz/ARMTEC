
export const DeleteSensor = ({isVisible, setIsVisible}) => {
    const handleCancelPressed = () => {
        setIsVisible(false);
    }

    const handleDeletePressed = () => {
        setIsVisible(false);
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
