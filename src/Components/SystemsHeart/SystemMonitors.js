import React from 'react'
import StorageIcon from '@mui/icons-material/Storage';
import { FaHeartCircleCheck } from "react-icons/fa6";
import { FaHeartCircleXmark } from "react-icons/fa6";
import { MdOutlineVideoSettings } from "react-icons/md";
import './SystemMonitors.css';

const SystemMonitors = () => {
    return (
        <div style={{ padding: '0px' }} className='Array'>
            <h3>Systems</h3>
            <div>
                <h2>HARDWARE</h2>
                <StorageIcon style={{ fontSize: '62px' }} />
                <h1>76</h1>
                <h4>Arrays</h4>
                <h1><span style={{ color: 'green' }}>45</span> <span style={{ fontSize: '18px' }}>vs </span><span style={{ color: 'red' }}>66</span></h1>
            </div>
            <div className='d-flex '>
                <div style={{ width: 'calc(100% - 30px)' }}>
                    <FaHeartCircleCheck className='greenHeart' />
                    <h6>HEART BEAT</h6>
                    <p style={{fontWeight:'bold'}}>45</p>
                </div>
                <div style={{ width: 'calc(100% - 30px)' }}>
                    <FaHeartCircleXmark className='redHeart' />
                    <h6>HEART BEAT</h6>
                    <p style={{fontWeight:'bold'}}>66</p>
                </div>
            </div>

            <div className='d-flex'>
                <div style={{ width: 'calc(100% - 30px)' }}>
                    <MdOutlineVideoSettings style={{ fontSize: '62px',color:'lightgreen' }} />
                    <p style={{fontWeight:'bold'}}>41</p>
                </div>
                <div style={{ width: 'calc(100% - 30px)' }}>
                    <MdOutlineVideoSettings style={{ fontSize: '62px',color:'red' }} />
                    <p style={{fontWeight:'bold'}}>70</p>
                </div>
            </div>
        </div>
    )
}

export default SystemMonitors;


// import React from 'react'
// import StorageIcon from '@mui/icons-material/Storage';
// import { FaHeartCircleCheck } from "react-icons/fa6";
// import { FaHeartCircleXmark } from "react-icons/fa6";
// // import { MdOutlineVideoSettings } from "react-icons/md";
// import './SystemMonitors.css';

// const SystemMonitors = () => {
//     return (
//         <div style={{ padding: '0px' }} className='Array'>
//             <h3>Systems</h3>
//             <div>
//                 <h2>HARDWARE</h2>
//                 <StorageIcon style={{ fontSize: '42px' }} />
//                 <h1>76</h1>
//                 <h4>Arrays</h4>
//                 <h1><span style={{ color: 'green' }}>45</span> <span style={{ fontSize: '18px' }}>vs </span><span style={{ color: 'red' }}>66</span></h1>
//             </div>
//             <div className='d-flex '>
//                 <div style={{ width: 'calc(100% - 31px)' }}>
//                     <FaHeartCircleCheck className='greenHeart' />
//                     <h6>HEART BEAT</h6>
//                     <p style={{fontWeight:'bold'}}>45</p>
//                 </div>
//                 <div style={{ width: 'calc(100% - 31px)' }}>
//                     <FaHeartCircleXmark className='redHeart' />
//                     <h6>HEART BEAT</h6>
//                     <p style={{fontWeight:'bold'}}>66</p>
//                 </div>
//             </div>

//             {/* <div className='d-flex'>
//                 <div>
//                     <MdOutlineVideoSettings style={{ fontSize: '62px',color:'lightgreen' }} />
//                     <p style={{fontWeight:'bold'}}>41</p>
//                 </div>
//                 <div >
//                     <MdOutlineVideoSettings style={{ fontSize: '62px',color:'red' }} />
//                     <p style={{fontWeight:'bold'}}>70</p>
//                 </div>
//             </div> */}
//         </div>
//     )
// }

// export default SystemMonitors;
