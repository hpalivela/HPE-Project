import React from 'react'
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import StorageIcon from '@mui/icons-material/Storage';
import { GrStorage } from "react-icons/gr";
import './Critical.css';
const Critical = () => {
  return (
    <div>
     <h3>Capacity<InfoSharpIcon/> </h3>
      <div>
        <div className='d-flex 'style={{marginTop:'48px'}}>
            <StorageIcon style={{fontSize:'46px'}}/>
            <h3 style={{marginLeft:'12px',marginTop:'4px'}}>ARRAYS</h3>
        </div>
        <div className='d-flex ' style={{marginTop:'52px'}}>
            <GrStorage style={{fontSize:'46px'}}/>
            <h3 style={{marginLeft:'12px',marginTop:'4px'}}>VOLUMES</h3>
        </div>
        {/* <div>
          <h4>CRITICAL</h4>
          <div className='boxRed'>
            <p>1</p>
            <p>&lt; 1 MONTH</p>
          </div>
          <div>
            <p>394</p>
            <p>&lt; 1 WEEK</p>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Critical
