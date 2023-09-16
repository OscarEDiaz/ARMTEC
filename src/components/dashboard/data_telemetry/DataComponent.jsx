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

import '../../../styles/dataComponent.css';

export const DataComponent = ({ title, sensor, measure, chartType, payload }) => {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);

    console.log('SENSOR: ', sensor, 'DATA', data)

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

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

    return (
        <div className="data-card">
            <div className='data-title'>{title}</div>
            {charts[chartType]}
        </div>
    )
}
