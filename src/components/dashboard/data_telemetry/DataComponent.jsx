import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

import { ReactComponent as DeleteIcon } from '../../../assets/svg/trash-solid.svg';
import { ReactComponent as EditIcon } from '../../../assets/svg/pencil-solid.svg';

import { DeleteSensor } from './data_component_options/DeleteSensor';
import { EditSensor } from './data_component_options/EditSensor';

import '../../../styles/dataComponentIcons.css';
import '../../../styles/dataComponent.css';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const DataComponent = ({ neighboursData, registerMeasure, currentIndex, id, title, topic, borderColor, chartType, measureUnit, backgroundColor, payload, refresh }) => {
    // CHART DATA STATES
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);

    // ICON INTERFACES STATES
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);

    const [isRegistering, setIsRegistering] = useState(true);

    const dataCard = useRef(null);

    const [isDragged, setIsDragged] = useState(false);
    const [isReleased, setIsReleased] = useState(false);

    const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
    const [initialMouseCoords, setinitialMouseCoords] = useState({ x: 0, y: 0 });

    const [relativeCardCoords, setRelativeCardCoords] = useState({ x: 0, y: 0 });
    const [cardCoords, setCardCoords] = useState({
        topLeftCorner: 0,
        topRightCorner: 0,
        bottomRightCorner: 0,
        bottomLeftCorner: 0
    });

    const [text, setText] = useState('')


    const chartData = {
        labels: labels,
        datasets: [
            {
                label: measureUnit.toUpperCase(),
                data: data,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
            }
        ]
    }

    const initialData = {
        TITLE: title,
        TOPIC: topic,
        MUNIT: measureUnit,
        CTYPE: chartType,
        BGC: backgroundColor,
        BRC: borderColor,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    const charts = {
        'LINE': <Line options={options} data={chartData} style={{ height: '100%' }} />
    };

    // --- [EVENT HANDLERS] ---
    const handleDeleteButtonPressed = () => {
        setIsDeleteVisible(true);
    }

    const handleEditButtonPressed = () => {
        setIsEditVisible(true);
    }

    const handleDrag = () => {
        setinitialMouseCoords({ ...mouseCoords });
        setIsDragged(true);
        setIsReleased(false);
    }

    const handleRelease = () => {
        setRelativeCardCoords({ x: 0, y: 0 });
        setCardCoords({
            topLeftCorner: 0,
            topRightCorner: 0,
            bottomRightCorner: 0,
            BottomLeftCorner: 0
        })
        setIsDragged(false);
        setIsReleased(true);
    }

    // -- [MAIN HANDLERS] -- 
    const mouseMoveHandler = (event) => {
        const x = event.clientX;
        const y = event.clientY;

        setMouseCoords({ x, y });
    }

    const handleIntrusion = (cardCoords) => {
        neighboursData.forEach(neighbour => {
            if (neighbour.id !== id) {
                // Top neighbour coords
                const neighbourTopRightX = neighbour.cardInitialCoords['topRightCorner'].x;
                const neighbourTopRightY = neighbour.cardInitialCoords['topRightCorner'].y;
                const neighbourTopLeftX = neighbour.cardInitialCoords['topLeftCorner'].x;
                const neighbourTopLeftY = neighbour.cardInitialCoords['topLeftCorner'].y;

                // Bottom neighbout coords
                const neighbourBottomRightX = neighbour.cardInitialCoords['bottomRightCorner'].x;
                const neighbourBottomRightY = neighbour.cardInitialCoords['bottomRightCorner'].y;
                const neighbourBottomLeftX = neighbour.cardInitialCoords['bottomLeftCorner'].x;
                const neighbourBottomLeftY = neighbour.cardInitialCoords['bottomLeftCorner'].y;


                const leftRightTopLeftTreshold = cardCoords.topLeftCorner.x > neighbourTopLeftX && cardCoords.topLeftCorner.x < neighbourTopRightX;
                const leftRightTopRightTreshold = cardCoords.topRightCorner.x < neighbourTopRightX && cardCoords.topRightCorner.x > neighbourTopLeftX;
                const leftRightBottomLeftTreshold = cardCoords.bottomLeftCorner.x > neighbourBottomLeftX && cardCoords.bottomLeftCorner.x < neighbourBottomRightX;
                const leftRightBottomRightTreshold = cardCoords.bottomRightCorner.x < neighbourBottomRightX && cardCoords.bottomRightCorner.x > neighbourBottomLeftX;
                
                const topBottomTopLeftTreshold = cardCoords.topLeftCorner.y > neighbourTopRightY && cardCoords.topLeftCorner.y < neighbourBottomRightY;
                const topBottomTopRightTreshold = cardCoords.topRightCorner.y > neighbourTopLeftY && cardCoords.topRightCorner.y < neighbourBottomLeftY;
                const topBottomBottomLeftTreshold = cardCoords.bottomLeftCorner.y > neighbourTopRightY && cardCoords.bottomLeftCorner.y < neighbourBottomRightY;
                const topBottomBottomRightTreshold = cardCoords.bottomRightCorner.y > neighbourTopLeftY && cardCoords.bottomRightCorner.y < neighbourBottomLeftY;

                const intrudingFromTopRightCorner = cardCoords.topRightCorner.x > neighbourTopLeftX && cardCoords.topRightCorner.y > neighbourTopLeftY;
                const intrudingFromTopLeftCorner = cardCoords.topLeftCorner.x > neighbourTopLeftX && cardCoords.topLeftCorner.y > neighbourTopRightY;
                const intrudingFromBottomRightCorner = cardCoords.bottomRightCorner.x > neighbourBottomLeftX && cardCoords.bottomRightCorner.y < neighbourBottomLeftY;
                const intrudingFromBottomLeftCorner = cardCoords.bottomLeftCorner.x > neighbourBottomLeftX && cardCoords.bottomLeftCorner.y > neighbourTopRightY;



                if (intrudingFromTopRightCorner && leftRightTopRightTreshold && topBottomTopRightTreshold) {
                    setText('Intruding TR')
                } else if (intrudingFromBottomRightCorner && leftRightBottomRightTreshold && topBottomBottomRightTreshold) {
                    setText('Intruding BR')
                } else if (intrudingFromTopLeftCorner && leftRightTopLeftTreshold && topBottomTopLeftTreshold) {
                    setText('Intruding TL')
                } else if (intrudingFromBottomLeftCorner && leftRightBottomLeftTreshold && topBottomBottomLeftTreshold) {
                    setText('Intruding BL')
                }
            }
        });
    }

    // -- [EFECTS HANDLERS] --
    // Retrieve card initial coordinates and uptade the neighbours state with those to share own measures
    useLayoutEffect(() => {
        const card = dataCard.current.getBoundingClientRect();
        const topLeftCorner = { x: card.left, y: card.top };
        const topRightCorner = { x: card.right, y: card.top };
        const bottomLeftCorner = { x: card.left, y: card.bottom };
        const bottomRightCorner = { x: card.right, y: card.bottom };

        const cardInitialCoords = {
            topLeftCorner,
            topRightCorner,
            bottomRightCorner,
            bottomLeftCorner
        }

        setCardCoords({ topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner })

        setIsRegistering(true);
        // Maybe add binary search to reduce time to search for the component
        registerMeasure(prevData => {
            const updatedCards = prevData.map((component) => {
                if (component.id === id) {
                    return { ...component, cardInitialCoords, 'index': currentIndex }
                }

                return component;
            })

            return updatedCards;
        });

        setIsRegistering(false);
    }, [])

    // Add event listeners, always watch for cursor coordinates to prevent errors
    useEffect(() => {
        window.addEventListener('mousemove', mouseMoveHandler);

        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
        }
    }, [])

    useEffect(() => {
        if (isDragged && !isReleased && !isRegistering) {
            const x = mouseCoords.x - initialMouseCoords.x;
            const y = mouseCoords.y - initialMouseCoords.y;

            const card = dataCard.current.getBoundingClientRect();
            const topLeftCorner = { x: card.left, y: card.top };
            const topRightCorner = { x: card.right, y: card.top };
            const bottomLeftCorner = { x: card.left, y: card.bottom };
            const bottomRightCorner = { x: card.right, y: card.bottom };


            const currentDataCardCoords = { topLeftCorner, topRightCorner, bottomRightCorner, bottomLeftCorner };

            handleIntrusion(currentDataCardCoords);

            setCardCoords({ topLeftCorner, topRightCorner, bottomRightCorner, bottomLeftCorner });
            setRelativeCardCoords({ x, y });

        }
    }, [mouseCoords, isDragged, isReleased, isRegistering])

    useEffect(() => {
        if (!payload)
            return;

        const timeStamp = payload.label;
        const measure = payload.measure;

        setData(prevData => {
            if (prevData.length === 20) {
                const newData = prevData.slice(5);
                return [...newData, measure];
            } else {
                return [...prevData, measure];
            }
        });

        setLabels(prevLabels => {
            if (prevLabels.length === 20) {
                const newLabels = prevLabels.slice(5);
                return [...newLabels, timeStamp];
            } else {
                return [...prevLabels, timeStamp];
            }
        });

    }, [payload])

    return (
        <>
            <div
                className="data-card"
                onMouseDown={handleDrag}
                onMouseUp={handleRelease}
                ref={dataCard}
                style={{ 'top': relativeCardCoords.y, 'left': relativeCardCoords.x, 'zIndex': isDragged ? '1' : '0' }}
            >
                <p>RC: {JSON.stringify(relativeCardCoords)}</p>
                <p>TL: {JSON.stringify(cardCoords.topLeftCorner)}</p>
                <p>TR: {JSON.stringify(cardCoords.topRightCorner)}</p>
                <p>BR: {JSON.stringify(cardCoords.bottomRightCorner)}</p>
                <p>BL: {JSON.stringify(cardCoords.bottomLeftCorner)}</p>
                <p>Index: {currentIndex}</p>
                <p>introding from: {text}</p>
                <div className='data-title'>
                    <p>{title.toUpperCase()}</p>
                    <div className="data-card-opts">
                        <DeleteIcon className='opts-icon delete-icon' onClick={handleDeleteButtonPressed} />
                        <EditIcon className='opts-icon edit-icon' onClick={handleEditButtonPressed} />
                    </div>
                </div>
                {charts[chartType]}
                <EditSensor sensorData={initialData} isVisible={isEditVisible} setIsVisible={setIsEditVisible} />
            </div>
            <DeleteSensor cardID={id} isVisible={isDeleteVisible} setIsVisible={setIsDeleteVisible} refresh={refresh} />
        </>
    )
}
