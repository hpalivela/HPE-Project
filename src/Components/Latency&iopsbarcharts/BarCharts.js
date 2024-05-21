import React, { useState } from 'react'
import LatencyBar from './LatencyBar'
import IopsBarchart from './IopsBarchart'


const LatencyData = [59, 41, 43, 54, 57, 60, 59, 38, 51, 70, 31, 61];
const IOPS_Data = [46, 28, 45, 44, 35, 90, 55, 40, 38, 80, 47, 37];

const max_Val_Lat = Math.max(...LatencyData);
const max_Val_IOPS = Math.max(...IOPS_Data);
const threshold_Lat = max_Val_Lat * 0.6;
const threshold_IOPS = max_Val_IOPS * 0.6;

const function_Lat = LatencyData.map(value => value >= threshold_Lat ? value : 0);
const function_IOPS = IOPS_Data.map(value => value >= threshold_IOPS ? value : 0);
const latencyData = LatencyData.map((value, index) => ({
    name: `Page ${String.fromCharCode(65 + index)}`,
    latency: value,
    dangerLevel: function_Lat[index],
}));

const iopsData = IOPS_Data.map((value, index) => ({
    name: `Page ${String.fromCharCode(65 + index)}`,
    IOPS_Data: value,
    dangerLevel: function_IOPS[index],
}));


const BarCharts = () => {
    const [displayLatency, setDisplayLatency] = useState(true);

    const handleButtonClick = () => {
        setDisplayLatency(!displayLatency);
    };
    return (
        <div>
            <div className='d-flex justify-content-center' style={{marginBottom:'10px',marginTop:'5px'}}>
            <button onClick={handleButtonClick} style={{backgroundColor:'#c7c1bd',color:'black',borderStyle:'solid',borderColor:'white',borderRadius:'10px',marginRight:'5px'}}>
                {displayLatency ? 'Show IOPS Data' : 'Show Latency Data'}
            </button>
            </div>
            <center>
            {displayLatency ? <LatencyBar data={latencyData} /> : <IopsBarchart data={iopsData} />}
            </center>
        </div>
    )
}

export default BarCharts
