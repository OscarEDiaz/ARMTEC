import { useState, useEffect } from 'react';

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
import { ReactComponent as EditIcon} from '../../../assets/svg/pencil-solid.svg';

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

export const DataComponent = ({ id, title, topic,  borderColor, chartType, measureUnit, backgroundColor, payload, refresh }) => {
    // CHART DATA STATES
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);

    // ICON INTERFACES STATES
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);


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

    return (
        <>
            <div className="data-card">
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
