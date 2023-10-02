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

import '../../../styles/dataComponent.css';
import '../../../styles/dataComponentIcons.css';
import { EditSensor } from './data_component_options/EditSensor';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const DataComponent = ({ title, sensor, measure, chartType, payload }) => {
    // CHART DATA STATES
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);

    // ICON INTERFACES STATES
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);

    const chartColors = {
        'Preassure': {
            borderColor: 'rgb(252, 186, 3)',
            backgroundColor: 'rgba(252, 186, 3, 0.5)'
        },
        'Temperature': {
            borderColor: 'rgb(199, 123, 16)',
            backgroundColor: 'rgba(199, 123, 16, 0.5)'
        },
        'Voltage': {
            borderColor: 'rgb(235, 52, 210)',
            backgroundColor: 'rgba(235, 52, 210, 0.5)'
        }
    }


    const chartData = {
        labels: labels,
        datasets: [
            {
                label: measure,
                data: data,
                borderColor: chartColors[sensor].borderColor,
                backgroundColor: chartColors[sensor].backgroundColor,
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    const charts = {
        'Line': <Line options={options} data={chartData} style={{ height: '100%' }} />
    }

    useEffect(() => {
        if (!payload)
            return;

        const timeStamp = payload.label;
        const measure = payload.measure;


        setData(prevData => {
            if (prevData.length === 20) {
                const newData = prevData.slice(1);
                return [...newData, measure];
            } else {
                return [...prevData, measure];
            }
        });

        setLabels(prevLabels => {
            if (prevLabels.length === 20) {
                const newLabels = prevLabels.slice(1);
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
                    <p>{title}</p>
                    <div className="data-card-opts">
                        <DeleteIcon className='opts-icon delete-icon' onClick={handleDeleteButtonPressed} />
                        <EditIcon className='opts-icon edit-icon' onClick={handleEditButtonPressed} />
                    </div>
                </div>
                {charts[chartType]}
                <EditSensor isVisible={isEditVisible} setIsVisible={setIsEditVisible} />
            </div>
            <DeleteSensor isVisible={isDeleteVisible} setIsVisible={setIsDeleteVisible} />
        </>
    )
}
