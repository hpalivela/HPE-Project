import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import './DiagPie.css';
const data = [
    { id: 0, value: 10, label: 'series A' },
    { id: 1, value: 15, label: 'series B' },
    { id: 2, value: 20, label: 'series C' },
];

const DiagPie = () => {
    return (
        <div>
        <h3>Recommended Actions</h3>
        <center>
        <div className='pieCard'>
            <div className='pieChartContainer'>
                <h3>Diagnoses Type By Score</h3>
                <PieChart
                    series={[
                        {
                            data,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}
                    height={195}
                />
            </div>
        </div>
        <div className='pieCard'>
            <div className='pieChartContainer'>
            <h3>Diagnoses Type By Score</h3>
                <PieChart
                    series={[
                        {
                            data,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}
                    height={195}
                />
            </div>
        </div>
        </center>
        </div>
    );
}

export default DiagPie;
