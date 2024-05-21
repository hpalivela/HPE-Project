import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TotalChart from './Components/Perfomancelinecharts/TotalChart';
import TotalBars from './Components/Latency&iopsbarcharts/TotalBars';
import DiagPie from './Components/Piechartsrecomendation/DiagPie';
import SystemMonitors from './Components/SystemsHeart/SystemMonitors';

const App = () => {
  return (
    <div style={{ backgroundColor: '#E5E4E2' }}>
      <h1 style={{ backgroundColor: 'black', color: 'white', textAlign: 'center' }}>Dashboard</h1>
      <div className='d-flex'>
      <div>
      <div className='Card1'>
        <TotalChart />
      </div>
      <div className='Card2'>
        {/* <BarCharts /> */}
        <TotalBars/>
      </div>
      </div>
      <div>
      <div className='Card4'>
        <SystemMonitors/>
      </div>
      <div className='Card3'>
        <DiagPie/>
      </div>
      
      </div>
      </div>
    </div>
  )
}
export default App
