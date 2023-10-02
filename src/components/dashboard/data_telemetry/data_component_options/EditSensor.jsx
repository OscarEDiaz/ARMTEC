import { ReactComponent as BackArrow } from '../../../../assets/svg/arrow-left-solid.svg';

export const EditSensor = ({isVisible, setIsVisible}) => {
    const test = () => {
        setIsVisible(false);
    }
    
    return (
        <div className={`edit-panel ${isVisible && 'show-edit'}`}>
            <div className="edit-panel-nav">
                <BackArrow  className='back-arrow' onClick={test} />
                <button className='save-config'>
                    Save                
                </button>
            </div>
            <div className="edit-panel-config">
                <form action="" className='edit-panel-config-form'>
                    <label htmlFor="">Title</label>
                    <input type="text" name="" id="" className='input-edit-panel' />
                    <label htmlFor="">Topic</label>
                    <input type="text" name="" id="" className='input-edit-panel' />
                    <label htmlFor="">Color</label>
                    <input type="color" name="" id="" className='input-color-edit-panel' />
                </form>
            </div>
        </div>
    )
}
