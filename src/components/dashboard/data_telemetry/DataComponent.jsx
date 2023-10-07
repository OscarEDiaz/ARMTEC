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

export const DataComponent = ({ id, title, topic, borderColor, chartType, measureUnit, backgroundColor, payload, refresh }) => {
    // CHART DATA STATES
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);

    // ICON INTERFACES STATES
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);

    const dataCard = useRef(null);

    const [isDragged, setIsDragged] = useState(false);
    const [isReleased, setIsReleased] = useState(false);

    const [mouseCoords, setMouseCoords] = useState({x: 0, y: 0});
    const [initialMouseCoords, setinitialMouseCoords] = useState({x: 0, y: 0});

    const [cardCoords, setCardCoords] = useState({x: 0, y: 0});
    

    const mouseMoveHandler = (event) => {
        const x = event.clientX;
        const y = event.clientY;

        setMouseCoords({x, y});
    }


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

    const handleDeleteButtonPressed = () => {
        setIsDeleteVisible(true);
    }

    const handleEditButtonPressed = () => {
        setIsEditVisible(true);
    }


    const handleDrag = () => {
        setinitialMouseCoords({...mouseCoords});
        setIsDragged(true);
        setIsReleased(false);
    }

    const handleRelease = () => {
        setCardCoords({x: 0, y: 0});
        setIsDragged(false);
        setIsReleased(true);
    }

    useEffect(() => {
        window.addEventListener('mousemove', mouseMoveHandler);

        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
        }
    }, [])

    useEffect(() => {
        if (isDragged && !isReleased) {
            const x = mouseCoords.x - initialMouseCoords.x;
            const y = mouseCoords.y - initialMouseCoords.y;

            setCardCoords({x, y});
        }
    }, [mouseCoords, isDragged, isReleased])

    return (
        <>
            <div
                className="data-card"
                onMouseDown={handleDrag}
                onMouseUp={handleRelease}
                ref={dataCard}
                style={{'top': cardCoords.y, 'left': cardCoords.x, 'zIndex': isDragged ? '1' : '0'}}
            >
                <p>{JSON.stringify(mouseCoords)}</p>
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
