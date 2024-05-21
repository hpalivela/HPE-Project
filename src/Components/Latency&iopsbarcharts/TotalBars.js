// import * as React from 'react';
// import { BarChart, Bar,Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// // const dataset = [
// //     {
// //       seoul: 21,
// //       tokyo: 30,
// //       month: "Jan",
// //     },
// //     {
// //       seoul: 28,
// //       tokyo: 24,
// //       month: "Feb",
// //     },
// //     {  
// //       seoul: 41,
// //       tokyo: 37,
// //       month: "Mar",
// //     },
// //     {
// //       seoul: 73,
// //       tokyo: 85,
// //       month: "Apr",
// //     },
// //     {
// //       seoul: 99,
// //       tokyo: 79,
// //       month: "May",
// //     },
// //     {
// //       seoul: 144,
// //       tokyo: 170,
// //       month: "June",
// //     },
// //     {
// //       seoul: 319,
// //       tokyo: 290,
// //       month: "July",
// //     },
// //     {
// //       seoul: 249,
// //       tokyo: 280,
// //       month: "Aug",
// //     },
// //     {
// //       seoul: 131,
// //       tokyo: 120,
// //       month: "Sept",
// //     },
// //     {
// //       seoul: 55,
// //       tokyo: 80,
// //       month: "Oct",
// //     },
// //     {
// //       seoul: 48,
// //       tokyo: 39,
// //       month: "Nov",
// //     },
// //     {
// //       seoul: 25,
// //       tokyo: 22,
// //       month: "Dec",
// //     },
// //   ];

// let maxSeoul=0;
// let maxTokyo=0;

// dataset.forEach(entry => {
//   maxSeoul = Math.max(maxSeoul, entry.seoul);
//   maxTokyo = Math.max(maxTokyo, entry.tokyo);
// });
// let threshold_Seoul=maxTokyo*0.6;
// let threshold_Tokyo=maxSeoul*0.6;

// // console.log("Maximum Seoul value:", threshold_Seoul);
// // console.log("Maximum Tokyo value:",threshold_Tokyo );

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     // console.log(payload);
//     return (
//       <div
//         className="custom-tooltip"
//         style={{
//           background: "white",
//           paddingLeft: "10px",
//           paddingRight: "10px",
//           paddingTop: "5px",
//           paddingBottom: "5px",
//         }}
//       >
//         <p className="label">{label}</p>
//         <p
//           className="label"
//           style={{
//             color: payload[0].value > threshold_Seoul ? "skyblue" : "lightblue",
//           }}
//         >{`${payload[0].name} : ${payload[0].value}`}</p>
//         <p
//           className="label"
//           style={{
//             color: payload[1].value >threshold_Tokyo ? "red" : "orange",
//           }}
//         >{`${payload[1].name} : ${payload[1].value}`}</p>
//       </div>
//     );
//   }
// };




// const TotalBars = () => {
//   return (
//     <div>
//       <h3>VMs Latency and IOPS</h3>
//     <ResponsiveContainer width="90%" height={600}>
//       <BarChart layout="vertical" data={dataset}>
//         <XAxis type="number" />
//         <YAxis dataKey="month" type="category" />
//         <Tooltip  content={<CustomTooltip/>}/>
//         <Legend />
//         <Bar dataKey="seoul"name="seoul" fill='skyblue'>
//             {
//                 dataset.map((entry,index)=>{
//                     return(
//                         <Cell  key={`cell-${index}`} fill={entry.seoul>threshold_Seoul ? 'skyblue': 'lightblue'}/>
//                     )
//                 })
//             }
//         </Bar>
//         <Bar dataKey="tokyo"   name="tokyo" fill='orange'>
//             {
//                 dataset.map((entry,index)=>{
//                     return(
//                         <Cell key={`cell-${index}`} fill={entry.tokyo>threshold_Tokyo ? 'red': 'orange'}/>
//                     )
//                 })
//             }
//         </Bar>
//       </BarChart>
//     </ResponsiveContainer>
//     </div>
//   );
// };

// export default TotalBars;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TotalBars = () => {
  const [bardata, setBarData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3050/');
        if (response.status === 200 && response.data && response.data.barData && response.data.barData.allData) {
          const { seoul, tokyo, monthVal } = response.data.barData.allData;
          setBarData(monthVal.map((month, index) => ({
            monthVal: month,
            seoul: seoul[index],
            tokyo: tokyo[index]
          })));
          setLoading(false);
        } else {
          throw new Error("Unexpected response structure or missing data.");
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bardata) {
    return <div>Error: No data available.</div>;
  }

  // Calculate threshold values
  const maxSeoul = Math.max(...bardata.map(entry => entry.seoul));
  const maxTokyo = Math.max(...bardata.map(entry => entry.tokyo));
  const threshold_Seoul = maxTokyo * 0.6;
  const threshold_Tokyo = maxSeoul * 0.6;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="label" style={{ color: entry.dataKey === 'seoul' ? (entry.value > threshold_Seoul ? 'skyblue' : 'lightblue') : (entry.value > threshold_Tokyo ? 'red' : 'orange') }}>
              {`${entry.dataKey} : ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h3>VMs Latency and IOPS</h3>
      <ResponsiveContainer width="90%" height={700}>
        <BarChart layout="vertical" data={bardata}>
          <XAxis type="number" />
          <YAxis dataKey="monthVal" type="category" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="seoul" name="seoul" fill="skyblue">
            {bardata.map((entry, index) => (
              <Cell key={`cell-seoul-${index}`} fill={entry.seoul > threshold_Tokyo ? 'skyblue' : 'lightblue'} />
            ))}
          </Bar>
          <Bar dataKey="tokyo" name="tokyo" fill="orange">
            {bardata.map((entry, index) => (
              <Cell key={`cell-tokyo-${index}`} fill={entry.tokyo > threshold_Seoul ? 'red' : 'orange'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalBars;












